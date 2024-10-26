"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encryptPassword = exports.calculateStorage = exports.calculateFileSizeInMB = exports.getIssueSentence = exports.generateOTP = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
