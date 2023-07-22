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
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const logs_entity_1 = require("../logs/logs.entity");
const db_helper_1 = require("../utils/db.helper");
const roles_entity_1 = require("../roles/roles.entity");
const argon2 = require("argon2");
let UserService = class UserService {
    constructor(userRepository, logsRepository, rolesRepository) {
        this.userRepository = userRepository;
        this.logsRepository = logsRepository;
        this.rolesRepository = rolesRepository;
    }
    findAll(query) {
        const { page, limit, username, gender, role } = query;
        const take = limit || 10;
        const skip = ((page || 1) - 1) * take;
        const selectQuery = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.profile', 'profile')
            .leftJoinAndSelect('user.roles', 'roles');
        const selectAndWhereQuery = (0, db_helper_1.conditionUtils)(selectQuery, {
            'user.username': username,
            'profile.gender': gender,
            'roles.id': role
        });
        const queryBuilder = selectAndWhereQuery.take(take).skip(skip).getMany();
        return queryBuilder;
    }
    find(username) {
        return this.userRepository.findOne({
            where: { username },
            relations: ['roles', 'roles.menus']
        });
    }
    findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async create(user) {
        if (!user.roles) {
            const role = await this.rolesRepository.findOne({
                where: { id: 2 }
            });
            user.roles = [role];
        }
        if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
            user.roles = await this.rolesRepository.find({
                where: {
                    id: (0, typeorm_2.In)(user.roles)
                }
            });
        }
        const userTmp = this.userRepository.create(user);
        userTmp.password = await argon2.hash(userTmp.password);
        return this.userRepository.save(userTmp);
    }
    async update(id, user) {
        if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
            user.roles = await this.rolesRepository.find({
                where: {
                    id: (0, typeorm_2.In)(user.roles)
                }
            });
        }
        const userTemp = await this.findProfile(id);
        const userWithProfile = this.userRepository.merge(userTemp, user);
        return this.userRepository.save(userWithProfile);
    }
    async remove(id) {
        const user = await this.findOne(id);
        return this.userRepository.remove(user);
    }
    findProfile(id) {
        return this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                profile: true
            }
        });
    }
    async findUserLogs(id) {
    }
    findLogsByGroup(id) {
        return (this.logsRepository
            .createQueryBuilder('logs')
            .select('logs.result', 'result')
            .addSelect('COUNT("logs.result")', 'count')
            .leftJoinAndSelect('logs.user', 'user')
            .where('user.id = :id', { id })
            .groupBy('logs.result')
            .orderBy('count', 'DESC')
            .addOrderBy('result', 'DESC')
            .offset(2)
            .limit(3)
            .getRawMany());
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(logs_entity_1.Logs)),
    __param(2, (0, typeorm_1.InjectRepository)(roles_entity_1.Roles)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map