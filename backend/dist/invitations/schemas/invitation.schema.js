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
let Invitation = class Invitation {
    organizationId;
    email;
    role;
    tokenHash;
    invitedBy;
    expiresAt;
    acceptedAt;
};
__decorate([
    Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    }),
    __metadata("design:type", Types.ObjectId)
], Invitation.prototype, "organizationId", void 0);
__decorate([
    Prop({ required: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Invitation.prototype, "email", void 0);
__decorate([
    Prop({
        type: String,
        enum: ['admin', 'member'],
        default: 'member',
        required: true,
    }),
    __metadata("design:type", String)
], Invitation.prototype, "role", void 0);
__decorate([
    Prop({ required: true, unique: true, select: false }),
    __metadata("design:type", String)
], Invitation.prototype, "tokenHash", void 0);
__decorate([
    Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", Types.ObjectId)
], Invitation.prototype, "invitedBy", void 0);
__decorate([
    Prop({ required: true, type: Date }),
    __metadata("design:type", Date)
], Invitation.prototype, "expiresAt", void 0);
__decorate([
    Prop({ type: Date, default: null }),
    __metadata("design:type", Object)
], Invitation.prototype, "acceptedAt", void 0);
Invitation = __decorate([
    Schema({ timestamps: true })
], Invitation);
export { Invitation };
export const InvitationSchema = SchemaFactory.createForClass(Invitation);
//# sourceMappingURL=invitation.schema.js.map