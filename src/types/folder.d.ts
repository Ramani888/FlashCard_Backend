export interface IFolder {
    _id?: ObjectId;
    name: string;
    isPrivate: boolean;
    color: string;
    cardTypeId: string;
    userId: string;
}