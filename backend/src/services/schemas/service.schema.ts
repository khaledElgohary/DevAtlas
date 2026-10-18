import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import type {HydratedDocument} from 'mongoose';


export type ServiceDocument = HydratedDocument<Service>;

@Schema({timestamps: true})
export class Service {
    @Prop({required:true, trim:true, maxlength: 100})
    name!: string;


    @Prop({trim:true, default: '', maxlength: 1000})
    description!: string;

    @Prop({enum: ['api', 'worker', 'web-app', 'library'], required:true, type: String})
    kind!: 'api' | 'worker' | 'web-app' | 'library';

    @Prop({required:true , type: MongooseSchema.Types.ObjectId, ref: 'Organization'})
    organizationId!: Types.ObjectId;

    @Prop({required:true , type: MongooseSchema.Types.ObjectId, ref: 'Team'})
    teamId!: Types.ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);