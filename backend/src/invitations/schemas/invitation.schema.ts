import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import type { HydratedDocument } from 'mongoose';

export type InvitationDocument = HydratedDocument<Invitation>;

@Schema({timestamps:true})
export class Invitation{
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    })
    organizationId!: Types.ObjectId

    @Prop({required:true, lowercase: true, trim:true})
    email!: string;

    @Prop({
        type: String,
        enum: ['admin', 'member'],
        default: 'member',
        required: true,
    })
    role!: 'admin' | 'member';

    @Prop({ required: true, unique:true, select:false})
    tokenHash!: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    invitedBy!: Types.ObjectId

    @Prop({ required: true, type: Date})
    expiresAt!: Date;

    @Prop({type: Date, default: null})
    acceptedAt!: Date | null;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation)