import express from "express";
import { getDemoRequest, uploadImage } from "../controllers/demo.controller";
import { blurAllCard, createCard, deleteCard, getCard, getCardType, moveCard, updateCard } from "../controllers/card.controller";
import { deleteSet, getSet, getSetByfolderId, insertSet, updateSet } from "../controllers/set.controller";
import { validateBody } from "../middlewares/bodyValidate.middleware";
import { createSetValidation, deleteSetValidation, getSetByFolderValidation, getSetValidation, updateSetValidation } from "../utils/validates/set.validate";
import { assignFolder, createFolder, createImagesFolder, createPdfFolder, deleteFolder, deleteImagesFolder, deletePdfFolder, getFolder, getImagesFolder, getPdfFolder, updateFolder, updateImagesFolder, updatePdfFolder } from "../controllers/folder.controller";
import { assignFolderValidation, createfolderValidation, createImagesFolderValidation, createPdfFolderValidation, deleteFolderValidation, deleteImagesFolderValidation, deletePdfFolderValidation, getFolderValidation, getImagesFolderValidation, getPdfFolderValidation, updateFolderValidation, updateImagesFolderValidation, updatePdfFolderValidation } from "../utils/validates/folder.validate";
import { SetApiSource } from "../utils/constants/set";
import { FolderApiSource, ImagesFolderApiSource, PdfFolderApiSource } from "../utils/constants/folder";
import { CardApiSource } from "../utils/constants/card";
import { blurAllCardValidation, createCardValidation, deleteCardValidation, getCardValidation, moveCardValidation, updateCardValidation } from "../utils/validates/card.validate";
import { SignUpApiSource } from "../utils/constants/signUp";
import { resendOtpValidation, signUpValidation, verifyOtpValidation } from "../utils/validates/signUp.validate";
import { resendOtp, signUp, verifyOtp } from "../controllers/signUp.controller";
import { LoginApiSource } from "../utils/constants/login";
import { loginValidation } from "../utils/validates/login.validate";
import { login } from "../controllers/login.controller";
import { NotesApiSource } from "../utils/constants/notes";
import { createNotesValidation, deleteNotesValidation, getNotesValidation, updateNotesValidation } from "../utils/validates/notes.validate";
import { createNotes, deleteNotes, getNotes, updateNotes } from "../controllers/notes.controller";
import { ContactsApiSource } from "../utils/constants/contacts";
import { addContactsValidation, deleteContactsValidation, getContactsValidation, getUsersValidation } from "../utils/validates/contacts.validate";
import { addContact, deleteContacts, getContacts, getUsers } from "../controllers/contacts.controller";
import upload from "./uploadConfig";
import { ImagesApiSource } from "../utils/constants/images";
import { assignImageFolderValidation, deleteImageValidation, getImageByFolderIdValidation, getImageValidation, updateImageValidation, uploadImageValidation } from "../utils/validates/images.validate";
import { assignImageFolder, deleteImages, getImages, getImagesByFolderId, updateImages, uploadImages } from "../controllers/images.controller";
import { PdfApiSource } from "../utils/constants/pdf";
import { assignPdfFolderValidation, deletePdfValidation, getPdfByFolderIdValidation, getPdfValidation, updatePdfValidation, uploadPdfValidation } from "../utils/validates/pdf.validation";
import { assignPdfFolder, deletePdf, getPdf, getPdfByFolderId, updatePdf, uploadPdf } from "../controllers/pdf.controller";
import { ProfileApiSource } from "../utils/constants/profile";
import { createSupportValidation, updatePasswordValidation, updatePasswordVerifyOtpValidation, updateProfilePictureValidation } from "../utils/validates/profile.validate";
import { createSupport, getSubscription, updatePassword, updatePasswordVerifyOtp, updateProfilePicture } from "../controllers/profile.controller";
import { MediatorApiSource } from "../utils/constants/mediator";
import { getMediatorSetValidation, updateMediatorCardValidation, updateMediatorSetValidation } from "../utils/validates/mediator.validate";
import { getMediatorSet, updateMediatorCard, updateMediatorSet } from "../controllers/mediator.controller";
import { AiApiSource } from "../utils/constants/AI";
import { askQuestionValidation } from "../utils/validates/Ai.validate";
import { getAskQuestionAnswer } from "../controllers/Ai.controller";

