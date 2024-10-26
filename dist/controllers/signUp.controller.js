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
const user_service_1 = require("../services/user.service");
const general_2 = require("../utils/constants/general");
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
        //Encrypt Password
        const newPassword = yield (0, general_1.encryptPassword)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.password);
        if (existingTempUser) {
            yield (0, signUp_service_1.updateTempUser)(Object.assign(Object.assign({}, bodyData), { password: newPassword }), Number(otp));
        }
        else {
            yield (0, signUp_service_1.createTempUser)(Object.assign(Object.assign({}, bodyData), { password: newPassword }), Number(otp));
        }
        const Template = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <p>Your OTP Code</p>
                <p>Your OTP is <strong>${otp}</strong></p>
            </div>
        `;
        // Send Mail
        yield (0, sendMail_1.default)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.email, 'OTP Verification', Template);
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
        const newUserId = yield (0, signUp_service_1.createUser)(tempUser);
        //Create New User Credit
        yield (0, user_service_1.createUserCreditData)({ userId: newUserId === null || newUserId === void 0 ? void 0 : newUserId.toString(), credit: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.credit });
        yield (0, user_service_1.createUserCreditLogsData)({ userId: newUserId === null || newUserId === void 0 ? void 0 : newUserId.toString(), creditBalance: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.credit, type: 'credited', note: 'When create new account.' });
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: signUp_1.SignUpApiSource.post.verifyOtp.userSuccessMsg });
        //Create New User Storage
        yield (0, user_service_1.createUserStorageData)({ userId: newUserId === null || newUserId === void 0 ? void 0 : newUserId.toString(), storage: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.storage, unit: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.storageUnit, coveredStorage: 0, coveredStorageUnit: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.storageUnit });
        yield (0, user_service_1.createUserStorageLogsData)({ userId: newUserId === null || newUserId === void 0 ? void 0 : newUserId.toString(), storage: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.storage, unit: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.storageUnit, type: 'added', note: 'When create new account.' });
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
        const Template = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <p>Your OTP Code</p>
                <p>Your OTP is <strong>${otp}</strong></p>
            </div>
        `;
        // Send Mail
        yield (0, sendMail_1.default)(email, 'OTP Verification', Template);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: signUp_1.SignUpApiSource.put.resendOtp.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.resendOtp = resendOtp;
