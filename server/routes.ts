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

      console.log(`Processing question: ${message.substring(0, 100)}...`);

      const { context, pages } = await getRelevantContext(message);

      console.log(`Found ${pages.length} relevant pages: ${pages.slice(0, 5).join(", ")}${pages.length > 5 ? "..." : ""}`);

      const response = await generateChatResponse(message, context, pages);

      console.log(`Generated response with ${response.pageReferences.length} page references`);

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
