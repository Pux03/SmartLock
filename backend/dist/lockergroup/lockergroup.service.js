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
exports.LockergroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lockergroup_entity_1 = require("./entities/lockergroup.entity");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("../company/entities/company.entity");
const locker_entity_1 = require("../locker/entities/locker.entity");
const user_entity_1 = require("../user/entities/user.entity");
let LockergroupService = class LockergroupService {
    lockerGroupRepository;
    companyRepository;
    lockerRepository;
    userRepository;
    constructor(lockerGroupRepository, companyRepository, lockerRepository, userRepository) {
        this.lockerGroupRepository = lockerGroupRepository;
        this.companyRepository = companyRepository;
        this.lockerRepository = lockerRepository;
        this.userRepository = userRepository;
    }
    async create(createLockergroupDto) {
        const company = await this.companyRepository.findOne({ where: { id: createLockergroupDto.company.id } });
        if (!company)
            throw new common_1.NotFoundException("Company not found!");
        const lockerGroup = this.lockerGroupRepository.create({
            name: createLockergroupDto.name,
            company: createLockergroupDto.company
        });
        return this.lockerGroupRepository.save(lockerGroup);
    }
    async findAll() {
        return this.lockerGroupRepository.find({ relations: ['company', 'lockers'] });
    }
    async findByCompany(companyId) {
        return this.lockerGroupRepository.find({
            where: {
                company: { id: companyId }
            },
            relations: ['company', 'lockers']
        });
    }
    async findOne(id) {
        const lg = await this.lockerGroupRepository.findOne({
            where: { id },
            relations: ['company', 'lockers']
        });
        if (!lg)
            throw new common_1.NotFoundException('Locker group not found');
        return lg;
    }
    update(id, updateLockergroupDto) {
        return `This action updates a #${id} lockergroup`;
    }
    async remove(id) {
        const lockerGroup = await this.lockerGroupRepository.findOne({
            where: { id },
            relations: ['lockers']
        });
        if (!lockerGroup) {
            throw new common_1.NotFoundException('Locker group not found');
        }
        if (lockerGroup.lockers && lockerGroup.lockers.length > 0) {
            const lockerIds = lockerGroup.lockers.map(locker => locker.id);
            const usersWithLockers = await this.userRepository.find({
                where: {
                    locker: { id: (0, typeorm_2.In)(lockerIds) }
                },
                relations: ['locker']
            });
            for (const user of usersWithLockers) {
                user.locker = null;
                await this.userRepository.save(user);
            }
            await this.lockerRepository.remove(lockerGroup.lockers);
        }
        await this.lockerGroupRepository.remove(lockerGroup);
    }
};
exports.LockergroupService = LockergroupService;
exports.LockergroupService = LockergroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lockergroup_entity_1.LockerGroup)),
    __param(1, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(2, (0, typeorm_1.InjectRepository)(locker_entity_1.Locker)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LockergroupService);
//# sourceMappingURL=lockergroup.service.js.map