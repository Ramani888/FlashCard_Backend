import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { createFolderData, deleteFolderData, getFolderDataBycardTypeId, updateFolderData } from "../services/folder.service";
import { FolderApiSource } from "../utils/constants/folder";
import { getCardBySetId, updateCardData } from "../services/card.service";
import { getSetBySetId, updateSetData } from "../services/set.services";

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

export const assignFolder = async (req: AuthorizedRequest, res: Response) => {
    const { folderId, setId } = req.query;
    try {
    
        /********** first cart in update folderId **********/
        const cardData = await getCardBySetId(setId);
        cardData?.map(async (item) => {
            if (cardData) {
                const updatedCardData = {
                    ...item,
                    note: item?.note || '',
                    folderId: folderId
                };
                await updateCardData(updatedCardData);
            }
        })

        /********** second set in update folderId **********/
        const setData = await getSetBySetId(setId);
        if (setData) {
            const updatedSetData = {
               ...setData?.toObject(),
                folderId: folderId
            };
            await updateSetData(updatedSetData);
        }

        res.status(StatusCodes.OK).send({ success: true, message: FolderApiSource.put.assignFolder.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}