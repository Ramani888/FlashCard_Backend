import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { deleteFromS3, uploadToS3 } from "../routes/uploadConfig";
import { ImagesApiSource } from "../utils/constants/images";
import { deleteImagesData, getImagesById, getImagesData, updateImagesData, uploadImagesData } from "../services/images.service";
import { FLASHCARD_IMAGES_V1_BUCKET_NAME } from "../utils/constants/general";

export const uploadImages = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        if (!req.file) {
            res.status(StatusCodes.BAD_REQUEST).send({ error: 'Image file is missing.' });
            return;
        }
        const imageUrl = await uploadToS3(req.file, FLASHCARD_IMAGES_V1_BUCKET_NAME);
        await uploadImagesData({...bodyData, url: imageUrl});
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
            if (imagesData) {
                await deleteFromS3(imagesData?.url, FLASHCARD_IMAGES_V1_BUCKET_NAME)
            }
            const imageUrl = await uploadToS3(req.file, FLASHCARD_IMAGES_V1_BUCKET_NAME);
            await updateImagesData({...bodyData, url: imageUrl})
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

export const deleteImages = async (req: AuthorizedRequest, res: Response) => {
    const { _id } = req.query;
    try {
        const imagesData = await getImagesById(_id)
        if (imagesData) {
            await deleteFromS3(imagesData?.url, FLASHCARD_IMAGES_V1_BUCKET_NAME)
        }
        await deleteImagesData(_id);
        res.status(StatusCodes.OK).send({ success: true, message: ImagesApiSource.delete.deleteImage.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}