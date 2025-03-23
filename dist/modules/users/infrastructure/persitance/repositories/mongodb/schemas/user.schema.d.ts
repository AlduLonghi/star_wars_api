import { Document } from 'mongoose';
import { Role } from 'src/modules/users/domain/entities/user';
export type UserDocument = User & Document;
export declare class User {
    _id: string;
    email: string;
    password: string;
    role: Role;
    name: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
