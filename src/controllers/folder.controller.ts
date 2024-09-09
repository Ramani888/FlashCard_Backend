import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { createFolderData, deleteFolderData, getFolderDataBycardTypeId, updateFolderData } from "../services/folder.service";
import { FolderApiSource } from "../utils/constants/folder";

export const createFolder = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        await createFolderData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: FolderApiSource.post.createFolder.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updateFolder = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        await updateFolderData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: FolderApiSource.put.updateFolder.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const deleteFolder = async (req: AuthorizedRequest, res: Response) => {
    const { _id } = req.query;
    try {
        await deleteFolderData(_id);
        res.status(StatusCodes.OK).send({ success: true, message: FolderApiSource.delete.deleteFolder.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getFolderBycardTypeId = async (req: AuthorizedRequest, res: Response) => {
    const { cardTypeId, userId } = req.query;
    try {
        const data = await getFolderDataBycardTypeId(cardTypeId, userId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}