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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (to, subject, htmlTemplate, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'mail.privateemail.com',
        port: 587, // TLS
        secure: false, // false for 587, true for 465
        auth: {
            user: 'support@biblestudycards.app',
            pass: 'BibleApp1234$' // mailbox or app password
        }
    });
    const mailOptions = {
        from: '"Bible Study Cards" <support@biblestudycards.app>',
        to,
        subject,
        html: htmlTemplate
    };
    if (imageUrl) {
        mailOptions.attachments = [
            {
                filename: 'image.jpg',
                path: imageUrl
            }
        ];
    }
    yield transporter.sendMail(mailOptions);
});
exports.default = sendMail;
