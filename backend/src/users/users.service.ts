import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, type UserDocument } from './schemas/user.schema.js';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ){}

    async findByEmail(email:string): Promise<UserDocument | null> {
        return this.userModel
            .findOne({email: email.trim().toLowerCase()})
            .exec(); 
    }

    async findByEmailWithPassword(
        email:string,
    ): Promise<UserDocument | null> {
        return this.userModel
            .findOne({email: email.trim().toLowerCase()})
            .select('+passwordHash')
            .exec(); 
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }


    async createUser(
        name:string,
        email:string,
        passwordHash:string
    ): Promise<UserDocument> {
        return this.userModel.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            passwordHash,
        });
    }

    async findByIds(ids: string[]): Promise<UserDocument[]> {
        return this.userModel
            .find({ _id: { $in: ids } })
            .exec();
    }
}
