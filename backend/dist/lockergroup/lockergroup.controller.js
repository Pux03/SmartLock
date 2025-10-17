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
exports.LockergroupController = void 0;
const common_1 = require("@nestjs/common");
const lockergroup_service_1 = require("./lockergroup.service");
const create_lockergroup_dto_1 = require("./dto/create-lockergroup.dto");
const update_lockergroup_dto_1 = require("./dto/update-lockergroup.dto");
let LockergroupController = class LockergroupController {
    lockergroupService;
    constructor(lockergroupService) {
        this.lockergroupService = lockergroupService;
    }
    create(createLockergroupDto) {
        return this.lockergroupService.create(createLockergroupDto);
    }
    findAll() {
        return this.lockergroupService.findAll();
    }
    findOne(id) {
        return this.lockergroupService.findOne(+id);
    }
    update(id, updateLockergroupDto) {
        return this.lockergroupService.update(+id, updateLockergroupDto);
    }
    remove(id) {
        return this.lockergroupService.remove(+id);
    }
};
exports.LockergroupController = LockergroupController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lockergroup_dto_1.CreateLockergroupDto]),
    __metadata("design:returntype", void 0)
], LockergroupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LockergroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LockergroupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lockergroup_dto_1.UpdateLockergroupDto]),
    __metadata("design:returntype", void 0)
], LockergroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LockergroupController.prototype, "remove", null);
exports.LockergroupController = LockergroupController = __decorate([
    (0, common_1.Controller)('lockergroup'),
    __metadata("design:paramtypes", [lockergroup_service_1.LockergroupService])
], LockergroupController);
//# sourceMappingURL=lockergroup.controller.js.map