import { AuthorizedRequest } from "../types/user";
import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { ContactsApiSource } from "../utils/constants/contacts";
import { addContactData, getContactByUserId, getContactByUserIdAndContactUserId, getContactsData, getUsersData } from "../services/contacts.service";

export const getUsers = async (req: AuthorizedRequest, res: Response) => {
    const { search, userId } = req.query;
    try {
        //Get Contact List
        const contactData = await getContactByUserId(userId);

        const data = await getUsersData(search, userId);

        // Step 1: Extract all contactUserIds from contactData
        const contactUserIds = contactData.map(contact => contact.contactUserId);

        // Step 2: Filter the data array by checking if the user's _id exists in contactUserIds
        const filteredData = data.filter(user => 
            !contactUserIds.includes(user._id.toString())  // Convert ObjectId to string for comparison
        );
        res.status(StatusCodes.OK).send(filteredData);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const addContact = async (req: AuthorizedRequest, res: Response) => {
    const bodyData = req?.body;
    const { userId, contactUserId } = req.body;
    try {
        const contactData = await getContactByUserIdAndContactUserId(userId, contactUserId);
        if (contactData) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Already in contact list.' });

        await addContactData(bodyData);
        res.status(StatusCodes.OK).send({ success: true, message: ContactsApiSource.post.addContacts.message });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}

export const getContacts = async (req: AuthorizedRequest, res: Response) => {
    const { userId } = req.query;
    try {
        const data = await getContactsData(userId);
        res.status(StatusCodes.OK).send(data);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}