import { TempUser } from "../models/tempUser.model";
import { User } from "../models/user.model";
import { IUser } from "../types/user";

export const getUserByEmail = async (email: string) => {
    try {
        const result = await User?.findOne({ email: email });
        return result;
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

export const createUser = async (data: IUser) => {
    try {
        const userData = {
            userName: data?.userName,
            email: data?.email,
            password: data?.password,
        }
        const newData = new User(userData);
        await newData.save();
        return;
    } catch (err) {
        throw err;
    }
}
