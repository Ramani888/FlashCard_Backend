import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { getUserByEmail } from "../services/signUp.service";
import { LoginApiSource } from "../utils/constants/login";
import { comparePassword } from "../utils/helpers/general";

export const login = async (req: AuthorizedRequest, res: Response) => {
    const { email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (!existingUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: LoginApiSource.post.login.messages.invalidEmail });

        const isPasswordValid = await new Promise((resolve) =>
            comparePassword(password, String(existingUser?.password))
            .then((result) => resolve(result))
            .catch((error) => resolve(false))
        );
        if (!isPasswordValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: LoginApiSource.post.login.messages.invalidPassword });
        }

        return res.status(StatusCodes.OK).send({ user: existingUser, success: true, message: LoginApiSource.post.login.messages.success });

    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}