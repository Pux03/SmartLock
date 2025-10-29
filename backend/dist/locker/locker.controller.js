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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockerController = void 0;
const common_1 = require("@nestjs/common");
const locker_service_1 = require("./locker.service");
const create_locker_dto_1 = require("./dto/create-locker.dto");
const update_locker_dto_1 = require("./dto/update-locker.dto");
let LockerController = class LockerController {
    lockerService;
    constructor(lockerService) {
        this.lockerService = lockerService;
    }
    create(createLockerDto) {
        return this.lockerService.create(createLockerDto);
    }
    async addMultiple(lockers) {
        const createdLockers = await Promise.all(lockers.map(locker => this.lockerService.create(locker)));
        return createdLockers;
    }
    findAll() {
        return this.lockerService.findAll();
    }
    findByLockerGroup(lockerGroupId) {
        return this.lockerService.findByLockerGroup(+lockerGroupId);
    }
    findOne(id) {
        return this.lockerService.findOne(+id);
    }
    update(id, updateLockerDto) {
        return this.lockerService.update(+id, updateLockerDto);
    }
    remove(id) {
        return this.lockerService.remove(+id);
    }
    toggleLock(id) {
        return this.lockerService.toggleLockerLock(+id);
    }
};
exports.LockerController = LockerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_locker_dto_1.CreateLockerDto]),
    __metadata("design:returntype", void 0)
], LockerController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('add-lockers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], LockerController.prototype, "addMultiple", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LockerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('group/:lockerGroupId'),
    __param(0, (0, common_1.Param)('lockerGroupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LockerController.prototype, "findByLockerGroup", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LockerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_locker_dto_1.UpdateLockerDto]),
    __metadata("design:returntype", void 0)
], LockerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LockerController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/toggle-lock'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LockerController.prototype, "toggleLock", null);
exports.LockerController = LockerController = __decorate([
    (0, common_1.Controller)('locker'),
    __metadata("design:paramtypes", [locker_service_1.LockerService])
], LockerController);
//# sourceMappingURL=locker.controller.js.map