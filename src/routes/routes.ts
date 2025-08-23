import express from "express";
import { getDemoRequest, uploadImage } from "../controllers/demo.controller";
import { blurAllCard, createCard, deleteCard, getAllCard, getCard, getCardType, moveCard, updateCard } from "../controllers/card.controller";
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
import { createSupportValidation, getProfileValidation, updatePasswordValidation, updatePasswordVerifyOtpValidation, updateProfilePictureValidation } from "../utils/validates/profile.validate";
import { createSupport, getProfile, getSubscription, updatePassword, updatePasswordVerifyOtp, updateProfilePicture } from "../controllers/profile.controller";
import { MediatorApiSource } from "../utils/constants/mediator";
import { getMediatorSetValidation, updateMediatorCardValidation, updateMediatorSetValidation } from "../utils/validates/mediator.validate";
import { getMediatorSet, updateMediatorCard, updateMediatorSet } from "../controllers/mediator.controller";
import { AiApiSource } from "../utils/constants/AI";
import { askQuestionValidation } from "../utils/validates/Ai.validate";
import { getAskQuestionAnswer } from "../controllers/Ai.controller";
import { UserApiSource } from "../utils/constants/user";
import { addDefaultSetsAndCardsValidation, updateUserCreditValidation } from "../utils/validates/user.validate";
import { addDefaultSetsAndCards, updateUserCredit } from "../controllers/user.controller";
import { authenticateToken } from "../utils/helpers/general";
import { SubscriptionApiSource } from "../utils/constants/subscription";
import { cancelSubscriptionValidation, createSubscriptionValidation, updateSubscriptionValidation } from "../utils/validates/subscription.validate";
import { cancelSubscription, createSubscription, updateSubscription } from "../controllers/subscription.controller";

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
router.post(SetApiSource.post.createSet.path, authenticateToken, validateBody(createSetValidation), insertSet)
router.put(SetApiSource.put.updateSet.path, authenticateToken, validateBody(updateSetValidation), updateSet)
router.delete(SetApiSource.delete.deleteSet.path, authenticateToken, validateBody(deleteSetValidation, RouteSource?.Query), deleteSet)
router.get(SetApiSource.get.getSet.path, authenticateToken, validateBody(getSetValidation, RouteSource?.Query), getSet)
router.get(SetApiSource.get.getSetByFolderId.path, authenticateToken, validateBody(getSetByFolderValidation, RouteSource?.Query), getSetByfolderId)

//Folder
router.post(FolderApiSource.post.createFolder.path, authenticateToken, validateBody(createfolderValidation), createFolder)
router.put(FolderApiSource.put.updateFolder.path, authenticateToken, validateBody(updateFolderValidation), updateFolder)
router.delete(FolderApiSource.delete.deleteFolder.path, authenticateToken, validateBody(deleteFolderValidation, RouteSource?.Query), deleteFolder)
router.get(FolderApiSource.get.getFolder.path, authenticateToken, validateBody(getFolderValidation, RouteSource?.Query), getFolder)
router.put(FolderApiSource.put.assignFolder.path, authenticateToken, validateBody(assignFolderValidation, RouteSource?.Query), assignFolder)


//Card
router.post(CardApiSource.post.createCard.path, authenticateToken, validateBody(createCardValidation), createCard)
router.put(CardApiSource.put.updateCard.path, authenticateToken, validateBody(updateCardValidation), updateCard)
router.get(CardApiSource.get.getCard.path, authenticateToken, validateBody(getCardValidation, RouteSource?.Query), getCard)
router.delete(CardApiSource.delete.deleteCard.path, authenticateToken, validateBody(deleteCardValidation, RouteSource?.Query), deleteCard)
router.put(CardApiSource.put.blurAllCard.path, authenticateToken, validateBody(blurAllCardValidation, RouteSource.Query), blurAllCard)
router.put(CardApiSource.put.moveCard.path, authenticateToken, validateBody(moveCardValidation, RouteSource.Query), moveCard)
router.get(CardApiSource.get.getAllCard.path, authenticateToken, getAllCard)

//Notes
router.post(NotesApiSource.post.createNotes.path, authenticateToken, authenticateToken, validateBody(createNotesValidation), createNotes)
router.put(NotesApiSource.put.updateNotes.path, authenticateToken, validateBody(updateNotesValidation), updateNotes)
router.delete(NotesApiSource.delete.deleteNotes.path, authenticateToken, validateBody(deleteNotesValidation, RouteSource.Query), deleteNotes)
router.get(NotesApiSource.get.getNotes.path, authenticateToken, validateBody(getNotesValidation, RouteSource.Query), getNotes)

//Contacts
router.get(ContactsApiSource.get.getUsers.path, authenticateToken, validateBody(getUsersValidation, RouteSource.Query), getUsers)
router.post(ContactsApiSource.post.addContacts.path, authenticateToken, validateBody(addContactsValidation), addContact)
router.get(ContactsApiSource.get.getContacts.path, authenticateToken, validateBody(getContactsValidation, RouteSource.Query), getContacts)
router.delete(ContactsApiSource.delete.deleteContacts.path, authenticateToken, validateBody(deleteContactsValidation, RouteSource.Query), deleteContacts)

router.post('/upload', upload.single('image'), uploadImage)

