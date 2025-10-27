import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ChatMessage, ChatSession } from "@shared/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeTimestamp(timestamp: string | Date): Date {
  return timestamp instanceof Date ? timestamp : new Date(timestamp);
}

export function normalizeChatMessage(message: any): ChatMessage {
  return {
    ...message,
    timestamp: normalizeTimestamp(message.timestamp),
  };
}

export function normalizeChatSession(session: any): ChatSession {
  return {
    ...session,
    messages: session.messages.map(normalizeChatMessage),
    createdAt: normalizeTimestamp(session.createdAt),
    updatedAt: normalizeTimestamp(session.updatedAt),
  };
}
