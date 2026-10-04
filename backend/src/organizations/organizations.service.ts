import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import type { Connection, Model } from 'mongoose';
import { Organization, OrganizationDocument } from './schemas/organization.schema.js';
import { MembershipService } from '../membership/membership.service.js';
import type { MembershipDocument } from '../membership/schemas/membership.schema.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectModel(Organization.name)
        private readonly organizationModel: Model<Organization>,
        private readonly membershipService: MembershipService,
        private readonly usersService: UsersService,
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
        } 
        catch(error){
            if ( error instanceof MongoServerError && error.code === 11000){
                throw new ConflictException('An organization with this slug already exists');
            };

            throw error;
        }
        finally {
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

    private async requireMembership(
        userId: string,
        organizationId: string,
    ): Promise<MembershipDocument> {
        const membership = await this.membershipService.findMembership(
            userId,
            organizationId,
        );

        if(!membership){
            throw new ForbiddenException('User is not a member of this organization');
        }

        return membership;
    }

    async listMembers(
        userId: string, organizationId:string
    ){
        await this.requireMembership(userId, organizationId)

        const memberships = await this.membershipService.findByOrganizationId(organizationId);

        const users = await this.usersService.findByIds(
            memberships.map((membership) => membership.userId.toString())
        )

        const usersById = new Map(
            users.map((user) => [user._id.toString(), user]),
        )

        return memberships.map((membership) => {
            const memberId = membership.userId.toString()
            const user = usersById.get(memberId)

            return{
                userId: memberId,
                name: user?.name ?? null,
                email: user?.email ?? null,
                role: membership.role,
            }
        })
    }


}
