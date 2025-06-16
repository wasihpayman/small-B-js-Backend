"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
let MessagesService = class MessagesService {
    constructor() {
        this.messages = [
            {
                id: '1',
                content: 'Welcome to the company messaging system!',
                senderId: '1',
                senderName: 'System Admin',
                recipientId: '2',
                recipientName: 'Jane Smith',
                createdAt: new Date('2024-01-15T09:00:00.000Z'),
                isRead: false,
            },
            {
                id: '2',
                content: 'Thank you for the welcome message!',
                senderId: '2',
                senderName: 'Jane Smith',
                recipientId: '1',
                recipientName: 'System Admin',
                createdAt: new Date('2024-01-15T09:15:00.000Z'),
                isRead: true,
            },
        ];
        this.nextId = 3;
    }
    findAll(userId) {
        return this.messages.filter(message => message.senderId === userId || message.recipientId === userId);
    }
    findById(id, userId) {
        const message = this.messages.find(msg => msg.id === id);
        if (!message) {
            throw new common_1.NotFoundException('Message not found');
        }
        if (message.senderId !== userId && message.recipientId !== userId) {
            throw new common_1.ForbiddenException('Access denied to this message');
        }
        return message;
    }
    create(createMessageDto, senderId, senderName) {
        const message = {
            id: this.nextId.toString(),
            content: createMessageDto.content,
            senderId,
            senderName,
            recipientId: createMessageDto.recipientId,
            recipientName: createMessageDto.recipientName || 'Unknown User',
            createdAt: new Date(),
            isRead: false,
        };
        this.messages.push(message);
        this.nextId++;
        return message;
    }
    markAsRead(id, userId) {
        const message = this.findById(id, userId);
        if (message.recipientId !== userId) {
            throw new common_1.ForbiddenException('Only the recipient can mark a message as read');
        }
        message.isRead = true;
        return message;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)()
], MessagesService);
//# sourceMappingURL=messages.service.js.map