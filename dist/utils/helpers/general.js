"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardCollectionName = exports.getSetCollectionName = exports.comparePassword = exports.encryptPassword = exports.calculateStorage = exports.calculateFileSizeInMB = exports.getIssueSentence = exports.generateOTP = void 0;
exports.authenticateToken = authenticateToken;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const general_1 = require("../constants/general");
const set_1 = require("../constants/set");
const card_1 = require("../constants/card");
const env = process.env;
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};
exports.generateOTP = generateOTP;
const getIssueSentence = (supportType) => {
    switch (supportType) {
        case 'Bug Report':
            return 'A new Bug Report has been successfully submitted by the user. Please review the details and take the necessary action.';
        case 'Feedback':
            return 'The user has submitted Feedback. Please check the details and provide a response as needed.';
        case 'Issues':
            return 'An Issue has been reported by the user. Kindly review the submission and address it promptly.';
        case 'Suggestions':
            return 'A new Suggestion has been submitted by the user. Please take a look and consider it for future improvements.';
        case 'ETC':
            return 'A user has submitted an issue under the category ETC. Please review the information and respond accordingly.';
        default:
            return 'A new Bug Report has been successfully submitted by the user. Please review the details and take the necessary action.';
    }
};
exports.getIssueSentence = getIssueSentence;
const calculateFileSizeInMB = (sizeInBytes) => {
    const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to MB
    return {
        size: parseFloat(sizeInMB.toFixed(2)),
        unit: 'mb'
    };
};
exports.calculateFileSizeInMB = calculateFileSizeInMB;
const calculateStorage = (maxSize, maxUnit, coveredSize, coveredUnit, newSize, newUnit, operationType) => {
    const unitToBytes = {
        kb: 1024,
        mb: Math.pow(1024, 2),
        gb: Math.pow(1024, 3)
    };
    // Helper function to convert any storage size to bytes
    function toBytes(size, unit) {
        return size * unitToBytes[unit.toLowerCase()];
    }
    // Helper function to round small floating-point numbers to avoid precision issues
    function roundToPrecision(value, precision = 12) {
        return parseFloat(value.toPrecision(precision));
    }
    // Convert all sizes to bytes for calculation
    const maxStorageBytes = toBytes(maxSize, maxUnit);
    const coveredStorageBytes = toBytes(coveredSize, coveredUnit);
    const newStorageBytes = toBytes(newSize, newUnit);
    // Initialize updatedStorageBytes with a default value
    let updatedStorageBytes;
    if (operationType === 'added') {
        updatedStorageBytes = coveredStorageBytes + newStorageBytes;
    }
    else if (operationType === 'deleted') {
        // Prevent subtraction if covered storage is zero
        if (coveredStorageBytes > 0) {
            updatedStorageBytes = coveredStorageBytes - newStorageBytes;
        }
        else {
            updatedStorageBytes = 0; // Prevent negative storage
        }
    }
    else {
        throw new Error('Invalid operation type');
    }
    // Round updated storage bytes to avoid floating-point precision issues
    updatedStorageBytes = roundToPrecision(updatedStorageBytes);
    // Check if the updated storage would exceed the maximum allowed
    if (updatedStorageBytes > maxStorageBytes) {
        return false; // Exceeds max storage
    }
    // Convert back to the max storage unit for consistency
    const updatedStorage = updatedStorageBytes / unitToBytes[maxUnit];
    return {
        updatedCoveredStorageSize: roundToPrecision(updatedStorage), // Round the final result for consistency
        updatedCoveredStorageUnit: maxUnit
    };
};
exports.calculateStorage = calculateStorage;
const encryptPassword = (password) => {
    return new Promise((resolve) => {
        bcryptjs_1.default.genSalt(5, function (err, salt) {
            bcryptjs_1.default.hash(password, salt, function (err, hash) {
                return resolve(hash);
            });
        });
    });
};
exports.encryptPassword = encryptPassword;
const comparePassword = (storedPassword, validatePassword) => {
    if (storedPassword === validatePassword) {
        return Promise.resolve(true);
    }
    return new Promise((resolve, reject) => {
        bcryptjs_1.default.compare(storedPassword, validatePassword, (err, res) => {
            if (err)
                return reject(err);
            return res ? resolve(res) : reject(new Error('Passwords do not match.'));
        });
    });
};
exports.comparePassword = comparePassword;
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    const SECRET_KEY = env.SECRET_KEY;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
}
const getSetCollectionName = (language) => {
    switch (language) {
        case general_1.LanguageCode.En:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.En;
        case general_1.LanguageCode.Cn:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.Cn;
        case general_1.LanguageCode.Tl:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.Tl;
        case general_1.LanguageCode.Fr:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.Fr;
        case general_1.LanguageCode.De:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.De;
        case general_1.LanguageCode.Hi:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.Hi;
        case general_1.LanguageCode.Id:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.Id;
        case general_1.LanguageCode.It:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.It;
        case general_1.LanguageCode.Pl:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.Pl;
        case general_1.LanguageCode.Pt:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.Pt;
        case general_1.LanguageCode.Es:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.Es;
        case general_1.LanguageCode.Sw:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.Sw;
        default:
            return set_1.DefaultSetName === null || set_1.DefaultSetName === void 0 ? void 0 : set_1.DefaultSetName.En;
    }
};
exports.getSetCollectionName = getSetCollectionName;
const getCardCollectionName = (language) => {
    switch (language) {
        case general_1.LanguageCode.En:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.En;
        case general_1.LanguageCode.Cn:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.Cn;
        case general_1.LanguageCode.Tl:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.Tl;
        case general_1.LanguageCode.Fr:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.Fr;
        case general_1.LanguageCode.De:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.De;
        case general_1.LanguageCode.Hi:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.Hi;
        case general_1.LanguageCode.Id:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.Id;
        case general_1.LanguageCode.It:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.It;
        case general_1.LanguageCode.Pl:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.Pl;
        case general_1.LanguageCode.Pt:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.Pt;
        case general_1.LanguageCode.Es:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.Es;
        case general_1.LanguageCode.Sw:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.Sw;
        default:
            return card_1.DefaultCardName === null || card_1.DefaultCardName === void 0 ? void 0 : card_1.DefaultCardName.En;
    }
};
exports.getCardCollectionName = getCardCollectionName;
