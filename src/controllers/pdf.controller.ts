import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { deleteFromS3, uploadToS3 } from "../routes/uploadConfig";
import { FLASHCARD_PDF_V1_BUCKET_NAME } from "../utils/constants/general";
import { PdfApiSource } from "../utils/constants/pdf";
import { deletePdfData, getPdfById, getPdfData, getPdfDataByFolderId, updatePdfData, uploadPdfData } from "../services/pdf.service";

export const uploadPdf = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        if (!req.file) {
            res.status(StatusCodes.BAD_REQUEST).send({ error: 'Pdf file is missing.' });
            return;
        }
        const pdfUrl = await uploadToS3(req.file, FLASHCARD_PDF_V1_BUCKET_NAME);
        await uploadPdfData({...bodyData, url: pdfUrl});
        res.status(StatusCodes.OK).send({ success: true, message: PdfApiSource.post.uploadPdf.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const updatePdf = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req.body;
    try {
        const file = req.file;
        if (file) {
            const pdfData = await getPdfById(bodyData?._id)
            if (pdfData) {
                await deleteFromS3(pdfData?.url, FLASHCARD_PDF_V1_BUCKET_NAME)
            }
            const pdfUrl = await uploadToS3(req.file, FLASHCARD_PDF_V1_BUCKET_NAME);
            await updatePdfData({...bodyData, url: pdfUrl})
        } else {
            await updatePdfData(bodyData)
        }
        res.status(StatusCodes.OK).send({ success: true, message: PdfApiSource.put.updatePdf.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getPdf = async (req: AuthorizedRequest, res: Response) => {
    const { userId } = req.query;
    try {
        const data = await getPdfData(userId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getPdfByFolderId = async (req: AuthorizedRequest, res: Response) => {
    const { userId, folderId } = req.query;
    try {
        const data = await getPdfDataByFolderId(userId, folderId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const deletePdf = async (req: AuthorizedRequest, res: Response) => {
    const { _id } = req.query;
    try {
        const pdfData = await getPdfById(_id)
        if (pdfData) {
            await deleteFromS3(pdfData?.url, FLASHCARD_PDF_V1_BUCKET_NAME)
        }
        await deletePdfData(_id);
        res.status(StatusCodes.OK).send({ success: true, message: PdfApiSource.delete.deletePdf.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const assignPdfFolder = async (req: AuthorizedRequest, res: Response) => {
    const { _id, folderId } = req.query;
    try {
        const pdfData = await getPdfById(_id)
        if (!pdfData) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Pdf data not found.' });
        await updatePdfData({...pdfData, folderId: folderId})
        res.status(StatusCodes.OK).send({ success: true, message: PdfApiSource.put.assignPdfFolder.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}