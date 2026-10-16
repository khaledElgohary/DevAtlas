import { ForbiddenException, Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';

import {
    Team,
    type TeamDocument
} from './schemas/teams.schema.js';
import { MembershipService } from '../membership/membership.service.js';

@Injectable()
export class TeamsService {
    constructor(
        @InjectModel(Team.name) private readonly teamModel: Model<Team>,
        private readonly membershipService: MembershipService
    ){}

    async findByOrganizationId(organizationId: string, userId: string): Promise<TeamDocument[]>{
        const membership = await this.membershipService.findMembership(userId, organizationId);

        if(membership === null){
            throw new ForbiddenException("User is not a member of this organization.");
        }
        
        return this.teamModel
            .find({ organizationId })
            .exec();
    }

    async createTeam(name:string, organizationId: string, creatorId: string): Promise<TeamDocument>{
        await this.requireOwnerOrAdmin(creatorId, organizationId);
        
        try {
            const createdTeam = await this.teamModel.create({
                name: name.trim(),
                organizationId
            });

            return createdTeam;
        } catch (error) {
            if(error instanceof MongoServerError && error.code === 11000){
                throw new ConflictException("A team with this name already exists in the organization.");
            }
            throw error;
        }
    }

    private async requireOwnerOrAdmin(
        userId: string,
        organizationId: string,
    ): Promise<void>{
        const membership = await this.membershipService.findMembership(userId, organizationId);

        if(membership === null || (membership.role !== 'owner' && membership.role !== 'admin')){
            throw new ForbiddenException("This action requires the user to be an owner or admin of the organization.");
        }
    }

}
