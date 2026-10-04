import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import type { Connection, Model } from 'mongoose';
import { Organization, OrganizationDocument } from './schemas/organization.schema.js';
import { MembershipService } from '../membership/membership.service.js';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectModel(Organization.name)
        private readonly organizationModel: Model<Organization>,
        private readonly membershipService: MembershipService,
        @InjectConnection()
        private readonly connection: Connection,
    ){}


    async findBySlug(
        slug:string
    ): Promise<OrganizationDocument | null>{
        return this.organizationModel
            .findOne({slug: slug.trim().toLowerCase()})
            .exec();
    }

    
    async createOrganization(
        name: string,
        slug: string,
        creatorId: string,
    ): Promise<OrganizationDocument> {
        const session = await this.connection.startSession();
        try{
            return await session.withTransaction(async () => {
                const [organization] = await this.organizationModel.create(
                   [{
                    name: name.trim(),
                    slug: slug.trim().toLowerCase()
                   }],
                   {session},
                );

                await this.membershipService.createMembership(
                    creatorId,
                    organization._id.toString(),
                    'owner',
                    session,
                );

                return organization;
            });
        } finally {
            await session.endSession();
        }
    }

    async listForUser(userId: string){
        const memberships =
            await this.membershipService.findByUserId(userId)

        const organizations = await this.organizationModel
            .find({
                _id: {$in: memberships.map((membership) => membership.organizationId)},
            })
            .exec();
        
        return organizations.map((organization) => ({
            id: organization._id.toString(),
            name: organization.name,
            slug: organization.slug,
            role: memberships.find((membership) =>
            membership.organizationId.equals(organization._id),
            )!.role,
        }));
    }
}
