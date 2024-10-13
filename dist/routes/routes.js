"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
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
router.post(set_1.SetApiSource.post.createSet.path, (0, bodyValidate_middleware_1.validateBody)(set_validate_1.createSetValidation), set_controller_1.insertSet);
router.put(set_1.SetApiSource.put.updateSet.path, (0, bodyValidate_middleware_1.validateBody)(set_validate_1.updateSetValidation), set_controller_1.updateSet);
router.delete(set_1.SetApiSource.delete.deleteSet.path, (0, bodyValidate_middleware_1.validateBody)(set_validate_1.deleteSetValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), set_controller_1.deleteSet);
router.get(set_1.SetApiSource.get.getSet.path, (0, bodyValidate_middleware_1.validateBody)(set_validate_1.getSetValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), set_controller_1.getSet);
router.get(set_1.SetApiSource.get.getSetByFolderId.path, (0, bodyValidate_middleware_1.validateBody)(set_validate_1.getSetByFolderValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), set_controller_1.getSetByfolderId);
//Folder
router.post(folder_1.FolderApiSource.post.createFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.createfolderValidation), folder_controller_1.createFolder);
router.put(folder_1.FolderApiSource.put.updateFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.updateFolderValidation), folder_controller_1.updateFolder);
router.delete(folder_1.FolderApiSource.delete.deleteFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.deleteFolderValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), folder_controller_1.deleteFolder);
router.get(folder_1.FolderApiSource.get.getFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.getFolderValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), folder_controller_1.getFolder);
router.put(folder_1.FolderApiSource.put.assignFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.assignFolderValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), folder_controller_1.assignFolder);
//Card
router.post(card_1.CardApiSource.post.createCard.path, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.createCardValidation), card_controller_1.createCard);
router.put(card_1.CardApiSource.put.updateCard.path, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.updateCardValidation), card_controller_1.updateCard);
router.get(card_1.CardApiSource.get.getCard.path, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.getCardValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), card_controller_1.getCard);
router.delete(card_1.CardApiSource.delete.deleteCard.path, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.deleteCardValidation, RouteSource === null || RouteSource === void 0 ? void 0 : RouteSource.Query), card_controller_1.deleteCard);
router.put(card_1.CardApiSource.put.blurAllCard.path, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.blurAllCardValidation, RouteSource.Query), card_controller_1.blurAllCard);
router.put(card_1.CardApiSource.put.moveCard.path, (0, bodyValidate_middleware_1.validateBody)(card_validate_1.moveCardValidation, RouteSource.Query), card_controller_1.moveCard);
//Notes
router.post(notes_1.NotesApiSource.post.createNotes.path, (0, bodyValidate_middleware_1.validateBody)(notes_validate_1.createNotesValidation), notes_controller_1.createNotes);
router.put(notes_1.NotesApiSource.put.updateNotes.path, (0, bodyValidate_middleware_1.validateBody)(notes_validate_1.updateNotesValidation), notes_controller_1.updateNotes);
router.delete(notes_1.NotesApiSource.delete.deleteNotes.path, (0, bodyValidate_middleware_1.validateBody)(notes_validate_1.deleteNotesValidation, RouteSource.Query), notes_controller_1.deleteNotes);
router.get(notes_1.NotesApiSource.get.getNotes.path, (0, bodyValidate_middleware_1.validateBody)(notes_validate_1.getNotesValidation, RouteSource.Query), notes_controller_1.getNotes);
//Contacts
router.get(contacts_1.ContactsApiSource.get.getUsers.path, (0, bodyValidate_middleware_1.validateBody)(contacts_validate_1.getUsersValidation, RouteSource.Query), contacts_controller_1.getUsers);
router.post(contacts_1.ContactsApiSource.post.addContacts.path, (0, bodyValidate_middleware_1.validateBody)(contacts_validate_1.addContactsValidation), contacts_controller_1.addContact);
router.get(contacts_1.ContactsApiSource.get.getContacts.path, (0, bodyValidate_middleware_1.validateBody)(contacts_validate_1.getContactsValidation, RouteSource.Query), contacts_controller_1.getContacts);
router.delete(contacts_1.ContactsApiSource.delete.deleteContacts.path, (0, bodyValidate_middleware_1.validateBody)(contacts_validate_1.deleteContactsValidation, RouteSource.Query), contacts_controller_1.deleteContacts);
router.post('/upload', uploadConfig_1.default.single('image'), demo_controller_1.uploadImage);
//ImagesFolder
router.post(folder_1.ImagesFolderApiSource.post.createFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.createImagesFolderValidation), folder_controller_1.createImagesFolder);
router.put(folder_1.ImagesFolderApiSource.put.updateFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.updateImagesFolderValidation), folder_controller_1.updateImagesFolder);
router.get(folder_1.ImagesFolderApiSource.get.getFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.getImagesFolderValidation, RouteSource.Query), folder_controller_1.getImagesFolder);
router.delete(folder_1.ImagesFolderApiSource.delete.deleteFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.deleteImagesFolderValidation, RouteSource.Query), folder_controller_1.deleteImagesFolder);
//PdfFolder
router.post(folder_1.PdfFolderApiSource.post.createFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.createPdfFolderValidation), folder_controller_1.createPdfFolder);
router.put(folder_1.PdfFolderApiSource.put.updateFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.updatePdfFolderValidation), folder_controller_1.updatePdfFolder);
router.get(folder_1.PdfFolderApiSource.get.getFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.getPdfFolderValidation, RouteSource.Query), folder_controller_1.getPdfFolder);
router.delete(folder_1.PdfFolderApiSource.delete.deleteFolder.path, (0, bodyValidate_middleware_1.validateBody)(folder_validate_1.deletePdfFolderValidation, RouteSource.Query), folder_controller_1.deletePdfFolder);
//Upload Images
router.post(images_1.ImagesApiSource.post.uploadImage.path, uploadConfig_1.default.single('image'), (0, bodyValidate_middleware_1.validateBody)(images_validate_1.uploadImageValidation), images_controller_1.uploadImages);
router.put(images_1.ImagesApiSource.put.updateImage.path, uploadConfig_1.default.single('image'), (0, bodyValidate_middleware_1.validateBody)(images_validate_1.updateImageValidation), images_controller_1.updateImages);
router.get(images_1.ImagesApiSource.get.getImages.path, (0, bodyValidate_middleware_1.validateBody)(images_validate_1.getImageValidation, RouteSource.Query), images_controller_1.getImages);
router.get(images_1.ImagesApiSource.get.getImagesByFolderId.path, (0, bodyValidate_middleware_1.validateBody)(images_validate_1.getImageByFolderIdValidation, RouteSource.Query), images_controller_1.getImagesByFolderId);
router.delete(images_1.ImagesApiSource.delete.deleteImage.path, (0, bodyValidate_middleware_1.validateBody)(images_validate_1.deleteImageValidation, RouteSource.Query), images_controller_1.deleteImages);
router.put(images_1.ImagesApiSource.put.assignImageFolder.path, (0, bodyValidate_middleware_1.validateBody)(images_validate_1.assignImageFolderValidation, RouteSource.Query), images_controller_1.assignImageFolder);
//Upload Pdf
router.post(pdf_1.PdfApiSource.post.uploadPdf.path, uploadConfig_1.default.single('pdf'), (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.uploadPdfValidation), pdf_controller_1.uploadPdf);
router.put(pdf_1.PdfApiSource.put.updatePdf.path, uploadConfig_1.default.single('pdf'), (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.updatePdfValidation), pdf_controller_1.updatePdf);
router.get(pdf_1.PdfApiSource.get.getPdf.path, (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.getPdfValidation, RouteSource.Query), pdf_controller_1.getPdf);
router.get(pdf_1.PdfApiSource.get.getPdfByFolderId.path, (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.getPdfByFolderIdValidation, RouteSource.Query), pdf_controller_1.getPdfByFolderId);
router.delete(pdf_1.PdfApiSource.delete.deletePdf.path, (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.deletePdfValidation, RouteSource.Query), pdf_controller_1.deletePdf);
router.put(pdf_1.PdfApiSource.put.assignPdfFolder.path, (0, bodyValidate_middleware_1.validateBody)(pdf_validation_1.assignPdfFolderValidation, RouteSource.Query), pdf_controller_1.assignPdfFolder);
//Profile
router.put(profile_1.ProfileApiSource.put.updateProfilePicture.path, uploadConfig_1.default.single('picture'), (0, bodyValidate_middleware_1.validateBody)(profile_validate_1.updateProfilePictureValidation), profile_controller_1.updateProfilePicture);
router.put(profile_1.ProfileApiSource.put.updatePassword.path, (0, bodyValidate_middleware_1.validateBody)(profile_validate_1.updatePasswordValidation), profile_controller_1.updatePassword);
router.put(profile_1.ProfileApiSource.put.updatePasswordVerifyOtp.path, (0, bodyValidate_middleware_1.validateBody)(profile_validate_1.updatePasswordVerifyOtpValidation), profile_controller_1.updatePasswordVerifyOtp);
//Subscription
router.get(profile_1.ProfileApiSource.get.getSubscription.path, profile_controller_1.getSubscription);
exports.default = router;
