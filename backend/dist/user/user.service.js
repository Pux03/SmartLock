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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("../company/entities/company.entity");
const locker_entity_1 = require("../locker/entities/locker.entity");
let UserService = class UserService {
    userRepository;
    companyRepository;
    lockerRepository;
    constructor(userRepository, companyRepository, lockerRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.lockerRepository = lockerRepository;
    }
    async create(createUserDto) {
        const user = this.userRepository.create(createUserDto);
        if (createUserDto.companyId) {
            const company = await this.companyRepository.findOne({ where: { id: createUserDto.companyId } });
            if (!company)
                throw new common_1.NotFoundException(`Company ${createUserDto.companyId} not found`);
            user.company = company;
        }
        if (createUserDto.lockerId) {
            const locker = await this.lockerRepository.findOne({ where: { id: createUserDto.lockerId } });
            user.locker = locker;
        }
        return this.userRepository.save(user);
    }
    findByEmail(email) {
        return this.userRepository.findOne({
            where: { email },
            relations: ['company', 'locker']
        });
    }
    findAll() {
        return this.userRepository.find();
    }
    findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async assignLockerToUser(userId, lockerId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const locker = await this.lockerRepository.findOne({ where: { id: lockerId } });
        if (!user || !locker) {
            throw new Error('User or Locker not found');
        }
        locker.user = user;
        await this.lockerRepository.save(locker);
        return locker;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(2, (0, typeorm_1.InjectRepository)(locker_entity_1.Locker)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map