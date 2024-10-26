import { TempUser } from "../models/tempUser.model";
import { User } from "../models/user.model";
import { IUser } from "../types/user";

export const getUserByEmail = async (email: string) => {
    try {
        const result = await User?.findOne({ email: email });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}

export const getTempUserByEmail = async (email: string) => {
    try {
        const result = await TempUser?.findOne({ email: email });
        return result;
    } catch (err) {
        throw err;
    }
}

export const createTempUser = async (data: IUser, otp: number) => {
    try {
        const newData = new TempUser({...data, otp: otp});
        await newData.save();
        return;
    } catch (err) {
        throw err;
    }
}

export const updateTempUser = async (data: IUser, otp: number) => {
    try {
        const result = await TempUser.findOneAndUpdate(
            { email: data?.email },
            { $set: { otp: otp }},
            { new: true, upsert: false }
        );
        return result;
    } catch (err) {
        throw err;
    }
}

export const updateTempUserPassword = async (data: IUser, otp: number) => {
    try {
        const result = await TempUser.findOneAndUpdate(
            { email: data?.email },
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
        const userData = {
            userName: data?.userName,
            email: data?.email,
            password: data?.password,
        }
        const newData = new User(userData);
        const savedUser = await newData.save(); // Save the user and get the saved data
        return savedUser._id; // Return the newly inserted user's ID
    } catch (err) {
        throw err;
    }
}

