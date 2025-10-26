import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateChatResponse(
  userMessage: string,
  textbookContext: string,
  availablePages: number[]
): Promise<{ message: string; pageReferences: string[] }> {
  try {
    const pageList = availablePages.length > 0
      ? `Available pages in context: ${availablePages.join(", ")}`
      : "";

    const systemPrompt = `You are an expert teaching assistant for EME 5608: Trends and Issues in Instructional Design and Technology, taught by Dr. Songhee Han.
Your role is to help students understand concepts from their textbook by providing clear, accurate answers.

CRITICAL PAGE REFERENCE INSTRUCTIONS:
1. You have been provided textbook content with explicit page numbers marked as [Page X]
2. When you reference information, YOU MUST cite the specific page numbers where that information appears
3. Use ONLY the page numbers that are explicitly shown in the context provided to you
4. Format page citations like this at the END of your response: [Pages: 15, 41, 112] or [Pages: 45-47, 83]
5. If information spans multiple pages, list all relevant pages
6. ${pageList}

ANSWER GUIDELINES:
- Answer questions based ONLY on the textbook content provided
- Be conversational and educational, like a helpful professor
- Keep responses concise but informative (2-4 paragraphs typically)
- Use exact terminology from the textbook when discussing concepts
- If the question cannot be fully answered from the provided context, acknowledge this and provide what information is available
- Always end with page citations in the specified format

Textbook Context (with page markers):
${textbookContext}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
      contents: userMessage,
    });

    const rawResponse = response.text || "";
    
    let pageReferences = extractPageReferences(rawResponse);
    
    if (pageReferences.length === 0 && availablePages.length > 0) {
      const topPages = availablePages.slice(0, 3);
      pageReferences = topPages.map(p => `Page ${p}`);
    }
    
    const cleanedMessage = rawResponse
      .replace(/\[Pages?:.*?\]/gi, "")
      .trim();

    return {
      message: cleanedMessage,
      pageReferences,
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
}

function extractPageReferences(text: string): string[] {
  const pageRefs: string[] = [];
  
  const pagePattern = /\[Pages?:\s*([^\]]+)\]/gi;
  const matches = text.matchAll(pagePattern);
  
  for (const match of matches) {
    const pagesText = match[1];
    
    const parts = pagesText.split(/[,;]/);
    
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed) {
        if (trimmed.includes("-")) {
          const rangeMatch = trimmed.match(/(\d+)\s*-\s*(\d+)/);
          if (rangeMatch) {
            pageRefs.push(`Pages ${rangeMatch[1]}-${rangeMatch[2]}`);
          }
        } else {
          const pageNum = trimmed.match(/\d+/);
          if (pageNum) {
            pageRefs.push(`Page ${pageNum[0]}`);
          }
        }
      }
    }
  }
  
  return pageRefs;
}
