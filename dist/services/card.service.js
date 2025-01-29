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
exports.getAllCardData = exports.getCardWithLargestPosition = exports.blurAllCardData = exports.deleteCardData = exports.getCardBySetId = exports.getCardByCardId = exports.getCardData = exports.updateCardData = exports.createCardData = exports.getCardTypeData = void 0;
const card_model_1 = require("../models/card.model");
const cardType_model_1 = require("../models/cardType.model");
const mongodb_1 = require("mongodb");
const getCardTypeData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cardType_model_1.CardType.find();
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getCardTypeData = getCardTypeData;
const createCardData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = new card_model_1.Card(data);
        yield newData.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createCardData = createCardData;
const updateCardData = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectId = new mongodb_1.ObjectId((_a = updateData === null || updateData === void 0 ? void 0 : updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
        const result = yield card_model_1.Card.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.updateCardData = updateCardData;
const getCardData = (setId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield card_model_1.Card.find({ setId: setId === null || setId === void 0 ? void 0 : setId.toString(), userId: userId === null || userId === void 0 ? void 0 : userId.toString() })
            .sort({ position: 1 });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getCardData = getCardData;
const getCardByCardId = (cardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(cardId === null || cardId === void 0 ? void 0 : cardId.toString());
        const result = yield card_model_1.Card.findOne({ _id: objectId });
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (err) {
        throw err;
    }
});
exports.getCardByCardId = getCardByCardId;
const getCardBySetId = (setId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield card_model_1.Card.find({ setId: setId === null || setId === void 0 ? void 0 : setId.toString() }).lean();
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getCardBySetId = getCardBySetId;
const deleteCardData = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongodb_1.ObjectId(_id === null || _id === void 0 ? void 0 : _id.toString());
        yield card_model_1.Card.deleteOne({ _id: objectId });
        return;
    }
    catch (err) {
        throw err;
    }
});
exports.deleteCardData = deleteCardData;
const blurAllCardData = (updateCardData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatePromises = updateCardData.map((updateData) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const objectId = new mongodb_1.ObjectId((_a = updateData._id) === null || _a === void 0 ? void 0 : _a.toString());
            return yield card_model_1.Card.findByIdAndUpdate(objectId, updateData, {
                new: true,
                runValidators: true
            });
        }));
        const results = yield Promise.all(updatePromises);
        return results;
    }
    catch (err) {
        throw err;
    }
});
exports.blurAllCardData = blurAllCardData;
const getCardWithLargestPosition = (userId, setId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield card_model_1.Card.findOne({ userId: userId === null || userId === void 0 ? void 0 : userId.toString(), setId: setId === null || setId === void 0 ? void 0 : setId.toString() }).sort({ position: -1 });
        return result === null || result === void 0 ? void 0 : result.toObject();
    }
    catch (error) {
        throw error;
    }
});
exports.getCardWithLargestPosition = getCardWithLargestPosition;
const getAllCardData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        const result = yield card_model_1.Card.aggregate([
            {
                $match: {
                    updatedAt: { $gte: twentyFourHoursAgo } // Filter only cards updated in the last 24 hours
                }
            },
            {
                $addFields: {
                    setIdObjectId: { $toObjectId: '$setId' }, // Convert setId string to ObjectId
                    userIdObjectId: { $toObjectId: '$userId' }, // Convert userId string to ObjectId
                },
            },
            {
                $lookup: {
                    from: 'Set', // The name of the Set collection
                    localField: 'setIdObjectId', // The converted ObjectId field
                    foreignField: '_id', // The field in the Set collection
                    as: 'setData', // The resulting field
                },
            },
            {
                $lookup: {
                    from: 'User', // The name of the User collection
                    localField: 'userIdObjectId', // The converted ObjectId field
                    foreignField: '_id', // The field in the User collection
                    as: 'userData', // The resulting field
                },
            },
            {
                $addFields: {
                    setData: { $arrayElemAt: ['$setData', 0] }, // Extract the first element (if any)
                    userData: { $arrayElemAt: ['$userData', 0] }, // Extract the first element (if any)
                },
            },
            {
                $project: {
                    setIdObjectId: 0, // Remove temporary fields from the result
                    userIdObjectId: 0,
                },
            },
            {
                $sort: {
                    createdAt: -1, // Sort by createdAt field in descending order
                },
            },
        ]);
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getAllCardData = getAllCardData;
