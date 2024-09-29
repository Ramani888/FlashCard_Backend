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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromS3 = exports.uploadToS3 = void 0;
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = require("aws-sdk"); // Using aws-sdk v2 for s3.upload() and deleteObject()
const dotenv_1 = __importDefault(require("dotenv"));
const url_1 = require("url"); // To help extract the file key from the S3 URL
dotenv_1.default.config();
// Multer configuration for in-memory storage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// Initialize S3 client using environment variables
const s3 = new aws_sdk_1.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
});
// Function to upload a file to S3
const uploadToS3 = (file, bucketName) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: bucketName,
        Key: `${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
    };
    try {
        // Upload file using s3.upload() from aws-sdk v2
        const uploadResult = yield s3.upload(params).promise();
        // Return the file's public URL in S3
        return uploadResult.Location; // S3 automatically provides the file URL
    }
    catch (error) {
        console.error('Error uploading to S3:', error);
        throw new Error('Error uploading to S3');
    }
});
exports.uploadToS3 = uploadToS3;
const deleteFromS3 = (fileUrl, bucketName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bucket = bucketName;
        // Extract key from URL and decode it
        const key = extractKeyFromObjectUrl(fileUrl, bucket);
        const params = {
            Bucket: bucket,
            Key: key,
        };
        // Attempt to delete the file from S3
        yield s3.deleteObject(params).promise();
        console.log(`File deleted successfully: ${fileUrl}`);
    }
    catch (error) {
        console.error('Error deleting file from S3:', error);
        throw new Error('Error deleting file from S3');
    }
});
exports.deleteFromS3 = deleteFromS3;
const extractKeyFromObjectUrl = (fileUrl, bucketName) => {
    try {
        const url = new url_1.URL(fileUrl);
        let key = url.pathname.replace(`/${bucketName}/`, '');
        // Ensure there's no leading slash in the key
        if (key.startsWith('/')) {
            key = key.substring(1);
        }
        // Decode any URL-encoded characters in the key
        key = decodeURIComponent(key);
        console.log('Extracted key:', key); // Debugging log to verify key
        return key;
    }
    catch (error) {
        console.error('Error extracting key from Object URL:', error);
        throw new Error('Invalid S3 URL');
    }
};
exports.default = upload;
