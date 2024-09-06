import express from "express";
import { getDemoRequest } from "../controllers/demo.controller";
import { getCardType } from "../controllers/card.controller";
import { deleteSet, getSetBycardTypeId, insertSet, updateSet } from "../controllers/set.controller";
import { validateBody } from "../middlewares/bodyValidate.middleware";
import { createSetValidation, deleteSetValidation, getSetValidation, updateSetValidation } from "../utils/validates/set.validate";
import { createFolder, deleteFolder, getFolderBycardTypeId, updateFolder } from "../controllers/folder.controller";
import { createfolderValidation, deleteFolderValidation, getFolderValidation, updateFolderValidation } from "../utils/validates/folder.validate";

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

//Set
router.post('/set', validateBody(createSetValidation), insertSet)
router.put('/set', validateBody(updateSetValidation), updateSet)
router.delete('/set', validateBody(deleteSetValidation, RouteSource?.Query), deleteSet)
router.get('/set', validateBody(getSetValidation, RouteSource?.Query), getSetBycardTypeId)

//Folder
router.post('/folder', validateBody(createfolderValidation), createFolder)
router.put('/folder', validateBody(updateFolderValidation), updateFolder)
router.delete('/folder', validateBody(deleteFolderValidation, RouteSource?.Query), deleteFolder)
router.get('/folder', validateBody(getFolderValidation, RouteSource?.Query), getFolderBycardTypeId)
export default router;