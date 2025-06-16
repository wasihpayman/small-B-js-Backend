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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    getApiInfo() {
        return {
            name: 'Business Dashboard API',
            version: '1.0.0',
            description: 'A basic token-based login and internal messaging API',
            endpoints: {
                documentation: '/api',
                auth: '/auth/login',
                profile: '/users/me',
                messages: '/messages',
            },
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get API information' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'API information retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Business Dashboard API' },
                version: { type: 'string', example: '1.0.0' },
                description: { type: 'string', example: 'A basic token-based login and internal messaging API' },
                endpoints: {
                    type: 'object',
                    properties: {
                        documentation: { type: 'string', example: '/api' },
                        auth: { type: 'string', example: '/auth/login' },
                        profile: { type: 'string', example: '/users/me' },
                        messages: { type: 'string', example: '/messages' },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getApiInfo", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('API Info'),
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map