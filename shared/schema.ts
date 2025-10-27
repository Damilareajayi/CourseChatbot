import { z } from "zod";

export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  pageReferences: z.array(z.string()).optional(),
  timestamp: z.date(),
});

export const chatSessionSchema = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(chatMessageSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const chatSessionResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(chatMessageSchema.extend({
    timestamp: z.string().or(z.date()),
  })),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  sessionId: z.string().optional(),
});

export const chatResponseSchema = z.object({
  message: z.string(),
  pageReferences: z.array(z.string()).optional(),
  sessionId: z.string(),
});

export const createSessionSchema = z.object({
  title: z.string().optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatSession = z.infer<typeof chatSessionSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export type CreateSession = z.infer<typeof createSessionSchema>;
