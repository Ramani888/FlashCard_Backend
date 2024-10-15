type AuthorizedRequest = Express.Request & ?({ headers: { authorization: string } } & ?{ userData: JwtSign });

declare namespace Express {
  type Request = AuthorizedRequest;
}

export type UserJwt = {
    firstName?: string;
    lastName?: string;
    id?: number;
    roleId: number;
    customerId: number;
    dataModelId: number;
    exp?: number;
};

export interface IUser {
  _id?: ObjectId;
  email?: string;
  userName?: string;
  password?: string;
  picture?: string;
}

export interface ISupport {
  _id?: ObjectId;
  supportType: string;
  userId: string;
  image?: string;
}