//ImagesFolder
router.post(ImagesFolderApiSource.post.createFolder.path, authenticateToken, validateBody(createImagesFolderValidation), createImagesFolder)
router.put(ImagesFolderApiSource.put.updateFolder.path, authenticateToken, validateBody(updateImagesFolderValidation), updateImagesFolder)
router.get(ImagesFolderApiSource.get.getFolder.path, authenticateToken, validateBody(getImagesFolderValidation, RouteSource.Query), getImagesFolder)
router.delete(ImagesFolderApiSource.delete.deleteFolder.path, authenticateToken, validateBody(deleteImagesFolderValidation, RouteSource.Query), deleteImagesFolder)

//PdfFolder
router.post(PdfFolderApiSource.post.createFolder.path, authenticateToken, validateBody(createPdfFolderValidation), createPdfFolder)
router.put(PdfFolderApiSource.put.updateFolder.path, authenticateToken, validateBody(updatePdfFolderValidation), updatePdfFolder)
router.get(PdfFolderApiSource.get.getFolder.path, authenticateToken, validateBody(getPdfFolderValidation, RouteSource.Query), getPdfFolder)
router.delete(PdfFolderApiSource.delete.deleteFolder.path, authenticateToken, validateBody(deletePdfFolderValidation, RouteSource.Query), deletePdfFolder)

//Upload Images
router.post(ImagesApiSource.post.uploadImage.path, authenticateToken, upload.single('image'), validateBody(uploadImageValidation), uploadImages)
router.put(ImagesApiSource.put.updateImage.path, authenticateToken, upload.single('image'), validateBody(updateImageValidation), updateImages)
router.get(ImagesApiSource.get.getImages.path, authenticateToken, validateBody(getImageValidation, RouteSource.Query), getImages)
router.get(ImagesApiSource.get.getImagesByFolderId.path, authenticateToken, validateBody(getImageByFolderIdValidation, RouteSource.Query), getImagesByFolderId)
router.delete(ImagesApiSource.delete.deleteImage.path, authenticateToken, validateBody(deleteImageValidation, RouteSource.Query), deleteImages)
router.put(ImagesApiSource.put.assignImageFolder.path, authenticateToken, validateBody(assignImageFolderValidation, RouteSource.Query), assignImageFolder)

//Upload Pdf
router.post(PdfApiSource.post.uploadPdf.path, authenticateToken, upload.single('pdf'), validateBody(uploadPdfValidation), uploadPdf)
router.put(PdfApiSource.put.updatePdf.path, authenticateToken, upload.single('pdf'), validateBody(updatePdfValidation), updatePdf)
router.get(PdfApiSource.get.getPdf.path, authenticateToken, validateBody(getPdfValidation, RouteSource.Query), getPdf)
router.get(PdfApiSource.get.getPdfByFolderId.path, authenticateToken, validateBody(getPdfByFolderIdValidation, RouteSource.Query), getPdfByFolderId)
router.delete(PdfApiSource.delete.deletePdf.path, authenticateToken, validateBody(deletePdfValidation, RouteSource.Query), deletePdf)
router.put(PdfApiSource.put.assignPdfFolder.path, authenticateToken, validateBody(assignPdfFolderValidation, RouteSource.Query), assignPdfFolder)

//Profile
router.put(ProfileApiSource.put.updateProfilePicture.path, authenticateToken, upload.single('picture'), validateBody(updateProfilePictureValidation), updateProfilePicture)
router.put(ProfileApiSource.put.updatePassword.path, validateBody(updatePasswordValidation), updatePassword)
router.put(ProfileApiSource.put.updatePasswordVerifyOtp.path, validateBody(updatePasswordVerifyOtpValidation), updatePasswordVerifyOtp)
router.post(ProfileApiSource.post.createSupport.path, authenticateToken, upload.single('image'), validateBody(createSupportValidation), createSupport)
router.get(ProfileApiSource.get.getSubscription.path, authenticateToken, getSubscription)
router.get(ProfileApiSource.get.getProfile.path, authenticateToken, validateBody(getProfileValidation, RouteSource.Query), getProfile)

//Mediator
router.get(MediatorApiSource.get.getMediatorSet.path, authenticateToken, validateBody(getMediatorSetValidation, RouteSource.Query), getMediatorSet)
router.put(MediatorApiSource.put.updateMediatorSet.path, authenticateToken, validateBody(updateMediatorSetValidation, RouteSource.Query), updateMediatorSet)
router.put(MediatorApiSource.put.updateMediatorCard.path, authenticateToken, validateBody(updateMediatorCardValidation, RouteSource.Query), updateMediatorCard)

//Chat GPT AI
router.post(AiApiSource.post.askQuestion.path, authenticateToken, validateBody(askQuestionValidation), getAskQuestionAnswer)

//User Credit
router.put(UserApiSource.put.updateCredit.path, authenticateToken, validateBody(updateUserCreditValidation), updateUserCredit)

//Subscription
router.post(SubscriptionApiSource?.post?.createSubscription?.path, authenticateToken, validateBody(createSubscriptionValidation), createSubscription)
router.put(SubscriptionApiSource?.put?.updateSubscription?.path, authenticateToken, validateBody(updateSubscriptionValidation), updateSubscription)
router.put(SubscriptionApiSource?.put?.cancelSubscription?.path, authenticateToken, validateBody(cancelSubscriptionValidation), cancelSubscription)

//Add Default Sets And Cards
router.post(UserApiSource.post.addDefaultSetsAndCards.path, validateBody(addDefaultSetsAndCardsValidation, RouteSource?.Query), addDefaultSetsAndCards)
export default router;