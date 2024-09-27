import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { getDemoRequestData } from "../services/demo.service";
import { uploadToS3 } from "../routes/uploadConfig";

export const getDemoRequest = async (req: AuthorizedRequest, res: Response) => {
    try {
        const data = await getDemoRequestData();
        res.status(StatusCodes.OK).send({ data });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }

}

export const uploadImage = async (req: AuthorizedRequest, res: Response) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded.');
        }
        console.log('FILE', req.file);
        const imageUrl = await uploadToS3(req.file);
        console.log('imageUrl', imageUrl)
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}