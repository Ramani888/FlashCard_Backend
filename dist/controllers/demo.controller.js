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
exports.uploadImage = exports.getDemoRequest = void 0;
const http_status_codes_1 = require("http-status-codes");
const demo_service_1 = require("../services/demo.service");
const uploadConfig_1 = require("../routes/uploadConfig");
const general_1 = require("../utils/constants/general");
const getDemoRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, demo_service_1.getDemoRequestData)();
        res.status(http_status_codes_1.StatusCodes.OK).send({ data });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getDemoRequest = getDemoRequest;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            throw new Error('No file uploaded.');
        }
        console.log('FILE', req.file);
        const imageUrl = yield (0, uploadConfig_1.uploadToS3)(req.file, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
        console.log('imageUrl', imageUrl);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.uploadImage = uploadImage;
