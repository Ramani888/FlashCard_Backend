"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const demo_controller_1 = require("../controllers/demo.controller");
const card_controller_1 = require("../controllers/card.controller");
const set_controller_1 = require("../controllers/set.controller");
const bodyValidate_middleware_1 = require("../middlewares/bodyValidate.middleware");
const set_validate_1 = require("../utils/validates/set.validate");
const folder_controller_1 = require("../controllers/folder.controller");
const folder_validate_1 = require("../utils/validates/folder.validate");
const set_1 = require("../utils/constants/set");
const folder_1 = require("../utils/constants/folder");
const card_1 = require("../utils/constants/card");
const card_validate_1 = require("../utils/validates/card.validate");
const signUp_1 = require("../utils/constants/signUp");
const signUp_validate_1 = require("../utils/validates/signUp.validate");
const signUp_controller_1 = require("../controllers/signUp.controller");
const login_1 = require("../utils/constants/login");
const login_validate_1 = require("../utils/validates/login.validate");
const login_controller_1 = require("../controllers/login.controller");
const notes_1 = require("../utils/constants/notes");
const notes_validate_1 = require("../utils/validates/notes.validate");
const notes_controller_1 = require("../controllers/notes.controller");
const contacts_1 = require("../utils/constants/contacts");
const contacts_validate_1 = require("../utils/validates/contacts.validate");
const contacts_controller_1 = require("../controllers/contacts.controller");
const uploadConfig_1 = __importDefault(require("./uploadConfig"));
const images_1 = require("../utils/constants/images");
const images_validate_1 = require("../utils/validates/images.validate");
const images_controller_1 = require("../controllers/images.controller");
const pdf_1 = require("../utils/constants/pdf");
const pdf_validation_1 = require("../utils/validates/pdf.validation");
const pdf_controller_1 = require("../controllers/pdf.controller");
const profile_1 = require("../utils/constants/profile");
const profile_validate_1 = require("../utils/validates/profile.validate");
const profile_controller_1 = require("../controllers/profile.controller");
const mediator_1 = require("../utils/constants/mediator");
const mediator_validate_1 = require("../utils/validates/mediator.validate");
const mediator_controller_1 = require("../controllers/mediator.controller");
const AI_1 = require("../utils/constants/AI");
const Ai_validate_1 = require("../utils/validates/Ai.validate");
const Ai_controller_1 = require("../controllers/Ai.controller");
const user_1 = require("../utils/constants/user");
const user_validate_1 = require("../utils/validates/user.validate");
const user_controller_1 = require("../controllers/user.controller");
const general_1 = require("../utils/helpers/general");
const subscription_1 = require("../utils/constants/subscription");
const subscription_validate_1 = require("../utils/validates/subscription.validate");
const subscription_controller_1 = require("../controllers/subscription.controller");
var RouteSource;
(function (RouteSource) {
    RouteSource[RouteSource["Body"] = 0] = "Body";
    RouteSource[RouteSource["Query"] = 1] = "Query";
    RouteSource[RouteSource["Params"] = 2] = "Params";
})(RouteSource || (RouteSource = {}));
const router = express_1.default.Router();
//Demo Request
router.get('/demo', demo_controller_1.getDemoRequest);
//Card Type
router.get(card_1.CardApiSource.get.getCardType.path, card_controller_1.getCardType);
//Sign Up
router.post((_b = (_a = signUp_1.SignUpApiSource === null || signUp_1.SignUpApiSource === void 0 ? void 0 : signUp_1.SignUpApiSource.post) === null || _a === void 0 ? void 0 : _a.signUp) === null || _b === void 0 ? void 0 : _b.path, (0, bodyValidate_middleware_1.validateBody)(signUp_validate_1.signUpValidation), signUp_controller_1.signUp);
router.post(signUp_1.SignUpApiSource.post.verifyOtp.path, (0, bodyValidate_middleware_1.validateBody)(signUp_validate_1.verifyOtpValidation), signUp_controller_1.verifyOtp);
router.put(signUp_1.SignUpApiSource.put.resendOtp.path, (0, bodyValidate_middleware_1.validateBody)(signUp_validate_1.resendOtpValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), signUp_controller_1.resendOtp);
//Login
router.post(login_1.LoginApiSource.post.login.path, (0, bodyValidate_middleware_1.validateBody)(login_validate_1.loginValidation), login_controller_1.login);
//Set
router.post(set_1.SetApiSource.post.createSet.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(set_validate_1.createSetValidation), set_controller_1.insertSet);
router.put(set_1.SetApiSource.put.updateSet.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(set_validate_1.updateSetValidation), set_controller_1.updateSet);
router.delete(set_1.SetApiSource.delete.deleteSet.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(set_validate_1.deleteSetValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), set_controller_1.deleteSet);
router.get(set_1.SetApiSource.get.getSet.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(set_validate_1.getSetValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), set_controller_1.getSet);
router.get(set_1.SetApiSource.get.getSetByFolderId.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(set_validate_1.getSetByFolderValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), set_controller_1.getSetByfolderId);
//Folder
router.post(folder_1.FolderApiSource.post.createFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.createfolderValidation), folder_controller_1.createFolder);
router.put(folder_1.FolderApiSource.put.updateFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.updateFolderValidation), folder_controller_1.updateFolder);
router.delete(folder_1.FolderApiSource.delete.deleteFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.deleteFolderValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), folder_controller_1.deleteFolder);
router.get(folder_1.FolderApiSource.get.getFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.getFolderValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), folder_controller_1.getFolder);
router.put(folder_1.FolderApiSource.put.assignFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.assignFolderValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), folder_controller_1.assignFolder);
//Card
router.post(card_1.CardApiSource.post.createCard.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.createCardValidation), card_controller_1.createCard);
router.put(card_1.CardApiSource.put.updateCard.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.updateCardValidation), card_controller_1.updateCard);
router.get(card_1.CardApiSource.get.getCard.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.getCardValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), card_controller_1.getCard);
router.delete(card_1.CardApiSource.delete.deleteCard.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.deleteCardValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), card_controller_1.deleteCard);
router.put(card_1.CardApiSource.put.blurAllCard.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.blurAllCardValidation, RouteSource.Query), card_controller_1.blurAllCard);
router.put(card_1.CardApiSource.put.moveCard.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.moveCardValidation, RouteSource.Query), card_controller_1.moveCard);
router.get(card_1.CardApiSource.get.getAllCard.path, general_1.authenticateToken, card_controller_1.getAllCard);
//Notes
router.post(notes_1.NotesApiSource.post.createNotes.path, general_1.authenticateToken, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(notes_validate_1.createNotesValidation), notes_controller_1.createNotes);
router.put(notes_1.NotesApiSource.put.updateNotes.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(notes_validate_1.updateNotesValidation), notes_controller_1.updateNotes);
router.delete(notes_1.NotesApiSource.delete.deleteNotes.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(notes_validate_1.deleteNotesValidation, RouteSource.Query), notes_controller_1.deleteNotes);
router.get(notes_1.NotesApiSource.get.getNotes.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(notes_validate_1.getNotesValidation, RouteSource.Query), notes_controller_1.getNotes);
//Contacts
router.get(contacts_1.ContactsApiSource.get.getUsers.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(contacts_validate_1.getUsersValidation, RouteSource.Query), contacts_controller_1.getUsers);
router.post(contacts_1.ContactsApiSource.post.addContacts.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(contacts_validate_1.addContactsValidation), contacts_controller_1.addContact);
router.get(contacts_1.ContactsApiSource.get.getContacts.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(contacts_validate_1.getContactsValidation, RouteSource.Query), contacts_controller_1.getContacts);
router.delete(contacts_1.ContactsApiSource.delete.deleteContacts.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(contacts_validate_1.deleteContactsValidation, RouteSource.Query), contacts_controller_1.deleteContacts);
router.post('/upload', uploadConfig_1.default.single('image'), demo_controller_1.uploadImage);
//ImagesFolder
router.post(folder_1.ImagesFolderApiSource.post.createFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.createImagesFolderValidation), folder_controller_1.createImagesFolder);
router.put(folder_1.ImagesFolderApiSource.put.updateFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.updateImagesFolderValidation), folder_controller_1.updateImagesFolder);
router.get(folder_1.ImagesFolderApiSource.get.getFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.getImagesFolderValidation, RouteSource.Query), folder_controller_1.getImagesFolder);
router.delete(folder_1.ImagesFolderApiSource.delete.deleteFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.deleteImagesFolderValidation, RouteSource.Query), folder_controller_1.deleteImagesFolder);
//PdfFolder
router.post(folder_1.PdfFolderApiSource.post.createFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.createPdfFolderValidation), folder_controller_1.createPdfFolder);
router.put(folder_1.PdfFolderApiSource.put.updateFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.updatePdfFolderValidation), folder_controller_1.updatePdfFolder);
router.get(folder_1.PdfFolderApiSource.get.getFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.getPdfFolderValidation, RouteSource.Query), folder_controller_1.getPdfFolder);
router.delete(folder_1.PdfFolderApiSource.delete.deleteFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.deletePdfFolderValidation, RouteSource.Query), folder_controller_1.deletePdfFolder);
//Upload Images
router.post(images_1.ImagesApiSource.post.uploadImage.path, general_1.authenticateToken, uploadConfig_1.default.single('image'), (0, bodyValidate_middleware_1.validateBody)(images_validate_1.uploadImageValidation), images_controller_1.uploadImages);
router.put(images_1.ImagesApiSource.put.updateImage.path, general_1.authenticateToken, uploadConfig_1.default.single('image'), (0, bodyValidate_middleware_1.validateBody)(images_validate_1.updateImageValidation), images_controller_1.updateImages);
router.get(images_1.ImagesApiSource.get.getImages.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(images_validate_1.getImageValidation, RouteSource.Query), images_controller_1.getImages);
router.get(images_1.ImagesApiSource.get.getImagesByFolderId.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(images_validate_1.getImageByFolderIdValidation, RouteSource.Query), images_controller_1.getImagesByFolderId);
router.delete(images_1.ImagesApiSource.delete.deleteImage.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(images_validate_1.deleteImageValidation, RouteSource.Query), images_controller_1.deleteImages);
router.put(images_1.ImagesApiSource.put.assignImageFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(images_validate_1.assignImageFolderValidation, RouteSource.Query), images_controller_1.assignImageFolder);
//Upload Pdf
router.post(pdf_1.PdfApiSource.post.uploadPdf.path, general_1.authenticateToken, uploadConfig_1.default.single('pdf'), (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.uploadPdfValidation), pdf_controller_1.uploadPdf);
router.put(pdf_1.PdfApiSource.put.updatePdf.path, general_1.authenticateToken, uploadConfig_1.default.single('pdf'), (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.updatePdfValidation), pdf_controller_1.updatePdf);
router.get(pdf_1.PdfApiSource.get.getPdf.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.getPdfValidation, RouteSource.Query), pdf_controller_1.getPdf);
router.get(pdf_1.PdfApiSource.get.getPdfByFolderId.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.getPdfByFolderIdValidation, RouteSource.Query), pdf_controller_1.getPdfByFolderId);
router.delete(pdf_1.PdfApiSource.delete.deletePdf.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.deletePdfValidation, RouteSource.Query), pdf_controller_1.deletePdf);
router.put(pdf_1.PdfApiSource.put.assignPdfFolder.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.assignPdfFolderValidation, RouteSource.Query), pdf_controller_1.assignPdfFolder);
//Profile
router.put(profile_1.ProfileApiSource.put.updateProfilePicture.path, general_1.authenticateToken, uploadConfig_1.default.single('picture'), (0, bodyValidate_middleware_1.validateBody)(profile_validate_1.updateProfilePictureValidation), profile_controller_1.updateProfilePicture);
router.put(profile_1.ProfileApiSource.put.updatePassword.path, (0, bodyValidate_middleware_1.validateBody)(profile_validate_1.updatePasswordValidation), profile_controller_1.updatePassword);
router.put(profile_1.ProfileApiSource.put.updatePasswordVerifyOtp.path, (0, bodyValidate_middleware_1.validateBody)(profile_validate_1.updatePasswordVerifyOtpValidation), profile_controller_1.updatePasswordVerifyOtp);
router.post(profile_1.ProfileApiSource.post.createSupport.path, general_1.authenticateToken, uploadConfig_1.default.single('image'), (0, bodyValidate_middleware_1.validateBody)(profile_validate_1.createSupportValidation), profile_controller_1.createSupport);
router.get(profile_1.ProfileApiSource.get.getSubscription.path, general_1.authenticateToken, profile_controller_1.getSubscription);
router.get(profile_1.ProfileApiSource.get.getProfile.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(profile_validate_1.getProfileValidation, RouteSource.Query), profile_controller_1.getProfile);
//Mediator
router.get(mediator_1.MediatorApiSource.get.getMediatorSet.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(mediator_validate_1.getMediatorSetValidation, RouteSource.Query), mediator_controller_1.getMediatorSet);
router.put(mediator_1.MediatorApiSource.put.updateMediatorSet.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(mediator_validate_1.updateMediatorSetValidation, RouteSource.Query), mediator_controller_1.updateMediatorSet);
router.put(mediator_1.MediatorApiSource.put.updateMediatorCard.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(mediator_validate_1.updateMediatorCardValidation, RouteSource.Query), mediator_controller_1.updateMediatorCard);
//Chat GPT AI
router.post(AI_1.AiApiSource.post.askQuestion.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(Ai_validate_1.askQuestionValidation), Ai_controller_1.getAskQuestionAnswer);
//User Credit
router.put(user_1.UserApiSource.put.updateCredit.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(user_validate_1.updateUserCreditValidation), user_controller_1.updateUserCredit);
//Subscription
router.post((_d = (_c = subscription_1.SubscriptionApiSource === null || subscription_1.SubscriptionApiSource === void 0 ? void 0 : subscription_1.SubscriptionApiSource.post) === null || _c === void 0 ? void 0 : _c.createSubscription) === null || _d === void 0 ? void 0 : _d.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(subscription_validate_1.createSubscriptionValidation), subscription_controller_1.createSubscription);
router.put((_f = (_e = subscription_1.SubscriptionApiSource === null || subscription_1.SubscriptionApiSource === void 0 ? void 0 : subscription_1.SubscriptionApiSource.put) === null || _e === void 0 ? void 0 : _e.updateSubscription) === null || _f === void 0 ? void 0 : _f.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(subscription_validate_1.updateSubscriptionValidation), subscription_controller_1.updateSubscription);
router.put((_h = (_g = subscription_1.SubscriptionApiSource === null || subscription_1.SubscriptionApiSource === void 0 ? void 0 : subscription_1.SubscriptionApiSource.put) === null || _g === void 0 ? void 0 : _g.cancelSubscription) === null || _h === void 0 ? void 0 : _h.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(subscription_validate_1.cancelSubscriptionValidation), subscription_controller_1.cancelSubscription);
//Add Default Sets And Cards
router.post(user_1.UserApiSource.post.addDefaultSetsAndCards.path, general_1.authenticateToken, (0, bodyValidate_middleware_1.validateBody)(user_validate_1.addDefaultSetsAndCardsValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), user_controller_1.addDefaultSetsAndCards);
//Delete Account
router.delete(user_1.UserApiSource.delete.deleteAccount.path, general_1.authenticateToken, user_controller_1.deleteAccount);
//Add Auto Translate Sets And Cards
// router.post(UserApiSource.post.addAutoTranslateSetsAndCards.path, authenticateToken, validateBody(addAutoTranslateSetsAndCardsValidation, RouteSource?.Query), addAutoTranslateSetsAndCards)
exports.default = router;
