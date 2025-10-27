import { type User, type InsertUser, type ChatSession, type ChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createSession(title?: string): Promise<ChatSession>;
  getSession(id: string): Promise<ChatSession | undefined>;
  getAllSessions(): Promise<ChatSession[]>;
  addMessageToSession(sessionId: string, message: ChatMessage): Promise<void>;
  deleteSession(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private sessions: Map<string, ChatSession>;

  constructor() {
    this.users = new Map();
    this.sessions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSession(title?: string): Promise<ChatSession> {
    const id = randomUUID();
    const now = new Date();
    const session: ChatSession = {
      id,
      title: title || "New Chat",
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
    this.sessions.set(id, session);
    return session;
  }

  async getSession(id: string): Promise<ChatSession | undefined> {
    return this.sessions.get(id);
  }

  async getAllSessions(): Promise<ChatSession[]> {
    return Array.from(this.sessions.values()).sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  async addMessageToSession(sessionId: string, message: ChatMessage): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }
    session.messages.push(message);
    session.updatedAt = new Date();
    
    if (session.title === "New Chat" && session.messages.length === 2) {
      const firstUserMessage = session.messages.find(m => m.role === "user");
      if (firstUserMessage) {
        session.title = firstUserMessage.content.substring(0, 50) + (firstUserMessage.content.length > 50 ? "..." : "");
      }
    }
  }

  async deleteSession(id: string): Promise<boolean> {
    return this.sessions.delete(id);
  }
}

export const storage = new MemStorage();