enum RouteSource {
    Body,
    Query,
    Params
}

const router = express.Router();

//Demo Request
router.get('/demo', getDemoRequest)

//Card Type
router.get(CardApiSource.get.getCardType.path, getCardType)

//Sign Up
router.post(SignUpApiSource?.post?.signUp?.path, validateBody(signUpValidation), signUp)
router.post(SignUpApiSource.post.verifyOtp.path, validateBody(verifyOtpValidation), verifyOtp)
router.put(SignUpApiSource.put.resendOtp.path, validateBody(resendOtpValidation, RouteSource?.Query), resendOtp)

//Login
router.post(LoginApiSource.post.login.path, validateBody(loginValidation), login)

//Set
router.post(SetApiSource.post.createSet.path, validateBody(createSetValidation), insertSet)
router.put(SetApiSource.put.updateSet.path, validateBody(updateSetValidation), updateSet)
router.delete(SetApiSource.delete.deleteSet.path, validateBody(deleteSetValidation, RouteSource?.Query), deleteSet)
router.get(SetApiSource.get.getSet.path, validateBody(getSetValidation, RouteSource?.Query), getSet)
router.get(SetApiSource.get.getSetByFolderId.path, validateBody(getSetByFolderValidation, RouteSource?.Query), getSetByfolderId)

//Folder
router.post(FolderApiSource.post.createFolder.path, validateBody(createfolderValidation), createFolder)
router.put(FolderApiSource.put.updateFolder.path, validateBody(updateFolderValidation), updateFolder)
router.delete(FolderApiSource.delete.deleteFolder.path, validateBody(deleteFolderValidation, RouteSource?.Query), deleteFolder)
router.get(FolderApiSource.get.getFolder.path, validateBody(getFolderValidation, RouteSource?.Query), getFolder)
router.put(FolderApiSource.put.assignFolder.path, validateBody(assignFolderValidation, RouteSource?.Query), assignFolder)

//Card
router.post(CardApiSource.post.createCard.path, validateBody(createCardValidation), createCard)
router.put(CardApiSource.put.updateCard.path, validateBody(updateCardValidation), updateCard)
router.get(CardApiSource.get.getCard.path, validateBody(getCardValidation, RouteSource?.Query), getCard)
router.delete(CardApiSource.delete.deleteCard.path, validateBody(deleteCardValidation, RouteSource?.Query), deleteCard)
router.put(CardApiSource.put.blurAllCard.path, validateBody(blurAllCardValidation, RouteSource.Query), blurAllCard)
router.put(CardApiSource.put.moveCard.path, validateBody(moveCardValidation, RouteSource.Query), moveCard)

//Notes
router.post(NotesApiSource.post.createNotes.path, validateBody(createNotesValidation), createNotes)
router.put(NotesApiSource.put.updateNotes.path, validateBody(updateNotesValidation), updateNotes)
router.delete(NotesApiSource.delete.deleteNotes.path, validateBody(deleteNotesValidation, RouteSource.Query), deleteNotes)
router.get(NotesApiSource.get.getNotes.path, validateBody(getNotesValidation, RouteSource.Query), getNotes)

//Contacts
router.get(ContactsApiSource.get.getUsers.path, validateBody(getUsersValidation, RouteSource.Query), getUsers)
router.post(ContactsApiSource.post.addContacts.path, validateBody(addContactsValidation), addContact)
router.get(ContactsApiSource.get.getContacts.path, validateBody(getContactsValidation, RouteSource.Query), getContacts)
router.delete(ContactsApiSource.delete.deleteContacts.path, validateBody(deleteContactsValidation, RouteSource.Query), deleteContacts)

router.post('/upload', upload.single('image'), uploadImage)

