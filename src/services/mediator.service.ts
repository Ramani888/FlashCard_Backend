import { Set } from "../models/set.models";

export const getMediatorSetData = async (userId: string) => {
    try {
        const result = await Set.find({ userId: userId?.toString(), isPrivate: false })
        return result;
    } catch (err) {
        throw err;
    }
}