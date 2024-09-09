import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { createTempUser, createUser, getTempUserByEmail, getUserByEmail, updateTempUser } from "../services/signUp.service";
import { generateOTP } from "../utils/helpers/general";
import { SignUpApiSource } from "../utils/constants/signUp";
import sendMail from "../utils/helpers/sendMail";

export const signUp = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        // Check if the user already exists
        const existingUser = await getUserByEmail(bodyData?.email);
        if (existingUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });

        // Generate OTP
        const otp = generateOTP();

        // Check if the temp user already exists
        const existingTempUser = await getTempUserByEmail(bodyData?.email);

        if (existingTempUser) {
            await updateTempUser(bodyData, Number(otp))
        } else {
            await createTempUser(bodyData, Number(otp));
        }

        // Send Mail
        await sendMail(bodyData?.email, 'Your OTP Code', `Your OTP is ${otp}`);

        res.status(StatusCodes.OK).send({ success: true, message: SignUpApiSource.post.signUp.message});        
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const verifyOtp = async (req: AuthorizedRequest, res: Response) => {
    const { email, otp } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });

        const tempUser = await getTempUserByEmail(email);

        if (!tempUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email Not Found.' });
        } else if (Number(tempUser?.otp) !== Number(otp)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid OTP.' });
        }

        await createUser(tempUser);
        res.status(StatusCodes.OK).send({ success: true, message: SignUpApiSource.post.verifyOtp.userSuccessMsg});
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}