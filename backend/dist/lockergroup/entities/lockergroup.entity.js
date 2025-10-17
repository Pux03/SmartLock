"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockerGroup = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("../../company/entities/company.entity");
const locker_entity_1 = require("../../locker/entities/locker.entity");
let LockerGroup = class LockerGroup {
    id;
    name;
    company;
    lockers;
};
exports.LockerGroup = LockerGroup;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LockerGroup.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LockerGroup.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.lockerGroups, { onDelete: 'CASCADE' }),
    __metadata("design:type", company_entity_1.Company)
], LockerGroup.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => locker_entity_1.Locker, (locker) => locker.group),
    __metadata("design:type", Array)
], LockerGroup.prototype, "lockers", void 0);
exports.LockerGroup = LockerGroup = __decorate([
    (0, typeorm_1.Entity)()
], LockerGroup);
//# sourceMappingURL=lockergroup.entity.js.map