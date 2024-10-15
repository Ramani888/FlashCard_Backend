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
exports.createSupport = exports.updatePasswordVerifyOtp = exports.updatePassword = exports.getSubscription = exports.updateProfilePicture = void 0;
const http_status_codes_1 = require("http-status-codes");
const general_1 = require("../utils/constants/general");
const uploadConfig_1 = require("../routes/uploadConfig");
const profile_1 = require("../utils/constants/profile");
const profile_service_1 = require("../services/profile.service");
const signUp_service_1 = require("../services/signUp.service");
const general_2 = require("../utils/helpers/general");
const sendMail_1 = __importDefault(require("../utils/helpers/sendMail"));
const updateProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        if (!req.file) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ error: 'Image file is missing.' });
            return;
        }
        const userData = yield (0, profile_service_1.getUserById)(bodyData === null || bodyData === void 0 ? void 0 : bodyData._id);
        if (userData === null || userData === void 0 ? void 0 : userData.picture) {
            yield (0, uploadConfig_1.deleteFromS3)(userData === null || userData === void 0 ? void 0 : userData.picture, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
        }
        const imageUrl = yield (0, uploadConfig_1.uploadToS3)(req.file, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
        yield (0, profile_service_1.updateProfilePictureData)(Object.assign(Object.assign({}, bodyData), { picture: imageUrl }));
        const updateUserData = yield (0, profile_service_1.getUserById)(bodyData === null || bodyData === void 0 ? void 0 : bodyData._id);
        res.status(http_status_codes_1.StatusCodes.OK).send({ user: updateUserData, success: true, message: profile_1.ProfileApiSource.put.updateProfilePicture.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateProfilePicture = updateProfilePicture;
const getSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, profile_service_1.getSubscriptionData)();
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getSubscription = getSubscription;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        // Check if the user exists or not
        const existingUser = yield (0, signUp_service_1.getUserByEmail)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.email);
        if (!existingUser)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'User does not exists.' });
        // Generate OTP
        const otp = (0, general_2.generateOTP)();
        // Check if the temp user already exists
        const existingTempUser = yield (0, signUp_service_1.getTempUserByEmail)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.email);
        if (existingTempUser) {
            (0, signUp_service_1.updateTempUserPassword)(bodyData, Number(otp));
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'User does not exists.' });
        }
        // Send Mail
        yield (0, sendMail_1.default)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.email, 'Your OTP Code', `Your OTP is ${otp}`);
        // await updatePasswordData(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: profile_1.ProfileApiSource.put.updatePassword.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updatePassword = updatePassword;
const updatePasswordVerifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        const existingTempUser = yield (0, signUp_service_1.getTempUserByEmail)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.email);
        if (Number(existingTempUser === null || existingTempUser === void 0 ? void 0 : existingTempUser.otp) !== Number(bodyData === null || bodyData === void 0 ? void 0 : bodyData.otp))
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'OTP Does Not Match.' });
        yield (0, profile_service_1.updatePasswordData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: profile_1.ProfileApiSource.put.updatePasswordVerifyOtp.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updatePasswordVerifyOtp = updatePasswordVerifyOtp;
const createSupport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        const sentenceData = (0, general_2.getIssueSentence)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.supportType);
        if (req.file) {
            const imageUrl = yield (0, uploadConfig_1.uploadToS3)(req.file, general_1.FLASHCARD_SUPPORT_V1_BUCKET_NAME);
            yield (0, profile_service_1.createSupportData)(Object.assign(Object.assign({}, bodyData), { image: imageUrl }));
            yield (0, sendMail_1.default)('ramanidivyesh888@gmail.com', 'SUPPORT', sentenceData, imageUrl); //Roadtojesusministry@gmail.com
        }
        else {
            yield (0, profile_service_1.createSupportData)(Object.assign({}, bodyData));
            yield (0, sendMail_1.default)('ramanidivyesh888@gmail.com', 'SUPPORT', sentenceData); //Roadtojesusministry@gmail.com
        }
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: profile_1.ProfileApiSource.post.createSupport.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.createSupport = createSupport;
