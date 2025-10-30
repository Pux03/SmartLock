"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockergroupModule = void 0;
const common_1 = require("@nestjs/common");
const lockergroup_service_1 = require("./lockergroup.service");
const lockergroup_controller_1 = require("./lockergroup.controller");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("../company/entities/company.entity");
const lockergroup_entity_1 = require("./entities/lockergroup.entity");
const locker_entity_1 = require("../locker/entities/locker.entity");
const user_entity_1 = require("../user/entities/user.entity");
let LockergroupModule = class LockergroupModule {
};
exports.LockergroupModule = LockergroupModule;
exports.LockergroupModule = LockergroupModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_entity_1.Company, lockergroup_entity_1.LockerGroup, locker_entity_1.Locker, user_entity_1.User])],
        controllers: [lockergroup_controller_1.LockergroupController],
        providers: [lockergroup_service_1.LockergroupService],
    })
], LockergroupModule);
//# sourceMappingURL=lockergroup.module.js.map