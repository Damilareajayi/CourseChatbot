import type { Express } from "express";
import { createServer, type Server } from "http";
import { chatRequestSchema, createSessionSchema, type ChatMessage } from "@shared/schema";
import { generateChatResponse } from "./gemini";
import { getRelevantContext } from "./pdfExtractor";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/sessions", async (req, res) => {
    try {
      const validatedData = createSessionSchema.parse(req.body);
      const session = await storage.createSession(validatedData.title);
      res.json(session);
    } catch (error) {
      console.error("Create session error:", error);
      res.status(500).json({ error: "Failed to create session" });
    }
  });

  app.get("/api/sessions", async (req, res) => {
    try {
      const sessions = await storage.getAllSessions();
      res.json(sessions);
    } catch (error) {
      console.error("Get sessions error:", error);
      res.status(500).json({ error: "Failed to get sessions" });
    }
  });

  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        res.status(404).json({ error: "Session not found" });
        return;
      }
      res.json(session);
    } catch (error) {
      console.error("Get session error:", error);
      res.status(500).json({ error: "Failed to get session" });
    }
  });

  app.delete("/api/sessions/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSession(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: "Session not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete session error:", error);
      res.status(500).json({ error: "Failed to delete session" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = chatRequestSchema.parse(req.body);
      const { message, sessionId } = validatedData;

      let currentSessionId = sessionId;
      if (!currentSessionId) {
        const newSession = await storage.createSession();
        currentSessionId = newSession.id;
      }

      const session = await storage.getSession(currentSessionId);
      if (!session) {
        res.status(404).json({ error: "Session not found" });
        return;
      }

      console.log(`Processing question: ${message.substring(0, 100)}...`);

      const userMessage: ChatMessage = {
        id: Date.now().toString() + "-user",
        role: "user",
        content: message,
        timestamp: new Date(),
      };
      await storage.addMessageToSession(currentSessionId, userMessage);

      const { context, pages } = await getRelevantContext(message);

      console.log(`Found ${pages.length} relevant pages: ${pages.slice(0, 5).join(", ")}${pages.length > 5 ? "..." : ""}`);

      const aiResponse = await generateChatResponse(message, context, pages);

      const assistantMessage: ChatMessage = {
        id: Date.now().toString() + "-assistant",
        role: "assistant",
        content: aiResponse.message,
        pageReferences: aiResponse.pageReferences,
        timestamp: new Date(),
      };
      await storage.addMessageToSession(currentSessionId, assistantMessage);

      console.log(`Generated response with ${aiResponse.pageReferences.length} page references`);

      res.json({
        ...aiResponse,
        sessionId: currentSessionId,
      });
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
