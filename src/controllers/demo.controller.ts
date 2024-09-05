import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { getDemoRequestData } from "../services/demo.service";

export const getDemoRequest = async (req: AuthorizedRequest, res: Response) => {
    try {
        const data = await getDemoRequestData();
        res.status(StatusCodes.OK).send({ data });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }

}