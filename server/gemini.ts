import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateChatResponse(
  userMessage: string,
  textbookContext: string
): Promise<{ message: string; pageReferences: string[] }> {
  try {
    const systemPrompt = `You are an expert teaching assistant for EME 5608: Trends and Issues in Instructional Design and Technology. 
Your role is to help students understand concepts from their textbook by providing clear, accurate answers.

IMPORTANT INSTRUCTIONS:
1. Answer questions based ONLY on the textbook content provided in the context
2. Be conversational and educational, like a helpful professor
3. ALWAYS identify and cite specific page numbers where the information can be found
4. If you reference multiple topics, provide page numbers for each
5. If the question is not covered in the textbook content, politely say so and suggest related topics that are covered
6. Keep responses concise but informative (2-4 paragraphs typically)
7. Use the exact terminology from the textbook when discussing concepts

FORMAT FOR PAGE REFERENCES:
- At the end of your response, list page numbers in this format: [Pages: 15, 41-43, 112]
- Use this exact format so the system can extract the references automatically

Textbook Context:
${textbookContext}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: userMessage,
    });

    const rawResponse = response.text || "";
    
    const pageReferences = extractPageReferences(rawResponse);
    
    const cleanedMessage = rawResponse.replace(/\[Pages?:.*?\]/gi, "").trim();

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
          pageRefs.push(`Pages ${trimmed}`);
        } else {
          pageRefs.push(`Page ${trimmed}`);
        }
      }
    }
  }
  
  return pageRefs;
}
