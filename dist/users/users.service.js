"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [
            {
                id: '1',
                email: 'admin@company.com',
                name: 'System Admin',
                role: 'admin',
                createdAt: new Date(),
            },
            {
                id: '2',
                email: 'jane.smith@company.com',
                name: 'Jane Smith',
                role: 'user',
                createdAt: new Date(),
            },
        ];
        this.nextId = 3;
    }
    findAll() {
        return this.users;
    }
    findById(id) {
        return this.users.find(user => user.id === id);
    }
    findByEmail(email) {
        return this.users.find(user => user.email === email);
    }
    create(userData) {
        const user = {
            id: this.nextId.toString(),
            ...userData,
            createdAt: new Date(),
        };
        this.users.push(user);
        this.nextId++;
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map