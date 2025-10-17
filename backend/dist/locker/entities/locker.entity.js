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
exports.Locker = exports.LockedState = exports.LockerStatus = void 0;
const typeorm_1 = require("typeorm");
const lockergroup_entity_1 = require("../../lockergroup/entities/lockergroup.entity");
const user_entity_1 = require("../../user/entities/user.entity");
var LockerStatus;
(function (LockerStatus) {
    LockerStatus["FREE"] = "FREE";
    LockerStatus["OCCUPIED"] = "OCCUPIED";
})(LockerStatus || (exports.LockerStatus = LockerStatus = {}));
var LockedState;
(function (LockedState) {
    LockedState["LOCKED"] = "LOCKED";
    LockedState["UNLOCKED"] = "UNLOCKED";
})(LockedState || (exports.LockedState = LockedState = {}));
let Locker = class Locker {
    id;
    serial;
    group;
    x;
    y;
    status;
    locked;
    user;
};
exports.Locker = Locker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Locker.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Locker.prototype, "serial", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lockergroup_entity_1.LockerGroup, (group) => group.lockers, { onDelete: 'CASCADE' }),
    __metadata("design:type", lockergroup_entity_1.LockerGroup)
], Locker.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Locker.prototype, "x", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Locker.prototype, "y", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: LockerStatus, default: LockerStatus.FREE }),
    __metadata("design:type", String)
], Locker.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: LockedState, default: LockedState.LOCKED }),
    __metadata("design:type", String)
], Locker.prototype, "locked", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.locker, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Locker.prototype, "user", void 0);
exports.Locker = Locker = __decorate([
    (0, typeorm_1.Entity)()
], Locker);
//# sourceMappingURL=locker.entity.js.map