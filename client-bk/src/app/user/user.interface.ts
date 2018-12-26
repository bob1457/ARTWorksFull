export interface IUser {
    id: string;
    username: string;
    email: string;
    avatar: string;
    birthYear: number;
    lastLogin: Date;
    createOn: Date;
    updatedOn: Date;
    token: string;
}