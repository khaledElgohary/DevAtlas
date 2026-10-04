import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, type ClientSession } from 'mongoose';
import {
  Membership,
  type MembershipDocument,
  type OrganizationRole,
} from './schemas/membership.schema.js';

@Injectable()
export class MembershipService {
    constructor(
        @InjectModel(Membership.name)
        private readonly membershipModel: Model<Membership>,
    ){}

    async findMembership(
        userId: string,
        organizationId: string,
    ): Promise<MembershipDocument | null> {
        return this.membershipModel.findOne({ userId, organizationId }).exec();
    }


    async createMembership(
        userId:string,
        organizationId: string,
        role: OrganizationRole = 'member',
        session?: ClientSession,
    ): Promise<MembershipDocument> {
        const [membership] = await this.membershipModel.create(
            [{userId, organizationId, role}],
            {session},
        );
        return membership;
    }

    async findByUserId(userId: string): Promise<MembershipDocument[]> {
        return this.membershipModel
            .find({userId})
            .exec()
    }
}
