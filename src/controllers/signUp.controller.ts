import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { createTempUser, createUser, getTempUserByEmail, getUserByEmail, updateTempUser } from "../services/signUp.service";
import { encryptPassword, generateOTP } from "../utils/helpers/general";
import { DEFAULT_PICTURE, SignUpApiSource } from "../utils/constants/signUp";
import sendMail from "../utils/helpers/sendMail";
import { createUserCreditData, createUserCreditLogsData, createUserStorageData, createUserStorageLogsData } from "../services/user.service";
import { FREE_TIER } from "../utils/constants/general";
import { createSubscriptionData } from "../services/subscription.service";
import { FREE_TIER_ID, USER_ALREADY_SUBSCRIBED } from "../utils/constants/subscription";
import { getOneMonthAfterDate } from "../utils/helpers/date";

export const signUp = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        //Email Convert Into Lowercase
        const email = bodyData?.email?.toLowerCase();

        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });

        // Generate OTP
        const otp = generateOTP();

        // Check if the temp user already exists
        const existingTempUser = await getTempUserByEmail(email);

        //Encrypt Password
        const newPassword = await encryptPassword(bodyData?.password)

        if (existingTempUser) {
            await updateTempUser({...bodyData, email: email, password: newPassword}, Number(otp), Date.now())
        } else {
            await createTempUser({...bodyData, email: email, password: newPassword}, Number(otp), Date.now());
        }

        const Template = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <p>Your OTP Code</p>
                <p>Your OTP is <strong>${otp}</strong></p>
            </div>
        `

        // Send Mail
        await sendMail(email, 'OTP Verification', Template);

        res.status(StatusCodes.OK).send({ success: true, message: SignUpApiSource.post.signUp.message});        
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const verifyOtp = async (req: AuthorizedRequest, res: Response) => {
    const { email, otp } = req.body;
    try {
        //Email Convert Into Lowercase
        const LC_Email = email?.toLowerCase();

        // Check if the user already exists
        const existingUser = await getUserByEmail(LC_Email);
        if (existingUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });

        const tempUser = await getTempUserByEmail(LC_Email);

        if (!tempUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email Not Found.' });
        } else if (Number(tempUser?.otp) !== Number(otp)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid OTP.' });
        } else if (Date.now() - tempUser?.otpTimeOut > 60000) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Your OTP has expired. Please resend it.' });
        }

        const newUserId = await createUser({...tempUser, email: tempUser?.email?.toLowerCase(), picture: DEFAULT_PICTURE});

        //Create New User Credit
        await createUserCreditData({ userId: newUserId?.toString(), credit: FREE_TIER?.credit });
        await createUserCreditLogsData({ userId: newUserId?.toString(), creditBalance: FREE_TIER?.credit, type: 'credited', note: 'When create new account.' });
        res.status(StatusCodes.OK).send({ success: true, message: SignUpApiSource.post.verifyOtp.userSuccessMsg});

        //Create New User Storage
        await createUserStorageData({ userId: newUserId?.toString(), storage: FREE_TIER?.storage, unit: FREE_TIER?.storageUnit, coveredStorage: 0, coveredStorageUnit: FREE_TIER?.storageUnit });
        await createUserStorageLogsData({ userId: newUserId?.toString(), storage: FREE_TIER?.storage, unit: FREE_TIER?.storageUnit, type: 'added', note: 'When create new account.' });

        //Subscribed New User For Free Tier
        const subscribedData = {
            tierId: FREE_TIER_ID,
            userId: newUserId?.toString(),
            startDate: new Date(),
            endDate: getOneMonthAfterDate(new Date())
        }
        await createSubscriptionData(subscribedData);
    } catch (err: any) {
        console.error(err);
        if (err.message === USER_ALREADY_SUBSCRIBED) {
            res.status(StatusCodes.CONFLICT).send({ error: USER_ALREADY_SUBSCRIBED });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
        }
    }
}

export const resendOtp = async (req: AuthorizedRequest, res: Response) => {
    const { email } = req.query;
    try {
        //Email Convert Into Lowercase
        const LC_Email = email?.toLowerCase();

        // Check if the user already exists
        const existingUser = await getUserByEmail(LC_Email);
        if (existingUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });

        // Generate OTP
        const otp = generateOTP();

        // Check if the temp user already exists
        const existingTempUser = await getTempUserByEmail(LC_Email);

        if (existingTempUser) {
            await updateTempUser({email: LC_Email}, Number(otp), Date.now())
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User not found.' });
        }

        const Template = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <p>Your OTP Code</p>
                <p>Your OTP is <strong>${otp}</strong></p>
            </div>
        `

        // Send Mail
        await sendMail(LC_Email, 'OTP Verification', Template);

        res.status(StatusCodes.OK).send({ success: true, message: SignUpApiSource.put.resendOtp.message}); 
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}