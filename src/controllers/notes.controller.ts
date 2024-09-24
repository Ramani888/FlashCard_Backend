import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { NotesApiSource } from "../utils/constants/notes";
import { createNotesData, deleteNotesData, getNotesData, updateNotesData } from "../services/notes.service";

export const createNotes = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        await createNotesData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: NotesApiSource.post.createNotes.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updateNotes = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        await updateNotesData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: NotesApiSource.put.updateNotes.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const deleteNotes = async (req: AuthorizedRequest, res: Response) => {
    const { _id } = req.query;
    try {
        await deleteNotesData(_id);
        res.status(StatusCodes.OK).send({ success: true, message: NotesApiSource.delete.deleteNotes.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getNotes = async (req: AuthorizedRequest, res: Response) => {
    const { userId } = req.query;
    try {
        const data = await getNotesData(userId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}