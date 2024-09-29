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
exports.deleteContacts = exports.getContacts = exports.addContact = exports.getUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const contacts_1 = require("../utils/constants/contacts");
const contacts_service_1 = require("../services/contacts.service");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, userId } = req.query;
    try {
        //Get Contact List
        const contactData = yield (0, contacts_service_1.getContactByUserId)(userId);
        const data = yield (0, contacts_service_1.getUsersData)(search, userId);
        // Step 1: Extract all contactUserIds from contactData
        const contactUserIds = contactData.map(contact => contact.contactUserId);
        // Step 2: Filter the data array by checking if the user's _id exists in contactUserIds
        const filteredData = data.filter(user => !contactUserIds.includes(user._id.toString()) // Convert ObjectId to string for comparison
        );
        res.status(http_status_codes_1.StatusCodes.OK).send(filteredData);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getUsers = getUsers;
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req === null || req === void 0 ? void 0 : req.body;
    const { userId, contactUserId } = req.body;
    try {
        const contactData = yield (0, contacts_service_1.getContactByUserIdAndContactUserId)(userId, contactUserId);
        if (contactData)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Already in contact list.' });
        yield (0, contacts_service_1.addContactData)(bodyData);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: contacts_1.ContactsApiSource.post.addContacts.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.addContact = addContact;
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const data = yield (0, contacts_service_1.getContactsData)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.getContacts = getContacts;
const deleteContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    try {
        yield (0, contacts_service_1.deleteContactsData)(_id);
        res.status(http_status_codes_1.StatusCodes.OK).send({ success: true, message: contacts_1.ContactsApiSource.delete.deleteContacts.message });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
});
exports.deleteContacts = deleteContacts;
