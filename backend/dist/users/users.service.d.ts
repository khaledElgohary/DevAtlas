import { Model } from 'mongoose';
import { User, type UserDocument } from './schemas/user.schema.js';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findByEmail(email: string): Promise<UserDocument | null>;
    findByEmailWithPassword(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    createUser(name: string, email: string, passwordHash: string): Promise<UserDocument>;
}
