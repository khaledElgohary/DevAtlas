import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import type { HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema({timestamps: true})
export class Team {
    @Prop({required: true, trim:true, maxlength: 100})
    name!: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Organization',
    })
    organizationId!: Types.ObjectId;

}

export const TeamSchema = SchemaFactory.createForClass(Team);

TeamSchema.index({
    organizationId: 1,
    name: 1
},{unique: true})