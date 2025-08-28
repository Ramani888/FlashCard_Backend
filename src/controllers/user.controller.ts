import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { UserApiSource } from "../utils/constants/user";
import { addAutoTranslateSetsAndCardsData, createUserCreditLogsData, createUserDefaultCards, getUserCreditData, updateUserCreditData } from "../services/user.service";
import { getAutoCardByUserId } from "../services/card.service";

export const updateUserCredit = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        const { userId, credit, type } = bodyData;
        const userCreditData = await getUserCreditData(userId);
        let creditCount = userCreditData?.credit;
        if (type === 'credited') {
            creditCount = Number(creditCount) + Number(credit);
            await createUserCreditLogsData({userId: userId, creditBalance: Number(credit), type: 'credited'})
        } else {
            creditCount = Number(creditCount) - Number(credit);
            await createUserCreditLogsData({userId: userId, creditBalance: Number(credit), type: 'debited'})
        }
        await updateUserCreditData({userId: userId, credit: Number(creditCount) });
        res.status(StatusCodes.OK).send({ success: true, message: UserApiSource.put.updateCredit.message});
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const addDefaultSetsAndCards = async (req: AuthorizedRequest, res: Response) => {
    const { userId, language } = req.query;
    try {
        const data = await getAutoCardByUserId(userId);
        if (data?.length > 0) {
            return res.status(StatusCodes.OK).send({ success: true, message: "Sets and cards already added." });
        }
        await createUserDefaultCards(userId, language);
        res.status(StatusCodes.OK).send({ success: true, message: UserApiSource.post.addDefaultSetsAndCards.message });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const addAutoTranslateSetsAndCards = async (req: AuthorizedRequest, res: Response) => {
    const { language } = req.query;
    try {
        await addAutoTranslateSetsAndCardsData(language);
        res.status(StatusCodes.OK).send({ success: true, message: UserApiSource.post.addAutoTranslateSetsAndCards.message });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}