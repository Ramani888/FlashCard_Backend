import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { UserApiSource } from "../utils/constants/user";
import { createUserCreditLogsData, getUserCreditData, updateUserCreditData } from "../services/user.service";

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