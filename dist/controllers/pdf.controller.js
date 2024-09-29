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
exports.assignPdfFolder = exports.deletePdf = exports.getPdfByFolderId = exports.getPdf = exports.updatePdf = exports.uploadPdf = void 0;
const http_status_codes_1 = require("http-status-codes");
const uploadConfig_1 = require("../routes/uploadConfig");
const general_1 = require("../utils/constants/general");
const pdf_1 = require("../utils/constants/pdf");
const pdf_service_1 = require("../services/pdf.service");
const uploadPdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        if (!req.file) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ error: 'Pdf file is missing.' });
            return;
        }
        const pdfUrl = yield (0, uploadConfig_1.uploadToS3)(req.file, general_1.FLASHCARD_PDF_V1_BUCKET_NAME);
        yield (0, pdf_service_1.uploadPdfData)(Object.assign(Object.assign({}, bodyData), { url: pdfUrl }));
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: pdf_1.PdfApiSource.post.uploadPdf.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.uploadPdf = uploadPdf;
const updatePdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        const file = req.file;
        if (file) {
            const pdfData = yield (0, pdf_service_1.getPdfById)(bodyData === null || bodyData === void 0 ? void 0 : bodyData._id);
            if (pdfData) {
                yield (0, uploadConfig_1.deleteFromS3)(pdfData === null || pdfData === void 0 ? void 0 : pdfData.url, general_1.FLASHCARD_PDF_V1_BUCKET_NAME);
            }
            const pdfUrl = yield (0, uploadConfig_1.uploadToS3)(req.file, general_1.FLASHCARD_PDF_V1_BUCKET_NAME);
            yield (0, pdf_service_1.updatePdfData)(Object.assign(Object.assign({}, bodyData), { url: pdfUrl }));
        }
        else {
            yield (0, pdf_service_1.updatePdfData)(bodyData);
        }
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: pdf_1.PdfApiSource.put.updatePdf.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updatePdf = updatePdf;
const getPdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const data = yield (0, pdf_service_1.getPdfData)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getPdf = getPdf;
const getPdfByFolderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, folderId } = req.query;
    try {
        const data = yield (0, pdf_service_1.getPdfDataByFolderId)(userId, folderId);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getPdfByFolderId = getPdfByFolderId;
const deletePdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    try {
        const pdfData = yield (0, pdf_service_1.getPdfById)(_id);
        if (pdfData) {
            yield (0, uploadConfig_1.deleteFromS3)(pdfData === null || pdfData === void 0 ? void 0 : pdfData.url, general_1.FLASHCARD_PDF_V1_BUCKET_NAME);
        }
        yield (0, pdf_service_1.deletePdfData)(_id);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: pdf_1.PdfApiSource.delete.deletePdf.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.deletePdf = deletePdf;
const assignPdfFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, folderId } = req.query;
    try {
        const pdfData = yield (0, pdf_service_1.getPdfById)(_id);
        if (!pdfData)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Pdf data not found.' });
        yield (0, pdf_service_1.updatePdfData)(Object.assign(Object.assign({}, pdfData), { folderId: folderId }));
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: pdf_1.PdfApiSource.put.assignPdfFolder.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.assignPdfFolder = assignPdfFolder;
