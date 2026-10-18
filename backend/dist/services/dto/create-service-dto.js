var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsMongoId, IsString, Matches, MaxLength, ValidateIf, IsIn, } from 'class-validator';
export class CreateServiceDto {
    teamId;
    name;
    description;
    kind;
}
__decorate([
    IsMongoId(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "teamId", void 0);
__decorate([
    IsString(),
    Matches(/\S/, { message: 'Name cannot be empty or just spaces' }),
    MaxLength(100),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "name", void 0);
__decorate([
    IsString(),
    MaxLength(1000),
    ValidateIf((o) => o.description !== undefined),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "description", void 0);
__decorate([
    IsString(),
    IsIn(['api', 'worker', 'web-app', 'library']),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "kind", void 0);
//# sourceMappingURL=create-service-dto.js.map