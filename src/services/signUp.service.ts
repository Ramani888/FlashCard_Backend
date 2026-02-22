import { TempUser } from "../models/tempUser.model";
import { User } from "../models/user.model";
import { IUser } from "../types/user";

export const getUserByEmail = async (email: string) => {
    try {
        const updatedEmail = email?.toLowerCase();
        const result = await User?.findOne({ email: updatedEmail });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}

export const getTempUserByEmail = async (email: string) => {
    try {
        const updatedEmail = email?.toLowerCase();
        const result = await TempUser?.findOne({ email: updatedEmail });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}

export const createTempUser = async (data: IUser, otp: number, otpTimeOut: number) => {
    try {
        const email = data?.email?.toLowerCase();
        const newData = new TempUser({...data, email: email, otp: otp, otpTimeOut: otpTimeOut});
        await newData.save();
        return;
    } catch (err) {
        throw err;
    }
}

export const updateTempUser = async (data: IUser, otp: number, otpTimeOut: number) => {
    try {
        const email = data?.email?.toLowerCase();
        const result = await TempUser.findOneAndUpdate(
            { email: email },
            { $set: { otp: otp, otpTimeOut: otpTimeOut, isPrivacy: data?.isPrivacy }},
            { new: true, upsert: false }
        );
        return result;
    } catch (err) {
        throw err;
    }
}

export const updateTempUserPassword = async (data: IUser, otp: number) => {
    try {
        const email = data?.email?.toLowerCase();
        const result = await TempUser.findOneAndUpdate(
            { email: email },
            { $set: { otp: otp, password: data?.password }},
            { new: true, upsert: false }
        );
        return result;
    } catch (err) {
        throw err;
    }
}

export const createUser = async (data: IUser) => {
    try {
        const email = data?.email?.toLowerCase();
        const userData = {
            email: email,
            password: data?.password,
            picture: data?.picture,
            isPrivacy: data?.isPrivacy
        }
        const newData = new User(userData);
        const savedUser = await newData.save(); // Save the user and get the saved data
        return savedUser._id; // Return the newly inserted user's ID
    } catch (err) {
        throw err;
    }
}