//ImagesFolder
router.post(ImagesFolderApiSource.post.createFolder.path, validateBody(createImagesFolderValidation), createImagesFolder)
router.put(ImagesFolderApiSource.put.updateFolder.path, validateBody(updateImagesFolderValidation), updateImagesFolder)
router.get(ImagesFolderApiSource.get.getFolder.path, validateBody(getImagesFolderValidation, RouteSource.Query), getImagesFolder)
router.delete(ImagesFolderApiSource.delete.deleteFolder.path, validateBody(deleteImagesFolderValidation, RouteSource.Query), deleteImagesFolder)

//PdfFolder
router.post(PdfFolderApiSource.post.createFolder.path, validateBody(createPdfFolderValidation), createPdfFolder)
router.put(PdfFolderApiSource.put.updateFolder.path, validateBody(updatePdfFolderValidation), updatePdfFolder)
router.get(PdfFolderApiSource.get.getFolder.path, validateBody(getPdfFolderValidation, RouteSource.Query), getPdfFolder)
router.delete(PdfFolderApiSource.delete.deleteFolder.path, validateBody(deletePdfFolderValidation, RouteSource.Query), deletePdfFolder)

//Upload Images
router.post(ImagesApiSource.post.uploadImage.path, upload.single('image'), validateBody(uploadImageValidation), uploadImages)
router.put(ImagesApiSource.put.updateImage.path, upload.single('image'), validateBody(updateImageValidation), updateImages)
router.get(ImagesApiSource.get.getImages.path, validateBody(getImageValidation, RouteSource.Query), getImages)
router.get(ImagesApiSource.get.getImagesByFolderId.path, validateBody(getImageByFolderIdValidation, RouteSource.Query), getImagesByFolderId)
router.delete(ImagesApiSource.delete.deleteImage.path, validateBody(deleteImageValidation, RouteSource.Query), deleteImages)
router.put(ImagesApiSource.put.assignImageFolder.path, validateBody(assignImageFolderValidation, RouteSource.Query), assignImageFolder)

//Upload Pdf
router.post(PdfApiSource.post.uploadPdf.path, upload.single('pdf'), validateBody(uploadPdfValidation), uploadPdf)
router.put(PdfApiSource.put.updatePdf.path, upload.single('pdf'), validateBody(updatePdfValidation), updatePdf)
router.get(PdfApiSource.get.getPdf.path, validateBody(getPdfValidation, RouteSource.Query), getPdf)
router.get(PdfApiSource.get.getPdfByFolderId.path, validateBody(getPdfByFolderIdValidation, RouteSource.Query), getPdfByFolderId)
router.delete(PdfApiSource.delete.deletePdf.path, validateBody(deletePdfValidation, RouteSource.Query), deletePdf)
router.put(PdfApiSource.put.assignPdfFolder.path, validateBody(assignPdfFolderValidation, RouteSource.Query), assignPdfFolder)

//Profile
router.put(ProfileApiSource.put.updateProfilePicture.path, upload.single('picture'), validateBody(updateProfilePictureValidation), updateProfilePicture)
router.put(ProfileApiSource.put.updatePassword.path, validateBody(updatePasswordValidation), updatePassword)
router.put(ProfileApiSource.put.updatePasswordVerifyOtp.path, validateBody(updatePasswordVerifyOtpValidation), updatePasswordVerifyOtp)
router.post(ProfileApiSource.post.createSupport.path, upload.single('image'), validateBody(createSupportValidation), createSupport)
router.get(ProfileApiSource.get.getSubscription.path, getSubscription)

//Mediator
router.get(MediatorApiSource.get.getMediatorSet.path, validateBody(getMediatorSetValidation, RouteSource.Query), getMediatorSet)
router.put(MediatorApiSource.put.updateMediatorSet.path, validateBody(updateMediatorSetValidation, RouteSource.Query), updateMediatorSet)
router.put(MediatorApiSource.put.updateMediatorCard.path, validateBody(updateMediatorCardValidation, RouteSource.Query), updateMediatorCard)

//Chat GPT AI
router.post(AiApiSource.post.askQuestion.path, validateBody(askQuestionValidation), getAskQuestionAnswer)

export default router;