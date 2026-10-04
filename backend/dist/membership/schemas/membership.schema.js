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
let Membership = class Membership {
    userId;
    organizationId;
    role;
};
__decorate([
    Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", Types.ObjectId)
], Membership.prototype, "userId", void 0);
__decorate([
    Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    }),
    __metadata("design:type", Types.ObjectId)
], Membership.prototype, "organizationId", void 0);
__decorate([
    Prop({
        type: String,
        enum: ['owner', 'admin', 'member'],
        required: true,
        default: 'member',
    }),
    __metadata("design:type", String)
], Membership.prototype, "role", void 0);
Membership = __decorate([
    Schema({ timestamps: true })
], Membership);
export { Membership };
export const MembershipSchema = SchemaFactory.createForClass(Membership);
MembershipSchema.index({ userId: 1, organizationId: 1 }, { unique: true });
//# sourceMappingURL=membership.schema.js.map