import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { getUserByEmail } from "../services/signUp.service";
import { LoginApiSource } from "../utils/constants/login";
import { comparePassword } from "../utils/helpers/general";
import jwt from 'jsonwebtoken';
const env = process.env;

export const login = async (req: AuthorizedRequest, res: Response) => {
    const { email, password } = req.body;
    try {
        //Email Convert Into Lowercase
        const LC_Email = email?.toLowerCase();

        // Check if the user already exists
        const existingUser = await getUserByEmail(LC_Email);
        if (!existingUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: LoginApiSource.post.login.messages.invalidEmail });

        const isPasswordValid = await new Promise((resolve) =>
            comparePassword(password, String(existingUser?.password))
            .then((result) => resolve(result))
            .catch((error) => resolve(false))
        );
        if (!isPasswordValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: LoginApiSource.post.login.messages.invalidPassword });
        }

        const SECRET_KEY: any = env.SECRET_KEY;
        const token = jwt.sign(
            { userId: existingUser?._id?.toString() },
            SECRET_KEY,
            { expiresIn: '30d' } // expires in 5 minutes
        );
        return res.status(StatusCodes.OK).send({ user: {...existingUser, token}, success: true, message: LoginApiSource.post.login.messages.success });

    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}