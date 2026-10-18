import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { Service } from './schemas/service.schema.js';
import { TeamsService } from '../teams/teams.service.js';
import { MembershipService } from '../membership/membership.service.js';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    private readonly teamsService: TeamsService,
    private readonly membershipService: MembershipService
  ) {}


  async findByTeamId(teamId: string, requesterId:string){

    const team = await this.teamsService.findById(teamId)

    if (!team){
        throw new NotFoundException("Team doesn't exist")
    }

    const membership = await this.membershipService.findMembership(requesterId, team.organizationId.toString())

    if(!membership){
        throw new ForbiddenException("User is not part of the organization")
    }

    const services = await this.serviceModel.find({ teamId, organizationId: team.organizationId.toString() }).exec()

    return services.map(
      (service)=> {
        return{
          id: service._id.toString(),
          name: service.name,
          kind: service.kind,
          teamId: service.teamId.toString(),
          organizationId: service.organizationId.toString(),
          description: service.description
        }
      }
    )
  }

}
