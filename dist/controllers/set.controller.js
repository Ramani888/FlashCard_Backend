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
exports.getSetByfolderId = exports.getSet = exports.deleteSet = exports.updateSet = exports.insertSet = void 0;
const http_status_codes_1 = require("http-status-codes");
const set_services_1 = require("../services/set.services");
const set_1 = require("../utils/constants/set");
const insertSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, set_services_1.insertSetData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: set_1.SetApiSource.post.createSet.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.insertSet = insertSet;
const updateSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, set_services_1.updateSetData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: set_1.SetApiSource.put.updateSet.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateSet = updateSet;
const deleteSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    try {
        yield (0, set_services_1.deleteSetData)(_id);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: set_1.SetApiSource.delete.deleteSet.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.deleteSet = deleteSet;
const getSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, search } = req.query;
    try {
        const data = yield (0, set_services_1.getSetData)(userId, search);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getSet = getSet;
const getSetByfolderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { folderId, userId, search } = req.query;
    try {
        const data = yield (0, set_services_1.getSetDataByfolderId)(folderId, userId, search);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getSetByfolderId = getSetByfolderId;
