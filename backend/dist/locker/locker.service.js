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
exports.LockerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const locker_entity_1 = require("./entities/locker.entity");
const typeorm_2 = require("typeorm");
const lockergroup_entity_1 = require("../lockergroup/entities/lockergroup.entity");
let LockerService = class LockerService {
    lockerRepository;
    lockerGroupRepository;
    constructor(lockerRepository, lockerGroupRepository) {
        this.lockerRepository = lockerRepository;
        this.lockerGroupRepository = lockerGroupRepository;
    }
    async create(createLockerDto) {
        const lockerGroup = await this.lockerGroupRepository.findOne({ where: { id: createLockerDto.group.id } });
        if (!lockerGroup)
            throw new common_1.NotFoundException("Locker group not found!");
        const locker = this.lockerRepository.create({
            serial: createLockerDto.serial,
            group: lockerGroup,
            x: createLockerDto.x,
            y: createLockerDto.y,
            status: createLockerDto.status,
            locked: createLockerDto.locked,
        });
        return this.lockerRepository.save(locker);
    }
    async findAll() {
        return this.lockerRepository.find({ relations: ['user'] });
    }
    findByLockerGroup(lockerGroupId) {
        return `This action returns lockers for locker group #${lockerGroupId}`;
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
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(locker_entity_1.Locker)),
    __param(1, (0, typeorm_1.InjectRepository)(lockergroup_entity_1.LockerGroup)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LockerService);
//# sourceMappingURL=locker.service.js.map