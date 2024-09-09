export interface ICard {
    _id?: ObjectId;
    top: string;
    bottom: string;
    note?: string;
    setId: string;
    cardTypeId: string;
    userId: string;
    isBlur?: boolean;
}