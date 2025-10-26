import type { Express } from "express";
import { createServer, type Server } from "http";
import { chatRequestSchema } from "@shared/schema";
import { generateChatResponse } from "./gemini";
import { getRelevantContext } from "./pdfExtractor";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = chatRequestSchema.parse(req.body);
      const { message } = validatedData;

      const relevantContext = await getRelevantContext(message);

      const response = await generateChatResponse(message, relevantContext);

      res.json(response);
    } catch (error) {
      console.error("Chat API error:", error);
      
      if (error instanceof Error) {
        res.status(500).json({
          error: error.message || "Failed to process your question",
        });
      } else {
        res.status(500).json({
          error: "An unexpected error occurred",
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
