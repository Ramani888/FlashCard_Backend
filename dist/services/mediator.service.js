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
exports.getMediatorSetData = void 0;
const set_models_1 = require("../models/set.models");
const getMediatorSetData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield set_models_1.Set.find({ userId: userId === null || userId === void 0 ? void 0 : userId.toString(), isPrivate: false });
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.getMediatorSetData = getMediatorSetData;
