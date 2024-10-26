import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { deleteFromS3, getImageMetadataFromUrl, uploadToS3 } from "../routes/uploadConfig";
import { ImagesApiSource } from "../utils/constants/images";
import { deleteImagesData, getImagesById, getImagesData, getImagesDataByFolderId, updateImagesData, uploadImagesData } from "../services/images.service";
import { FLASHCARD_IMAGES_V1_BUCKET_NAME } from "../utils/constants/general";
import { calculateFileSizeInMB, calculateStorage } from "../utils/helpers/general";
import { createUserStorageLogsData, getUserStorageData, updateUserStorageData } from "../services/user.service";

type StorageUnit = 'kb' | 'mb' | 'gb';
interface StorageResult {
    updatedCoveredStorageSize: number;
    updatedCoveredStorageUnit: StorageUnit;
}
export const uploadImages = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    const { userId } = req?.body;
    try {
        if (!req.file) {
            res.status(StatusCodes.BAD_REQUEST).send({ error: 'Image file is missing.' });
            return;
        }

        //Upload New Image And Add New Data
        const imageUrl = await uploadToS3(req.file, FLASHCARD_IMAGES_V1_BUCKET_NAME);
        const newImageId = await uploadImagesData({...bodyData, url: imageUrl});

        //For Storage Update Process
        const fileSize =  calculateFileSizeInMB(req?.file?.size);
        const userStorageData = await getUserStorageData(userId);
        if (userStorageData) {
            const result: StorageResult | boolean = calculateStorage(userStorageData?.storage, userStorageData?.unit as StorageUnit, userStorageData?.coveredStorage, userStorageData?.coveredStorageUnit as StorageUnit, fileSize?.size, fileSize?.unit as StorageUnit, 'added');
            if (!result) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data."});
            if (result) {
                const updateStorageData = {
                    userId: userId,
                    storage: userStorageData?.storage,
                    unit: userStorageData?.unit,
                    coveredStorage: Number(result?.updatedCoveredStorageSize),
                    coveredStorageUnit: String(result?.updatedCoveredStorageUnit)
                }
                await updateUserStorageData(updateStorageData)
                const storageLogsData = {
                    userId: userId,
                    documentId: newImageId,
                    storage: fileSize?.size,
                    unit: fileSize?.unit,
                    type: 'added'
                }
                await createUserStorageLogsData(storageLogsData)
            }
        }

        res.status(StatusCodes.OK).send({ success: true, message: ImagesApiSource.post.uploadImage.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updateImages = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        const file = req.file;
        if (file) {
            const imagesData = await getImagesById(bodyData?._id)
            const metadata = await getImageMetadataFromUrl(String(imagesData?.url));
            if (imagesData) {
                await deleteFromS3(imagesData?.url, FLASHCARD_IMAGES_V1_BUCKET_NAME)
            }
            const imageUrl = await uploadToS3(req.file, FLASHCARD_IMAGES_V1_BUCKET_NAME);
            await updateImagesData({...bodyData, url: imageUrl})
            

            //Update Storage Using Old Data
            const fileSize =  calculateFileSizeInMB(Number(metadata?.imageSize));
            const userStorageData = await getUserStorageData(String(imagesData?.userId));
            if (userStorageData) {
                const result: StorageResult | boolean = calculateStorage(userStorageData?.storage, userStorageData?.unit as StorageUnit, userStorageData?.coveredStorage, userStorageData?.coveredStorageUnit as StorageUnit, fileSize?.size, fileSize?.unit as StorageUnit, 'deleted');
                if (!result) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data."});
                if (result) {
                    const updateStorageData = {
                        userId: String(imagesData?.userId),
                        storage: userStorageData?.storage,
                        unit: userStorageData?.unit,
                        coveredStorage: Number(result?.updatedCoveredStorageSize),
                        coveredStorageUnit: String(result?.updatedCoveredStorageUnit)
                    }
                    await updateUserStorageData(updateStorageData)
                }
            }

            //Update Storage Using New Data
            const fileSizeNew =  calculateFileSizeInMB(Number(file?.size));
            const userStorageDataNew = await getUserStorageData(String(imagesData?.userId));
            if (userStorageDataNew) {
                const result: StorageResult | boolean = calculateStorage(userStorageDataNew?.storage, userStorageDataNew?.unit as StorageUnit, userStorageDataNew?.coveredStorage, userStorageDataNew?.coveredStorageUnit as StorageUnit, fileSizeNew?.size, fileSizeNew?.unit as StorageUnit, 'added');
                if (!result) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data."});
                if (result) {
                    const updateStorageData = {
                        userId: String(imagesData?.userId),
                        storage: userStorageDataNew?.storage,
                        unit: userStorageDataNew?.unit,
                        coveredStorage: Number(result?.updatedCoveredStorageSize),
                        coveredStorageUnit: String(result?.updatedCoveredStorageUnit)
                    }
                    await updateUserStorageData(updateStorageData)
                    const storageLogsData = {
                        userId: String(imagesData?.userId),
                        documentId: bodyData?._id,
                        storage: fileSizeNew?.size,
                        unit: fileSizeNew?.unit,
                        type: 'updated'
                    }
                    await createUserStorageLogsData(storageLogsData)
                }
            }
        } else {
            await updateImagesData(bodyData)
        }
        res.status(StatusCodes.OK).send({ success: true, message: ImagesApiSource.put.updateImage.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getImages = async (req: AuthorizedRequest, res: Response) => {
    const { userId } = req.query;
    try {
        const data = await getImagesData(userId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getImagesByFolderId = async (req: AuthorizedRequest, res: Response) => {
    const { userId, folderId } = req.query;
    try {
        const data = await getImagesDataByFolderId(userId, folderId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const deleteImages = async (req: AuthorizedRequest, res: Response) => {
    const { _id } = req.query;
    try {
        const imagesData = await getImagesById(_id)
        const metadata = await getImageMetadataFromUrl(String(imagesData?.url));
        if (imagesData) {
            await deleteFromS3(imagesData?.url, FLASHCARD_IMAGES_V1_BUCKET_NAME)
        }
        await deleteImagesData(_id);

        //Update Storage
        const fileSize =  calculateFileSizeInMB(Number(metadata?.imageSize));
        const userStorageData = await getUserStorageData(String(imagesData?.userId));
        if (userStorageData) {
            const result: StorageResult | boolean = calculateStorage(userStorageData?.storage, userStorageData?.unit as StorageUnit, userStorageData?.coveredStorage, userStorageData?.coveredStorageUnit as StorageUnit, fileSize?.size, fileSize?.unit as StorageUnit, 'deleted');
            if (!result) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data."});
            if (result) {
                const updateStorageData = {
                    userId: String(imagesData?.userId),
                    storage: userStorageData?.storage,
                    unit: userStorageData?.unit,
                    coveredStorage: Number(result?.updatedCoveredStorageSize),
                    coveredStorageUnit: String(result?.updatedCoveredStorageUnit)
                }
                await updateUserStorageData(updateStorageData)
                const storageLogsData = {
                    userId: String(imagesData?.userId),
                    documentId: _id,
                    storage: fileSize?.size,
                    unit: fileSize?.unit,
                    type: 'deleted'
                }
                await createUserStorageLogsData(storageLogsData)
            }
        }
        res.status(StatusCodes.OK).send({ success: true, message: ImagesApiSource.delete.deleteImage.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const assignImageFolder = async (req: AuthorizedRequest, res: Response) => {
    const { _id, folderId } = req.query;
    try {
        const imagesData = await getImagesById(_id)
        if (!imagesData) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Image data not found.' });
        await updateImagesData({...imagesData, folderId: folderId})
        res.status(StatusCodes.OK).send({ success: true, message: ImagesApiSource.put.assignImageFolder.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}