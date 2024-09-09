import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { getCardTypeData } from "../services/card.service";
import { CardApiSource } from "../utils/constants/card";

export const getCardType = async (req: AuthorizedRequest, res: Response) => {
    try {
        const data = await getCardTypeData();
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

// export const createCard = async (req: AuthorizedRequest, res: Response) => {
//     const bodyData = req.body;
//     try {
//         await createCardData(bodyData);
//         res.status(StatusCodes.OK).send({ success: true, message: CardApiSource.post.createCard.message }); 
//     } catch (err) {
//         console.error(err);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
//     }
// }