import { z } from "zod";

export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  pageReferences: z.array(z.string()).optional(),
  timestamp: z.date(),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export const chatResponseSchema = z.object({
  message: z.string(),
  pageReferences: z.array(z.string()).optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
