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
import { signUpValidation, verifyOtpValidation } from "../utils/validates/signUp.validate";
import { signUp, verifyOtp } from "../controllers/signUp.controller";
import { verify } from "crypto";
import { LoginApiSource } from "../utils/constants/login";
import { loginValidation } from "../utils/validates/login.validate";
import { login } from "../controllers/login.controller";
import { NotesApiSource } from "../utils/constants/notes";
import { createNotesValidation, deleteNotesValidation, getNotesValidation, updateNotesValidation } from "../utils/validates/notes.validate";
import { createNotes, deleteNotes, getNotes, updateNotes } from "../controllers/notes.controller";
import { ContactsApiSource } from "../utils/constants/contacts";
import { addContactsValidation, getContactsValidation, getUsersValidation } from "../utils/validates/contacts.validate";
import { addContact, getContacts, getUsers } from "../controllers/contacts.controller";
import upload from "./uploadConfig";

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
export default router;