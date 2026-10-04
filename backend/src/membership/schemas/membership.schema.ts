import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import type { HydratedDocument } from 'mongoose';

export type MembershipDocument = HydratedDocument<Membership>;
export type OrganizationRole = 'owner' | 'admin' | 'member';

@Schema({timestamps: true})
export class Membership {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required:true,
    })
    userId!: Types.ObjectId;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'Organization',
        required:true,
    })
    organizationId!: Types.ObjectId;

    @Prop({
        type: String,
        enum: ['owner', 'admin', 'member'],
        required: true,
        default: 'member',
    })
    role!: OrganizationRole;
}
export const MembershipSchema = SchemaFactory.createForClass(Membership);

MembershipSchema.index(
    { userId: 1, organizationId: 1 },
    { unique: true },
)