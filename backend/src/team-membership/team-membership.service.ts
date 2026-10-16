import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMembership, TeamMembershipDocument } from './schemas/team-membership.schema.js';

@Injectable()
export class TeamMembershipService {
    constructor(
        @InjectModel(TeamMembership.name) private readonly teamMembershipModel: Model<TeamMembership>,
    ) {}


    async findMembership(teamId: string, userId: string): Promise<TeamMembershipDocument | null> {
        return this.teamMembershipModel
            .findOne({ teamId, userId })
            .exec();
    }
}
