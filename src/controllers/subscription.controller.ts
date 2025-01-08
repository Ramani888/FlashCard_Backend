import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { FREE_TIER_ID, SubscriptionApiSource, USER_ALREADY_SUBSCRIBED } from "../utils/constants/subscription";
import { createSubscriptionData, getSubscriptionDataByuserId, updateSubscriptionData } from "../services/subscription.service";
import { getOneMonthAfterDate } from "../utils/helpers/date";
import { getTierDataById } from "../services/profile.service";
import { createUserCreditLogsData, createUserStorageLogsData, getUserCreditData, updateUserCreditData, updateUserStorageLimitData } from "../services/user.service";
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

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

        //Update User Storage
        const tierData = await getTierDataById(bodyData?.tierId);
        const updateTierData = {
            storage: Number(tierData?.cloudStorage),
            unit: String(tierData?.cloudeStorageUnit),
            userId: bodyData?.userId
        }
        await updateUserStorageLimitData(updateTierData);
        await createUserStorageLogsData({ userId: bodyData?.userId, storage: Number(tierData?.cloudStorage), unit: String(tierData?.cloudeStorageUnit), type: 'added', note: 'When update subscription tier.' });

        //Update User Credit
        const userCreditData = await getUserCreditData(bodyData?.userId);
        const creditCount = Number(userCreditData?.credit) + Number(tierData?.credit);
        await updateUserCreditData({userId: bodyData?.userId, credit: Number(creditCount) });
        await createUserCreditLogsData({ userId: bodyData?.userId, creditBalance: Number(userCreditData?.credit), type: 'credited', note: 'When update subscription tier.' });

        res.status(StatusCodes.OK).send({ success: true, message: SubscriptionApiSource.put.updateSubscription.message });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const cancelSubscription = async (req: AuthorizedRequest, res: Response) => {
    const { packageName, subscriptionId, purchaseToken, userId } = req.body;
    
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });

    const androidPublisher = google.androidpublisher({
        version: 'v3',
        auth,
    });

    try {
        const subscriptionData = await getSubscriptionDataByuserId(userId);

        const response = await androidPublisher.purchases.subscriptions.cancel({
            packageName,
            subscriptionId,
            token: purchaseToken,
        });

        console.log('response', response);
        if (response.status === 200) {
            // Update Subscription Plan to Free Tier
            await updateSubscriptionData({
                _id: subscriptionData?._id?.toString(),
                tierId: FREE_TIER_ID,
                userId,
                startDate: new Date(),
                endDate: getOneMonthAfterDate(new Date()),
            });

            // Update User Storage
            const tierData = await getTierDataById(FREE_TIER_ID);
            const updateTierData = {
                storage: Number(tierData?.cloudStorage),
                unit: String(tierData?.cloudeStorageUnit),
                userId,
            };
            await updateUserStorageLimitData(updateTierData);
            await createUserStorageLogsData({ userId, storage: Number(tierData?.cloudStorage), unit: String(tierData?.cloudeStorageUnit), type: 'added', note: 'When updating subscription tier.' });

            // Update User Credit
            const userCreditData = await getUserCreditData(userId);
            const creditCount = Number(userCreditData?.credit) + Number(tierData?.credit);
            await updateUserCreditData({ userId, credit: Number(creditCount) });
            await createUserCreditLogsData({ userId, creditBalance: Number(userCreditData?.credit), type: 'credited', note: 'When updating subscription tier.' });

            res.status(StatusCodes.OK).send({ success: true, message: SubscriptionApiSource.put.cancelSubscription.path });
        } else {
            console.error('Failed to cancel subscription:', response.data);
            res.status(StatusCodes.BAD_REQUEST).send({ success: false, message: 'Failed to cancel subscription.' });
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
};