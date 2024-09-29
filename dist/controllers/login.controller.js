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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const signUp_service_1 = require("../services/signUp.service");
const login_1 = require("../utils/constants/login");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield (0, signUp_service_1.getUserByEmail)(email);
        if (!existingUser)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: login_1.LoginApiSource.post.login.messages.invalidEmail });
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.password) !== password) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: login_1.LoginApiSource.post.login.messages.invalidPassword });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).send({ user: existingUser, success: true, message: login_1.LoginApiSource.post.login.messages.success });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.login = login;
