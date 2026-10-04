import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Hydrated document is the typescript type for a User returned as a full Mongoose document
// Hydration itself means turning plain data from MongoDB into a Mongoose document with some methods
export type UserDocument = HydratedDocument<User>;

// timestamps true adds 2 fields, createdAt and updatedAt
// fields ennd in ! to make a definite assignment insertion, telling TypeScript that these fields will be initialized by Mongoose
@Schema({timestamps: true})
export class User {
    @Prop({required: true, trim:true})
    name!:string;

    @Prop({
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
    })
    email!:string;

    // select:false means Mongoose exclude passwordHash from query results by default
    @Prop({required: true, select:false})
    passwordHash!:string;
}

export const UserSchema = SchemaFactory.createForClass(User);