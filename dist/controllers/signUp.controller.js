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
const subscription_service_1 = require("../services/subscription.service");
const subscription_1 = require("../utils/constants/subscription");
const date_1 = require("../utils/helpers/date");
const CreateAccountTemplate_1 = require("../utils/emailTemplate/CreateAccountTemplate");
const otpTemplate_1 = require("../utils/emailTemplate/otpTemplate");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bodyData = req.body;
    try {
        //Email Convert Into Lowercase
        const email = (_a = bodyData === null || bodyData === void 0 ? void 0 : bodyData.email) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        // Check if the user already exists
        const existingUser = yield (0, signUp_service_1.getUserByEmail)(email);
        if (existingUser)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });
        // Generate OTP
        const otp = (0, general_1.generateOTP)();
        // Check if the temp user already exists
        const existingTempUser = yield (0, signUp_service_1.getTempUserByEmail)(email);
        //Encrypt Password
        const newPassword = yield (0, general_1.encryptPassword)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.password);
        if (existingTempUser) {
            yield (0, signUp_service_1.updateTempUser)(Object.assign(Object.assign({}, bodyData), { email: email, password: newPassword }), Number(otp), Date.now());
        }
        else {
            yield (0, signUp_service_1.createTempUser)(Object.assign(Object.assign({}, bodyData), { email: email, password: newPassword }), Number(otp), Date.now());
        }
        const otpTemplate = (0, otpTemplate_1.getOtpTemplate)(Number(otp));
        // Send Mail
        yield (0, sendMail_1.default)(email, 'OTP Verification', otpTemplate);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: signUp_1.SignUpApiSource.post.signUp.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.signUp = signUp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, otp } = req.body;
    try {
        //Email Convert Into Lowercase
        const LC_Email = email === null || email === void 0 ? void 0 : email.toLowerCase();
        // Check if the user already exists
        const existingUser = yield (0, signUp_service_1.getUserByEmail)(LC_Email);
        if (existingUser)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });
        const tempUser = yield (0, signUp_service_1.getTempUserByEmail)(LC_Email);
        if (!tempUser) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Email Not Found.' });
        }
        else if (Number(tempUser === null || tempUser === void 0 ? void 0 : tempUser.otp) !== Number(otp)) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Invalid OTP.' });
        }
        else if (Date.now() - (tempUser === null || tempUser === void 0 ? void 0 : tempUser.otpTimeOut) > 60000) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Your OTP has expired. Please resend it.' });
        }
        const newUserId = yield (0, signUp_service_1.createUser)(Object.assign(Object.assign({}, tempUser), { email: (_a = tempUser === null || tempUser === void 0 ? void 0 : tempUser.email) === null || _a === void 0 ? void 0 : _a.toLowerCase(), picture: signUp_1.DEFAULT_PICTURE }));
        //Create New User Credit
        yield (0, user_service_1.createUserCreditData)({ userId: newUserId === null || newUserId === void 0 ? void 0 : newUserId.toString(), credit: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.credit });
        yield (0, user_service_1.createUserCreditLogsData)({ userId: newUserId === null || newUserId === void 0 ? void 0 : newUserId.toString(), creditBalance: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.credit, type: 'credited', note: 'When create new account.' });
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: signUp_1.SignUpApiSource.post.verifyOtp.userSuccessMsg });
        //Create New User Storage
        yield (0, user_service_1.createUserStorageData)({ userId: newUserId === null || newUserId === void 0 ? void 0 : newUserId.toString(), storage: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.storage, unit: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.storageUnit, coveredStorage: 0, coveredStorageUnit: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.storageUnit });
        yield (0, user_service_1.createUserStorageLogsData)({ userId: newUserId === null || newUserId === void 0 ? void 0 : newUserId.toString(), storage: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.storage, unit: general_2.FREE_TIER === null || general_2.FREE_TIER === void 0 ? void 0 : general_2.FREE_TIER.storageUnit, type: 'added', note: 'When create new account.' });
        //Subscribed New User For Free Tier
        const subscribedData = {
            tierId: subscription_1.FREE_TIER_ID,
            userId: newUserId === null || newUserId === void 0 ? void 0 : newUserId.toString(),
            startDate: new Date(),
            endDate: (0, date_1.getOneMonthAfterDate)(new Date())
        };
        yield (0, subscription_service_1.createSubscriptionData)(subscribedData);
        //Send mail for account created
        const accountCreatedTemplate = (0, CreateAccountTemplate_1.getCreateAccountTemplate)(tempUser === null || tempUser === void 0 ? void 0 : tempUser.userName);
        yield (0, sendMail_1.default)(tempUser === null || tempUser === void 0 ? void 0 : tempUser.email, 'Account Created', accountCreatedTemplate);
    }
    catch (err) {
        console.error(err);
        if (err.message === subscription_1.USER_ALREADY_SUBSCRIBED) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).send({ error: subscription_1.USER_ALREADY_SUBSCRIBED });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
        }
    }
});
exports.verifyOtp = verifyOtp;
const resendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        //Email Convert Into Lowercase
        const LC_Email = email === null || email === void 0 ? void 0 : email.toLowerCase();
        // Check if the user already exists
        const existingUser = yield (0, signUp_service_1.getUserByEmail)(LC_Email);
        if (existingUser)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'User already exists.' });
        // Generate OTP
        const otp = (0, general_1.generateOTP)();
        // Check if the temp user already exists
        const existingTempUser = yield (0, signUp_service_1.getTempUserByEmail)(LC_Email);
        if (existingTempUser) {
            yield (0, signUp_service_1.updateTempUser)({ email: LC_Email }, Number(otp), Date.now());
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'User not found.' });
        }
        // const Template = `
        //     <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        //         <p>Your OTP Code</p>
        //         <p>Your OTP is <strong>${otp}</strong></p>
        //     </div>
        // `
        const otpTemplate = (0, otpTemplate_1.getOtpTemplate)(Number(otp));
        // Send Mail
        yield (0, sendMail_1.default)(LC_Email, 'OTP Verification', otpTemplate);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: signUp_1.SignUpApiSource.put.resendOtp.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.resendOtp = resendOtp;
