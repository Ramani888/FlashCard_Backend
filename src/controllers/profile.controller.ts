import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { FLASHCARD_IMAGES_V1_BUCKET_NAME, FLASHCARD_PDF_V1_BUCKET_NAME, FLASHCARD_SUPPORT_V1_BUCKET_NAME } from "../utils/constants/general";
import { deleteFromS3, uploadToS3 } from "../routes/uploadConfig";
import { ProfileApiSource } from "../utils/constants/profile";
import { createSupportData, getSubscriptionData, getUserById, updatePasswordData, updateProfilePictureData } from "../services/profile.service";
import { getTempUserByEmail, getUserByEmail, updateTempUserPassword } from "../services/signUp.service";
import { generateOTP, getIssueSentence } from "../utils/helpers/general";
import { NotesApiSource } from "../utils/constants/notes";
import sendMail from "../utils/helpers/sendMail";
import { getSupportEmailTemplate } from "../utils/emailTemplate/support";

export const updateProfilePicture = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        if (!req.file) {
            res.status(StatusCodes.BAD_REQUEST).send({ error: 'Image file is missing.' });
            return;
        }
        const userData = await getUserById(bodyData?._id);
        if (userData?.picture)  {
            await deleteFromS3(userData?.picture, FLASHCARD_IMAGES_V1_BUCKET_NAME)
        }
        const imageUrl = await uploadToS3(req.file, FLASHCARD_IMAGES_V1_BUCKET_NAME);
        await updateProfilePictureData({...bodyData, picture: imageUrl});
        const updateUserData = await getUserById(bodyData?._id);
        res.status(StatusCodes.OK).send({ user: updateUserData, success: true, message: ProfileApiSource.put.updateProfilePicture.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }

}

export const getSubscription = async (req: AuthorizedRequest, res: Response) => {
    try {
        const data = await getSubscriptionData();
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updatePassword = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        // Check if the user exists or not
        const existingUser = await getUserByEmail(bodyData?.email);
        if (!existingUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User does not exists.' });

        // Generate OTP
        const otp = generateOTP();

        // Check if the temp user already exists
        const existingTempUser = await getTempUserByEmail(bodyData?.email);
        if (existingTempUser) {
            updateTempUserPassword(bodyData, Number(otp))
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User does not exists.' });
        }

        const Template = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <p>Your OTP Code</p>
                <p>Your OTP is <strong>${otp}</strong></p>
            </div>
        `

         // Send Mail
         await sendMail(bodyData?.email, 'OTP Verification', Template);
        // await updatePasswordData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: ProfileApiSource.put.updatePassword.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updatePasswordVerifyOtp = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        const existingTempUser = await getTempUserByEmail(bodyData?.email);
        if (Number(existingTempUser?.otp) !== Number(bodyData?.otp)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'OTP Does Not Match.' });
        
        await updatePasswordData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: ProfileApiSource.put.updatePasswordVerifyOtp.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const createSupport = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        // const sentenceData = getIssueSentence(bodyData?.supportType);
        const userData = await getUserById(bodyData?.userId)

        const emailTemplate = getSupportEmailTemplate(String(userData?.email), String(userData?.userName), bodyData?.supportMessage);
        if (req.file) {
            const imageUrl = await uploadToS3(req.file, FLASHCARD_SUPPORT_V1_BUCKET_NAME);
            await createSupportData({...bodyData, image: imageUrl})
            await sendMail('ramanidivyesh888@gmail.com', 'SUPPORT', emailTemplate, imageUrl); //Roadtojesusministry@gmail.com
        } else {
            await createSupportData({...bodyData})
            await sendMail('ramanidivyesh888@gmail.com', 'SUPPORT', emailTemplate); //Roadtojesusministry@gmail.com
        }
        
        res.status(StatusCodes.OK).send({ success: true, message: ProfileApiSource.post.createSupport.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}