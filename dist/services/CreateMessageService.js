"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const app_1 = require("../app");
class CreateMessageService {
    async execute(text, user_id) {
        const message = await prisma_1.default.message.create({
            data: {
                text,
                user_id
            },
            include: {
                user: true
            }
        });
        const infoWS = {
            text: message.text,
            id: message.id,
            created_at: message.created_at,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url
            }
        };
        app_1.io.emit("new_message", infoWS);
        return infoWS;
    }
}
exports.CreateMessageService = CreateMessageService;
