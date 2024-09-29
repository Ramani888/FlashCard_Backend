import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { FLASHCARD_IMAGES_V1_BUCKET_NAME } from "../utils/constants/general";
import { deleteFromS3, uploadToS3 } from "../routes/uploadConfig";
import { ProfileApiSource } from "../utils/constants/profile";
import { getUserById, updateProfilePictureData } from "../services/profile.service";

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
        res.status(StatusCodes.OK).send({ success: true, message: ProfileApiSource.put.updateProfilePicture.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }

}