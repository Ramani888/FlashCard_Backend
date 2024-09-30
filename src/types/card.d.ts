export interface ICard {
    _id?: ObjectId;
    top: string;
    bottom: string;
    note?: string;
    setId: string;
    folderId: string;
    userId: string;
    isBlur?: boolean;
    position: number;
}