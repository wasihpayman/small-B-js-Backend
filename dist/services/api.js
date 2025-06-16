"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const API_BASE_URL = 'http://localhost:3000';
class ApiServiceClass {
    constructor() {
        this.token = null;
    }
    setToken(token) {
        this.token = token;
    }
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        const response = await fetch(url, {
            ...options,
            headers,
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Network error' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }
        return response.json();
    }
    async login(email) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }
    async getUserProfile() {
        return this.request('/users/me');
    }
    async getMessages() {
        return this.request('/messages');
    }
    async sendMessage(messageData) {
        return this.request('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData),
        });
    }
    async markMessageAsRead(messageId) {
        return this.request(`/messages/${messageId}/read`, {
            method: 'PATCH',
        });
    }
}
exports.ApiService = new ApiServiceClass();
//# sourceMappingURL=api.js.map