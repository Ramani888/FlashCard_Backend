export interface ISet {
    _id?: ObjectId;
    name: string;
    isPrivate: boolean;
    color: string;
    userId: string;
    folderId: string;
    isHighlight: boolean;
}