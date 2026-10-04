import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization{
    @Prop({ required: true, trim:true, maxlength: 100 })
    name!: string;

    @Prop({ 
        required:true, 
        unique:true, 
        lowercase:true, 
        trim:true, 
        match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 
        maxlength: 63,
    })
    // Unique identifier for the organization
    slug!: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);