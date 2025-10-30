"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const locker_status_1 = require("../common/enums/locker_status");
const bcrypt = __importStar(require("bcrypt"));
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
        if (createUserDto.password) {
            createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        }
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
    findByCompany(companyId) {
        return this.userRepository.find({
            where: {
                company: { id: companyId }
            },
            relations: ['company', 'locker', 'locker.group']
        });
    }
    findUsersWithoutLockers(companyId) {
        return this.userRepository.find({
            where: {
                company: { id: companyId },
                locker: (0, typeorm_2.IsNull)()
            },
            relations: ['company']
        });
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
        user.locker = locker;
        await this.userRepository.save(user);
        locker.status = locker_status_1.LockerStatus.OCCUPIED;
        await this.lockerRepository.save(locker);
        return user;
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