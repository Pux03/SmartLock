"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockerService = void 0;
const common_1 = require("@nestjs/common");
let LockerService = class LockerService {
    create(createLockerDto) {
        return 'This action adds a new locker';
    }
    findAll() {
        return `This action returns all locker`;
    }
    findOne(id) {
        return `This action returns a #${id} locker`;
    }
    update(id, updateLockerDto) {
        return `This action updates a #${id} locker`;
    }
    remove(id) {
        return `This action removes a #${id} locker`;
    }
};
exports.LockerService = LockerService;
exports.LockerService = LockerService = __decorate([
    (0, common_1.Injectable)()
], LockerService);
//# sourceMappingURL=locker.service.js.map