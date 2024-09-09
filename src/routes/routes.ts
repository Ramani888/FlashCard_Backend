import express from "express";
import { getDemoRequest } from "../controllers/demo.controller";
import { getCardType } from "../controllers/card.controller";
import { deleteSet, getSetBycardTypeId, insertSet, updateSet } from "../controllers/set.controller";
import { validateBody } from "../middlewares/bodyValidate.middleware";
import { createSetValidation, deleteSetValidation, getSetValidation, updateSetValidation } from "../utils/validates/set.validate";
import { createFolder, deleteFolder, getFolderBycardTypeId, updateFolder } from "../controllers/folder.controller";
import { createfolderValidation, deleteFolderValidation, getFolderValidation, updateFolderValidation } from "../utils/validates/folder.validate";
import { SetApiSource } from "../utils/constants/set";
import { FolderApiSource } from "../utils/constants/folder";
import { CardApiSource } from "../utils/constants/card";
import { createCardValidation } from "../utils/validates/card.validate";
import { SignUpApiSource } from "../utils/constants/signUp";
import { signUpValidation, verifyOtpValidation } from "../utils/validates/signUp.validate";
import { signUp, verifyOtp } from "../controllers/signUp.controller";
import { verify } from "crypto";
import { LoginApiSource } from "../utils/constants/login";
import { loginValidation } from "../utils/validates/login.validate";
import { login } from "../controllers/login.controller";

enum RouteSource {
    Body,
    Query,
    Params
}

const router = express.Router();

//Demo Request
router.get('/demo', getDemoRequest)

//Card Type
router.get('/card/type', getCardType)

//Sign Up
router.post(SignUpApiSource?.post?.signUp?.path, validateBody(signUpValidation), signUp)
router.post(SignUpApiSource.post.verifyOtp.path, validateBody(verifyOtpValidation), verifyOtp)

//Login
router.post(LoginApiSource.post.login.path, validateBody(loginValidation), login)

//Set
router.post(SetApiSource.post.createSet.path, validateBody(createSetValidation), insertSet)
router.put(SetApiSource.put.updateSet.path, validateBody(updateSetValidation), updateSet)
router.delete(SetApiSource.delete.deleteSet.path, validateBody(deleteSetValidation, RouteSource?.Query), deleteSet)
router.get(SetApiSource.get.getSet.path, validateBody(getSetValidation, RouteSource?.Query), getSetBycardTypeId)

//Folder
router.post(FolderApiSource.post.createFolder.path, validateBody(createfolderValidation), createFolder)
router.put(FolderApiSource.put.updateFolder.path, validateBody(updateFolderValidation), updateFolder)
router.delete(FolderApiSource.delete.deleteFolder.path, validateBody(deleteFolderValidation, RouteSource?.Query), deleteFolder)
router.get(FolderApiSource.get.getFolder.path, validateBody(getFolderValidation, RouteSource?.Query), getFolderBycardTypeId)

//Card
// router.post(CardApiSource.post.createCard.path, validateBody(createCardValidation), createCard)
export default router;