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
exports.deleteAccount = exports.addAutoTranslateSetsAndCards = exports.addDefaultSetsAndCards = exports.updateUserCredit = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_1 = require("../utils/constants/user");
const user_service_1 = require("../services/user.service");
const card_service_1 = require("../services/card.service");
const updateUserCredit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    try {
        const { userId, credit, type } = bodyData;
        const userCreditData = yield (0, user_service_1.getUserCreditData)(userId);
        let creditCount = userCreditData === null || userCreditData === void 0 ? void 0 : userCreditData.credit;
        if (type === 'credited') {
            creditCount = Number(creditCount) + Number(credit);
            yield (0, user_service_1.createUserCreditLogsData)({ userId: userId, creditBalance: Number(credit), type: 'credited' });
        }
        else {
            creditCount = Number(creditCount) - Number(credit);
            yield (0, user_service_1.createUserCreditLogsData)({ userId: userId, creditBalance: Number(credit), type: 'debited' });
        }
        yield (0, user_service_1.updateUserCreditData)({ userId: userId, credit: Number(creditCount) });
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: user_1.UserApiSource.put.updateCredit.message });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.updateUserCredit = updateUserCredit;
const addDefaultSetsAndCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, language } = req.query;
    try {
        const data = yield (0, card_service_1.getAutoCardByUserId)(userId);
        if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
            return res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: "Sets and cards already added." });
        }
        yield (0, user_service_1.createUserDefaultCards)(userId, language);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: user_1.UserApiSource.post.addDefaultSetsAndCards.message });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.addDefaultSetsAndCards = addDefaultSetsAndCards;
const addAutoTranslateSetsAndCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { language } = req.query;
    try {
        yield (0, user_service_1.addAutoTranslateSetsAndCardsData)(language);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: user_1.UserApiSource.post.addAutoTranslateSetsAndCards.message });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.addAutoTranslateSetsAndCards = addAutoTranslateSetsAndCards;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        if (!userId) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({ error: 'User not authenticated.' });
        }
        yield (0, user_service_1.deleteUserAccount)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: user_1.UserApiSource.delete.deleteAccount.message });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.deleteAccount = deleteAccount;
