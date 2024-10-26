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
exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const signUp_service_1 = require("../services/signUp.service");
const login_1 = require("../utils/constants/login");
const general_1 = require("../utils/helpers/general");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env = process.env;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield (0, signUp_service_1.getUserByEmail)(email);
        if (!existingUser)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: login_1.LoginApiSource.post.login.messages.invalidEmail });
        const isPasswordValid = yield new Promise((resolve) => (0, general_1.comparePassword)(password, String(existingUser === null || existingUser === void 0 ? void 0 : existingUser.password))
            .then((result) => resolve(result))
            .catch((error) => resolve(false)));
        if (!isPasswordValid) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: login_1.LoginApiSource.post.login.messages.invalidPassword });
        }
        const SECRET_KEY = env.SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ userId: (_a = existingUser === null || existingUser === void 0 ? void 0 : existingUser._id) === null || _a === void 0 ? void 0 : _a.toString(), username: existingUser === null || existingUser === void 0 ? void 0 : existingUser.userName }, SECRET_KEY, { expiresIn: '30d' });
        return res.status(http_status_codes_1.StatusCodes.OK).send({ user: Object.assign(Object.assign({}, existingUser), { token }), success: true, message: login_1.LoginApiSource.post.login.messages.success });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.login = login;
