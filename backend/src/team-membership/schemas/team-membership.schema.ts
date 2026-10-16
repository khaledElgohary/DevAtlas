import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import type { HydratedDocument } from 'mongoose';

export type TeamMembershipDocument = HydratedDocument<TeamMembership>;

@Schema({timestamps: true})
export class TeamMembership {
    @Prop({required: true, type:MongooseSchema.Types.ObjectId, ref: 'Team'})
    teamId!: Types.ObjectId;

    @Prop({required: true, type:MongooseSchema.Types.ObjectId, ref: 'User'})
    userId!: Types.ObjectId;
}

export const TeamMembershipSchema = SchemaFactory.createForClass(TeamMembership);

TeamMembershipSchema.index({ teamId: 1, userId: 1 }, { unique: true });