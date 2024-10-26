import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { deleteFromS3, getImageMetadataFromUrl, uploadToS3 } from "../routes/uploadConfig";
import { FLASHCARD_PDF_V1_BUCKET_NAME } from "../utils/constants/general";
import { PdfApiSource } from "../utils/constants/pdf";
import { deletePdfData, getPdfById, getPdfData, getPdfDataByFolderId, updatePdfData, uploadPdfData } from "../services/pdf.service";
import { calculateFileSizeInMB, calculateStorage } from "../utils/helpers/general";
import { createUserStorageLogsData, getUserStorageData, updateUserStorageData } from "../services/user.service";

type StorageUnit = 'kb' | 'mb' | 'gb';
interface StorageResult {
    updatedCoveredStorageSize: number;
    updatedCoveredStorageUnit: StorageUnit;
}

export const uploadPdf = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    const { userId } = req?.body;
    try {
        if (!req.file) {
            res.status(StatusCodes.BAD_REQUEST).send({ error: 'Pdf file is missing.' });
            return;
        }

        const pdfUrl = await uploadToS3(req.file, FLASHCARD_PDF_V1_BUCKET_NAME);
        const newPdfId = await uploadPdfData({...bodyData, url: pdfUrl});

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
                    documentId: newPdfId,
                    storage: fileSize?.size,
                    unit: fileSize?.unit,
                    type: 'added'
                }
                await createUserStorageLogsData(storageLogsData)
            }
        }
        res.status(StatusCodes.OK).send({ success: true, message: PdfApiSource.post.uploadPdf.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updatePdf = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        const file = req.file;
        if (file) {
            const pdfData = await getPdfById(bodyData?._id)
            const metadata = await getImageMetadataFromUrl(String(pdfData?.url));
            if (pdfData) {
                await deleteFromS3(pdfData?.url, FLASHCARD_PDF_V1_BUCKET_NAME)
            }
            const pdfUrl = await uploadToS3(req.file, FLASHCARD_PDF_V1_BUCKET_NAME);
            await updatePdfData({...bodyData, url: pdfUrl})

            //Update Storage Using Old Data
            const fileSize =  calculateFileSizeInMB(Number(metadata?.imageSize));
            const userStorageData = await getUserStorageData(String(pdfData?.userId));
            if (userStorageData) {
                const result: StorageResult | boolean = calculateStorage(userStorageData?.storage, userStorageData?.unit as StorageUnit, userStorageData?.coveredStorage, userStorageData?.coveredStorageUnit as StorageUnit, fileSize?.size, fileSize?.unit as StorageUnit, 'deleted');
                if (!result) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data."});
                if (result) {
                    const updateStorageData = {
                        userId: String(pdfData?.userId),
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
            const userStorageDataNew = await getUserStorageData(String(pdfData?.userId));
            if (userStorageDataNew) {
                const result: StorageResult | boolean = calculateStorage(userStorageDataNew?.storage, userStorageDataNew?.unit as StorageUnit, userStorageDataNew?.coveredStorage, userStorageDataNew?.coveredStorageUnit as StorageUnit, fileSizeNew?.size, fileSizeNew?.unit as StorageUnit, 'added');
                if (!result) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data."});
                if (result) {
                    const updateStorageData = {
                        userId: String(pdfData?.userId),
                        storage: userStorageDataNew?.storage,
                        unit: userStorageDataNew?.unit,
                        coveredStorage: Number(result?.updatedCoveredStorageSize),
                        coveredStorageUnit: String(result?.updatedCoveredStorageUnit)
                    }
                    await updateUserStorageData(updateStorageData)
                    const storageLogsData = {
                        userId: String(pdfData?.userId),
                        documentId: bodyData?._id,
                        storage: fileSizeNew?.size,
                        unit: fileSizeNew?.unit,
                        type: 'updated'
                    }
                    await createUserStorageLogsData(storageLogsData)
                }
            }
        } else {
            await updatePdfData(bodyData)
        }
        res.status(StatusCodes.OK).send({ success: true, message: PdfApiSource.put.updatePdf.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getPdf = async (req: AuthorizedRequest, res: Response) => {
    const { userId } = req.query;
    try {
        const data = await getPdfData(userId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getPdfByFolderId = async (req: AuthorizedRequest, res: Response) => {
    const { userId, folderId } = req.query;
    try {
        const data = await getPdfDataByFolderId(userId, folderId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const deletePdf = async (req: AuthorizedRequest, res: Response) => {
    const { _id } = req.query;
    try {
        const pdfData = await getPdfById(_id)
        const metadata = await getImageMetadataFromUrl(String(pdfData?.url));
        if (pdfData) {
            await deleteFromS3(pdfData?.url, FLASHCARD_PDF_V1_BUCKET_NAME)
        }
        await deletePdfData(_id);

        //Update Storage
        const fileSize =  calculateFileSizeInMB(Number(metadata?.imageSize));
        const userStorageData = await getUserStorageData(String(pdfData?.userId));
        if (userStorageData) {
            const result: StorageResult | boolean = calculateStorage(userStorageData?.storage, userStorageData?.unit as StorageUnit, userStorageData?.coveredStorage, userStorageData?.coveredStorageUnit as StorageUnit, fileSize?.size, fileSize?.unit as StorageUnit, 'deleted');
            if (!result) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Adding this data exceeds the maximum storage limit. Cannot add new storage data."});
            if (result) {
                const updateStorageData = {
                    userId: String(pdfData?.userId),
                    storage: userStorageData?.storage,
                    unit: userStorageData?.unit,
                    coveredStorage: Number(result?.updatedCoveredStorageSize),
                    coveredStorageUnit: String(result?.updatedCoveredStorageUnit)
                }
                await updateUserStorageData(updateStorageData)
                const storageLogsData = {
                    userId: String(pdfData?.userId),
                    documentId: _id,
                    storage: fileSize?.size,
                    unit: fileSize?.unit,
                    type: 'deleted'
                }
                await createUserStorageLogsData(storageLogsData)
            }
        }
        res.status(StatusCodes.OK).send({ success: true, message: PdfApiSource.delete.deletePdf.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const assignPdfFolder = async (req: AuthorizedRequest, res: Response) => {
    const { _id, folderId } = req.query;
    try {
        const pdfData = await getPdfById(_id)
        if (!pdfData) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Pdf data not found.' });
        await updatePdfData({...pdfData, folderId: folderId})
        res.status(StatusCodes.OK).send({ success: true, message: PdfApiSource.put.assignPdfFolder.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}