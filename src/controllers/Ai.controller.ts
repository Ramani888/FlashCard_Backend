import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import OpenAI from "openai";

export const getAskQuestionAnswer = async (req: AuthorizedRequest, res: Response) => {
    const { message } = req.body;

    const openai = new OpenAI({
        apiKey: process.env.API_KEY // Use your environment variable to load API key
    });
    try {
        // Use 'gpt-3.5-turbo' as the new model
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 200,
        });

        res.status(StatusCodes.OK).send({response: completion.choices[0].message.content});
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}