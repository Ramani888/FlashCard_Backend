import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { SubscriptionApiSource, USER_ALREADY_SUBSCRIBED } from "../utils/constants/subscription";
import { createSubscriptionData, updateSubscriptionData } from "../services/subscription.service";
import { getOneMonthAfterDate } from "../utils/helpers/date";

export const createSubscription = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        const endDate = getOneMonthAfterDate(bodyData?.startDate);
        await createSubscriptionData({...bodyData, endDate: endDate});
        res.status(StatusCodes.OK).send({ success: true, message: SubscriptionApiSource.post.createSubscription.message });
    } catch (err: any) {
        console.log(err);
        if (err.message === USER_ALREADY_SUBSCRIBED) {
            res.status(StatusCodes.CONFLICT).send({ error: USER_ALREADY_SUBSCRIBED });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Internal server error' });
        }
    }
}

export const updateSubscription = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req?.body;
    try {
        const endDate = getOneMonthAfterDate(bodyData?.startDate);
        await updateSubscriptionData({...bodyData, endDate: endDate});
        res.status(StatusCodes.OK).send({ success: true, message: SubscriptionApiSource.put.updateSubscription.message });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}