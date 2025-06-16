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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const messages_service_1 = require("./messages.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const message_response_dto_1 = require("./dto/message-response.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../users/decorators/get-user.decorator");
let MessagesController = class MessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    findAll(user) {
        const messages = this.messagesService.findAll(user.id);
        return messages.map(message => ({
            id: message.id,
            content: message.content,
            senderId: message.senderId,
            senderName: message.senderName,
            recipientId: message.recipientId,
            recipientName: message.recipientName,
            createdAt: message.createdAt,
            isRead: message.isRead,
        }));
    }
    findOne(id, user) {
        const message = this.messagesService.findById(id, user.id);
        return {
            id: message.id,
            content: message.content,
            senderId: message.senderId,
            senderName: message.senderName,
            recipientId: message.recipientId,
            recipientName: message.recipientName,
            createdAt: message.createdAt,
            isRead: message.isRead,
        };
    }
    create(createMessageDto, user) {
        const message = this.messagesService.create(createMessageDto, user.id, user.name);
        return {
            id: message.id,
            content: message.content,
            senderId: message.senderId,
            senderName: message.senderName,
            recipientId: message.recipientId,
            recipientName: message.recipientName,
            createdAt: message.createdAt,
            isRead: message.isRead,
        };
    }
    markAsRead(id, user) {
        const message = this.messagesService.markAsRead(id, user.id);
        return {
            id: message.id,
            content: message.content,
            senderId: message.senderId,
            senderName: message.senderName,
            recipientId: message.recipientId,
            recipientName: message.recipientName,
            createdAt: message.createdAt,
            isRead: message.isRead,
        };
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all messages for the current user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Messages retrieved successfully',
        type: [message_response_dto_1.MessageResponseDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], MessagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific message' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Message retrieved successfully',
        type: message_response_dto_1.MessageResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Access denied to this message',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Message not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", message_response_dto_1.MessageResponseDto)
], MessagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Send a new message' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Message created successfully',
        type: message_response_dto_1.MessageResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid input',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", message_response_dto_1.MessageResponseDto)
], MessagesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a message as read' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Message marked as read successfully',
        type: message_response_dto_1.MessageResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Only the recipient can mark a message as read',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Message not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", message_response_dto_1.MessageResponseDto)
], MessagesController.prototype, "markAsRead", null);
exports.MessagesController = MessagesController = __decorate([
    (0, swagger_1.ApiTags)('Messages'),
    (0, common_1.Controller)('messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map