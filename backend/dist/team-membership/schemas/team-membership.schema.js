var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
let TeamMembership = class TeamMembership {
    teamId;
    userId;
};
__decorate([
    Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Team' }),
    __metadata("design:type", Types.ObjectId)
], TeamMembership.prototype, "teamId", void 0);
__decorate([
    Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Types.ObjectId)
], TeamMembership.prototype, "userId", void 0);
TeamMembership = __decorate([
    Schema({ timestamps: true })
], TeamMembership);
export { TeamMembership };
export const TeamMembershipSchema = SchemaFactory.createForClass(TeamMembership);
TeamMembershipSchema.index({ teamId: 1, userId: 1 }, { unique: true });
//# sourceMappingURL=team-membership.schema.js.map