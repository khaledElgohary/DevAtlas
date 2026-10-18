import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMembership, TeamMembershipDocument } from './schemas/team-membership.schema.js';
import { TeamsService } from '../teams/teams.service.js';
import { MembershipService } from '../membership/membership.service.js';
import { MongoServerError } from 'mongodb';
import { TeamDocument } from '../teams/schemas/teams.schema.js';
import { UserDocument } from '../users/schemas/user.schema.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class TeamMembershipService {
    constructor(
        @InjectModel(TeamMembership.name) private readonly teamMembershipModel: Model<TeamMembership>,
        private readonly teamsService: TeamsService,
        private readonly membershipService: MembershipService,
        private readonly usersService: UsersService
    ) {}


    async findMembership(teamId: string, userId: string): Promise<TeamMembershipDocument | null> {
        return this.teamMembershipModel
            .findOne({ teamId, userId })
            .exec();
    }

    private async createMembership(teamId:string, userId:string): Promise<TeamMembershipDocument> {
        return this.teamMembershipModel
            .create({ teamId, userId });
    }

    async addMember(teamId:string, userId:string, requesterId:string): Promise<TeamMembershipDocument> {
        const team = await this.teamsService.findById(teamId);
        if(!team){
            throw new NotFoundException("Team not found");
        }

        const membership = await this.membershipService.findMembership(requesterId, String(team.organizationId));
        if(!membership || (membership.role!=='owner' && membership.role!=='admin')){
            throw new ForbiddenException("Requester does not have permission to add members to this team");
        }


        const existingMembership = await this.membershipService.findMembership(userId, String(team.organizationId));
        if(!existingMembership){
            throw new ForbiddenException("User must belong to this organization before joining its teams");
        }

        try{
            return await this.createMembership(teamId, userId);
        }
        catch(error){
            if(error instanceof MongoServerError && error.code === 11000){
                throw new ConflictException("User is already a member of this team");
            }
            throw error
        }
    }


    private async requireOrganizationMember(teamId:string, requesterId:string): Promise<TeamDocument>{
        const team = await this.teamsService.findById(teamId)

        if(!team){
            throw new NotFoundException("Team Not Found")
        }

        const membership = await this.membershipService.findMembership(requesterId, String(team.organizationId))

        if(!membership){
            throw new ForbiddenException("User doesn't belong to the organization")
        }

        return team
    }


    async listMembers(teamId:string, requesterId:string){
        await this.requireOrganizationMember(teamId, requesterId)

        const memberships = await this.teamMembershipModel.find({teamId}).exec();

        const users = await this.usersService.findByIds(
            memberships.map((membership) => membership.userId.toString())
        )

        return users.map(
            (user) => ({
                id: user._id.toString(),
                name: user.name,
                email: user.email
            })
        )
    }


    async removeMember(teamId:string, userId:string, requesterId:string): Promise<{message: string}> {
        const team = await this.requireOrganizationMember(teamId, requesterId)

        const membership = await this.membershipService.findMembership(requesterId, String(team.organizationId));

        if(!membership){
            throw new ForbiddenException("Requester does not have permission to remove members from this team");
        }

        if(membership.role === "member"){
            throw new ForbiddenException("Only organization owners and admins can remove team members");
        }

        const count = await this.teamMembershipModel.deleteOne({teamId, userId}).exec();
        if(count.deletedCount === 0){
            throw new NotFoundException("Membership not found");
        }

        return {message: "Membership successfully removed"}
    }


    async findByUserId(userId:string): Promise<TeamMembershipDocument[]> {
        return this.teamMembershipModel.find({userId}).exec();
    }

    async listMyTeams(userId:string) {
        const memberships = await this.findByUserId(userId);
        const teamIds = memberships.map((membership) => membership.teamId.toString());
        
        const teams = await this.teamsService.findByIds(teamIds);

        return teams.map(
            (team) => ({
                id: team._id.toString(),
                name: team.name,
                organizationId: team.organizationId.toString()
            })
        )
    }
}
