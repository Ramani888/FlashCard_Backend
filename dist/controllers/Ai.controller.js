"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAskQuestionAnswer = void 0;
const http_status_codes_1 = require("http-status-codes");
const openai_1 = __importDefault(require("openai"));
const getAskQuestionAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    const openai = new openai_1.default({
        apiKey: process.env.API_KEY // Use your environment variable to load API key
    });
    try {
        // Use 'gpt-3.5-turbo' as the new model
        const completion = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 200,
        });
        res.status(http_status_codes_1.StatusCodes.OK).send({ response: completion.choices[0].message.content });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getAskQuestionAnswer = getAskQuestionAnswer;
