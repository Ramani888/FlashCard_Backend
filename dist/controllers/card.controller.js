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
exports.getAllCard = exports.moveCard = exports.blurAllCard = exports.deleteCard = exports.getCard = exports.updateCard = exports.createCard = exports.getCardType = void 0;
const http_status_codes_1 = require("http-status-codes");
const card_service_1 = require("../services/card.service");
const card_1 = require("../utils/constants/card");
const getCardType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, card_service_1.getCardTypeData)();
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getCardType = getCardType;
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        const cardData = yield (0, card_service_1.getCardWithLargestPosition)(bodyData === null || bodyData === void 0 ? void 0 : bodyData.userId, bodyData === null || bodyData === void 0 ? void 0 : bodyData.setId);
        const position = (cardData === null || cardData === void 0 ? void 0 : cardData.position) ? (cardData === null || cardData === void 0 ? void 0 : cardData.position) + 1 : 1;
        yield (0, card_service_1.createCardData)(Object.assign(Object.assign({}, bodyData), { position: position }));
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: card_1.CardApiSource.post.createCard.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.createCard = createCard;
const updateCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        yield (0, card_service_1.updateCardData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: card_1.CardApiSource.put.updateCard.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateCard = updateCard;
const getCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { setId, userId } = req.query;
    try {
        const data = yield (0, card_service_1.getCardData)(setId, userId);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getCard = getCard;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    try {
        yield (0, card_service_1.deleteCardData)(_id);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: card_1.CardApiSource.delete.deleteCard.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.deleteCard = deleteCard;
const blurAllCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { setId, isBlur } = req.query;
    try {
        const cardData = yield (0, card_service_1.getCardBySetId)(setId);
        const updateCardData = cardData === null || cardData === void 0 ? void 0 : cardData.map((item) => {
            return Object.assign(Object.assign({}, item), { isBlur: isBlur === 'true' ? true : false });
        });
        yield (0, card_service_1.blurAllCardData)(updateCardData);
        if (isBlur === 'true') {
            res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: card_1.CardApiSource.put.blurAllCard.message });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: card_1.CardApiSource.put.blurAllCard.messageForUnblur });
        }
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.blurAllCard = blurAllCard;
const moveCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { setId, cardId } = req.query;
    try {
        const cardData = yield (0, card_service_1.getCardByCardId)(cardId);
        if (cardData) {
            const updatedCardData = Object.assign(Object.assign({}, cardData), { setId: setId, folderId: cardData.folderId || '', note: (cardData === null || cardData === void 0 ? void 0 : cardData.note) || '' });
            yield (0, card_service_1.updateCardData)(updatedCardData);
        }
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: card_1.CardApiSource.put.moveCard.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.moveCard = moveCard;
const getAllCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, card_service_1.getAllCardData)();
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getAllCard = getAllCard;
