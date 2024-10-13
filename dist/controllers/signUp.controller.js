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
exports.resendOtp = exports.verifyOtp = exports.signUp = void 0;
const http_status_codes_1 = require("http-status-codes");
const signUp_service_1 = require("../services/signUp.service");
const general_1 = require("../utils/helpers/general");
const signUp_1 = require("../utils/constants/signUp");
const sendMail_1 = __importDefault(require("../utils/helpers/sendMail"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield (0, signUp_service_1.getUserByEmail)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.email);
        if (existingUser)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });
        // Generate OTP
        const otp = (0, general_1.generateOTP)();
        // Check if the temp user already exists
        const existingTempUser = yield (0, signUp_service_1.getTempUserByEmail)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.email);
        if (existingTempUser) {
            yield (0, signUp_service_1.updateTempUser)(bodyData, Number(otp));
        }
        else {
            yield (0, signUp_service_1.createTempUser)(bodyData, Number(otp));
        }
        // Send Mail
        yield (0, sendMail_1.default)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.email, 'Your OTP Code', `Your OTP is ${otp}`);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: signUp_1.SignUpApiSource.post.signUp.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.signUp = signUp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield (0, signUp_service_1.getUserByEmail)(email);
        if (existingUser)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });
        const tempUser = yield (0, signUp_service_1.getTempUserByEmail)(email);
        if (!tempUser) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Email Not Found.' });
        }
        else if (Number(tempUser === null || tempUser === void 0 ? void 0 : tempUser.otp) !== Number(otp)) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Invalid OTP.' });
        }
        yield (0, signUp_service_1.createUser)(tempUser);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: signUp_1.SignUpApiSource.post.verifyOtp.userSuccessMsg });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.verifyOtp = verifyOtp;
const resendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        // Check if the user already exists
        const existingUser = yield (0, signUp_service_1.getUserByEmail)(email);
        if (existingUser)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });
        // Generate OTP
        const otp = (0, general_1.generateOTP)();
        // Check if the temp user already exists
        const existingTempUser = yield (0, signUp_service_1.getTempUserByEmail)(email);
        if (existingTempUser) {
            yield (0, signUp_service_1.updateTempUser)({ email: email }, Number(otp));
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'User not found.' });
        }
        // Send Mail
        yield (0, sendMail_1.default)(email, 'Your OTP Code', `Your OTP is ${otp}`);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: signUp_1.SignUpApiSource.put.resendOtp.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.resendOtp = resendOtp;
