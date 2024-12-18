import { Card } from "../models/card.model";
import { CardType } from "../models/cardType.model";
import { ICard } from "../types/card";
import { ObjectId } from 'mongodb';

export const getCardTypeData = async () => {
    try {
        const result = await CardType.find();
        return result;
    } catch (err) {
        throw err;
    }
}

export const createCardData = async (data: ICard) => {
    try {
        const newData = new Card(data);
        await newData.save();
    } catch (err) {
        throw err;
    }
}

export const updateCardData = async (updateData: ICard) => {
    try {
        const objectId = new ObjectId(updateData?._id?.toString());
        const result = await Card.findByIdAndUpdate(objectId, updateData, {
            new: true,
            runValidators: true
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getCardData = async (setId: string, userId: string) => {
    try {
      const result = await Card.find({ setId: setId?.toString(), userId: userId?.toString() })
        .sort({ position: 1 });
      return result;
    } catch (err) {
      throw err;
    }
}
  

export const getCardByCardId = async (cardId: string) => {
    try {
        const objectId = new ObjectId(cardId?.toString());
        const result = await Card.findOne({ _id: objectId });
        return result?.toObject();
    } catch (err) {
        throw err;
    }
}

export const getCardBySetId = async (setId: string) => {
    try {
        const result = await Card.find({ setId: setId?.toString() }).lean();
        return result;
    } catch (err) {
        throw err;
    }
}

export const deleteCardData = async (_id: string) => {
    try {
        const objectId = new ObjectId(_id?.toString());
        await Card.deleteOne({ _id: objectId });
        return;
    } catch (err) {
        throw err;
    }
}

export const blurAllCardData = async (updateCardData: any[]) => {
    try {
        const updatePromises = updateCardData.map(async (updateData) => {
            const objectId = new ObjectId(updateData._id?.toString());
            return await Card.findByIdAndUpdate(objectId, updateData, {
                new: true,
                runValidators: true
            });
        });

        const results = await Promise.all(updatePromises);
        return results;
    } catch (err) {
        throw err;
    }
}

export const getCardWithLargestPosition = async (userId: string, setId: string) => {
    try {
      const result = await Card.findOne({ userId: userId?.toString(), setId: setId?.toString() }).sort({ position: -1 });
      return result?.toObject();
    } catch (error) {
      throw error;
    }
}

export const getAllCardData = async () => {
    try {
        const result = await Card.aggregate([
            {
                $addFields: {
                    setIdObjectId: { $toObjectId: '$setId' }, // Convert setId string to ObjectId
                    userIdObjectId: { $toObjectId: '$userId' }, // Convert userId string to ObjectId
                },
            },
            {
                $lookup: {
                    from: 'Set', // The name of the Set collection
                    localField: 'setIdObjectId', // The converted ObjectId field
                    foreignField: '_id', // The field in the Set collection
                    as: 'setData', // The resulting field
                },
            },
            {
                $lookup: {
                    from: 'User', // The name of the User collection
                    localField: 'userIdObjectId', // The converted ObjectId field
                    foreignField: '_id', // The field in the User collection
                    as: 'userData', // The resulting field
                },
            },
            {
                $addFields: {
                    setData: { $arrayElemAt: ['$setData', 0] }, // Extract the first element (if any)
                    userData: { $arrayElemAt: ['$userData', 0] }, // Extract the first element (if any)
                },
            },
            {
                $project: {
                    setIdObjectId: 0, // Remove temporary fields from the result
                    userIdObjectId: 0,
                },
            },
            {
                $sort: {
                    createdAt: -1, // Sort by createdAt field in descending order
                },
            },
        ]);
        return result;
    } catch (err) {
        throw err;
    }
};