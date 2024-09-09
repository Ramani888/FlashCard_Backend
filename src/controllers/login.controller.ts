import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { getUserByEmail } from "../services/signUp.service";
import { LoginApiSource } from "../utils/constants/login";

export const login = async (req: AuthorizedRequest, res: Response) => {
    const { email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (!existingUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: LoginApiSource.post.login.messages.invalidEmail });

        if (existingUser?.password !== password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: LoginApiSource.post.login.messages.invalidPassword });
        }

        return res.status(StatusCodes.OK).send({ user: existingUser, success: true, message: LoginApiSource.post.login.messages.success });

    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}