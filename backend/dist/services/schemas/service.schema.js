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
let Service = class Service {
    name;
    description;
    kind;
    organizationId;
    teamId;
};
__decorate([
    Prop({ required: true, trim: true, maxlength: 100 }),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    Prop({ trim: true, default: '', maxlength: 1000 }),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    Prop({ enum: ['api', 'worker', 'web-app', 'library'], required: true, type: String }),
    __metadata("design:type", String)
], Service.prototype, "kind", void 0);
__decorate([
    Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Organization' }),
    __metadata("design:type", Types.ObjectId)
], Service.prototype, "organizationId", void 0);
__decorate([
    Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Team' }),
    __metadata("design:type", Types.ObjectId)
], Service.prototype, "teamId", void 0);
Service = __decorate([
    Schema({ timestamps: true })
], Service);
export { Service };
export const ServiceSchema = SchemaFactory.createForClass(Service);
//# sourceMappingURL=service.schema.js.map