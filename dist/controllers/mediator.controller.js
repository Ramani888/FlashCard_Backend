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
exports.updateMediatorCard = exports.updateMediatorSet = exports.getMediatorSet = void 0;
const http_status_codes_1 = require("http-status-codes");
const mediator_service_1 = require("../services/mediator.service");
const set_services_1 = require("../services/set.services");
const card_service_1 = require("../services/card.service");
const mediator_1 = require("../utils/constants/mediator");
const getMediatorSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const data = yield (0, mediator_service_1.getMediatorSetData)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getMediatorSet = getMediatorSet;
const updateMediatorSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { userId, setId, folderId } = req.query;
    try {
        //Get set data
        const setData = yield (0, set_services_1.getSetBySetId)(setId);
        //Copy to create new set
        const newSetData = {
            name: (_a = setData === null || setData === void 0 ? void 0 : setData.name) !== null && _a !== void 0 ? _a : '',
            isPrivate: (_b = setData === null || setData === void 0 ? void 0 : setData.isPrivate) !== null && _b !== void 0 ? _b : false,
            color: (_c = setData === null || setData === void 0 ? void 0 : setData.color) !== null && _c !== void 0 ? _c : '',
            userId: userId,
            folderId: folderId,
            isHighlight: (_d = setData === null || setData === void 0 ? void 0 : setData.isHighlight) !== null && _d !== void 0 ? _d : false
        };
        const newSetId = yield (0, set_services_1.insertSetData)(newSetData);
        //Get card data
        const cardData = yield (0, card_service_1.getCardBySetId)(setId);
        //Copy to create card
        cardData === null || cardData === void 0 ? void 0 : cardData.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const newCardData = {
                top: item === null || item === void 0 ? void 0 : item.top,
                bottom: item === null || item === void 0 ? void 0 : item.bottom,
                note: (_a = item === null || item === void 0 ? void 0 : item.note) !== null && _a !== void 0 ? _a : '',
                folderId: folderId,
                setId: newSetId === null || newSetId === void 0 ? void 0 : newSetId.toString(),
                userId: userId,
                isBlur: item === null || item === void 0 ? void 0 : item.isBlur,
                position: item === null || item === void 0 ? void 0 : item.position
            };
            yield (0, card_service_1.createCardData)(newCardData);
        }));
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: mediator_1.MediatorApiSource.put.updateMediatorSet.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateMediatorSet = updateMediatorSet;
const updateMediatorCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { userId, setId, cardId } = req.query;
    try {
        //Get card data
        const cardData = yield (0, card_service_1.getCardByCardId)(cardId);
        //Get set data
        const setData = yield (0, set_services_1.getSetBySetId)(setId);
        //Get card data with largest position
        const largestCardData = yield (0, card_service_1.getCardWithLargestPosition)(userId, setId);
        const position = (largestCardData === null || largestCardData === void 0 ? void 0 : largestCardData.position) ? (largestCardData === null || largestCardData === void 0 ? void 0 : largestCardData.position) + 1 : 1;
        //Create copy to card data
        const newCardData = {
            top: (_a = cardData === null || cardData === void 0 ? void 0 : cardData.top) !== null && _a !== void 0 ? _a : '',
            bottom: (_b = cardData === null || cardData === void 0 ? void 0 : cardData.bottom) !== null && _b !== void 0 ? _b : '',
            note: (_c = cardData === null || cardData === void 0 ? void 0 : cardData.note) !== null && _c !== void 0 ? _c : '',
            folderId: (_d = setData === null || setData === void 0 ? void 0 : setData.folderId) !== null && _d !== void 0 ? _d : '',
            setId: setId,
            userId: userId,
            isBlur: cardData === null || cardData === void 0 ? void 0 : cardData.isBlur,
            position: position
        };
        yield (0, card_service_1.createCardData)(newCardData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: mediator_1.MediatorApiSource.put.updateMediatorCard.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateMediatorCard = updateMediatorCard;
