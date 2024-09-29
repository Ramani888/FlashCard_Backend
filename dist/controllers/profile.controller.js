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
exports.updateProfilePicture = void 0;
const http_status_codes_1 = require("http-status-codes");
const general_1 = require("../utils/constants/general");
const uploadConfig_1 = require("../routes/uploadConfig");
const profile_1 = require("../utils/constants/profile");
const profile_service_1 = require("../services/profile.service");
const updateProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        if (!req.file) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ error: 'Image file is missing.' });
            return;
        }
        const imageUrl = yield (0, uploadConfig_1.uploadToS3)(req.file, general_1.FLASHCARD_IMAGES_V1_BUCKET_NAME);
        yield (0, profile_service_1.updateProfilePictureData)(Object.assign(Object.assign({}, bodyData), { picture: imageUrl }));
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: profile_1.ProfileApiSource.put.updateProfilePicture.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateProfilePicture = updateProfilePicture;
