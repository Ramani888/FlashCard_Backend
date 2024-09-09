export interface ISet {
    _id?: ObjectId;
    name: string;
    isPrivate: boolean;
    color: string;
    cardTypeId: string;
    userId: string;
    folderId: string;
}