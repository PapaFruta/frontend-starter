import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { Send } from "express";

/**
 * Represents an individual chat message with its sender, content, and timestamp.
 */
interface ChatMessage {
    user: ObjectId;
    message: string;
    dateUpdated: Date;
}

interface SendMessageResponse {
    msg: string;
    chat: any; // You should replace `any` with the actual type of your chat data.
}


/**
 * Define the Chat document structure for MongoDB.
 */
export interface ChatDoc extends BaseDoc {
  user1: ObjectId;
  user2: ObjectId;
  /** Array of chat messages representing chat history */
  messages: ChatMessage[];
}

/**
 * Represents a chat concept with CRUD operations.
 */
export default class ChatConcept {
    /** Collection for chats in MongoDB */
    public readonly chats = new DocCollection<ChatDoc>("chats");

    /**
     * Initiates a chat between two users.
     * @param user1 - The first user's ObjectId.
     * @param user2 - The second user's ObjectId.
     * @param initialMessage - The initial message for the chat.
     * @returns An object with a message indicating success and the chat data.
     */
    async startChat(user1: ObjectId, user2: ObjectId) {
        if (await this.checkDuplicate(user1, user2)) {
            return { msg: "Chat already exists!", chat: await this.chats.readOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] }) };
        }
        
        const _id = await this.chats.createOne({
            user1,
            user2,
            messages: []
        });
        return { msg: "Chat started", chat: await this.chats.readOne({ _id }) };
    }

    /**
     * Sends a message in a chat between two users.
     * If the chat doesn't exist, it creates one.
     * @param user1 - The sender's ObjectId.
     * @param user2 - The receiver's ObjectId.
     * @param message - The message text.
     * @returns An object with a message indicating success and the updated chat data.
     */
    async sendMessage(user1: ObjectId, user2: ObjectId, message: string): Promise<SendMessageResponse> {
        const chat = await this.chats.readOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] });

        if (chat) {
            chat.messages.push({ user: user1, message: message, dateUpdated: new Date() });
            await this.chats.updateOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] }, chat);
            return { msg: "Message sent", chat: await this.chats.readOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] }) };
        } else {
            const response = await this.startChat(user1, user2);
            return await this.sendMessage(user1,user2,message);
        }
    }

    /**
     * Retrieves a chat between two users.
     * @param user1 - The first user's ObjectId.
     * @param user2 - The second user's ObjectId.
     * @returns An object with the chat data.
     * @throws An error if the chat does not exist.
     */
    async getChat(user1: ObjectId, user2: ObjectId) {
        const chat = await this.chats.readOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] });

        if (chat) {
            return { msg: 'Chat successfully retrieved', chat: chat };
        }

        throw new Error('This chat does not exist, please start one');
    }

    /**
     * Checks if a chat already exists between two users.
     * @param user1 - The first user's ObjectId.
     * @param user2 - The second user's ObjectId.
     * @returns A boolean indicating the presence of a chat.
     */
    async checkDuplicate(user1: ObjectId, user2: ObjectId) {
        const chat = await this.chats.readOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] });
        return !!chat;
    }
}
