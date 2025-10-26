import fs from "fs";
import path from "path";

interface TextbookContent {
  fullText: string;
  totalPages: number;
  metadata: {
    title: string;
    author: string;
  };
}

let cachedContent: TextbookContent | null = null;

export async function extractTextbookContent(): Promise<TextbookContent> {
  if (cachedContent) {
    return cachedContent;
  }

  try {
    const { default: pdfParse } = await import("pdf-parse");
    
    const pdfPath = path.join(
      process.cwd(),
      "attached_assets",
      "Robert, G. et al. (2024). Trends and Issues in Instructional Design 1_1761520802485.pdf"
    );

    if (!fs.existsSync(pdfPath)) {
      throw new Error("Textbook PDF not found");
    }

    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);

    cachedContent = {
      fullText: data.text,
      totalPages: data.numpages,
      metadata: {
        title: "Trends and Issues in Instructional Design and Technology",
        author: "Reiser, Carr-Chellman, Dempsey",
      },
    };

    console.log(`✓ Extracted textbook: ${cachedContent.totalPages} pages, ${Math.round(data.text.length / 1000)}k characters`);
    
    return cachedContent;
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error("Failed to extract textbook content");
  }
}

export async function getRelevantContext(query: string): Promise<{
  context: string;
  pages: number[];
}> {
  const content = await extractTextbookContent();
  
  const queryLower = query.toLowerCase();
  const keywords = extractKeywords(queryLower);
  
  const chunkSize = 3000;
  const chunks: Array<{text: string; startPos: number}> = [];
  
  for (let i = 0; i < content.fullText.length; i += chunkSize) {
    chunks.push({
      text: content.fullText.substring(i, i + chunkSize),
      startPos: i,
    });
  }
  
  const scoredChunks = chunks.map((chunk, index) => {
    const chunkLower = chunk.text.toLowerCase();
    let score = 0;
    
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      const matches = chunkLower.match(regex);
      if (matches) {
        score += matches.length * (keyword.length > 4 ? 3 : 1);
      }
    }
    
    const contextBonus = calculateContextBonus(chunkLower);
    score += contextBonus;
    
    const estimatedPage = Math.floor((chunk.startPos / content.fullText.length) * content.totalPages) + 1;
    
    return { ...chunk, score, estimatedPage };
  });
  
  scoredChunks.sort((a, b) => b.score - a.score);
  
  const topChunks = scoredChunks.filter(c => c.score > 0).slice(0, 10);
  
  const estimatedPages = topChunks.map(c => c.estimatedPage);
  const uniquePages = [...new Set(estimatedPages)].sort((a, b) => a - b);
  
  const contextParts = topChunks.slice(0, 8).map(
    (chunk, idx) =>
      `[Page ~${chunk.estimatedPage}]\n${chunk.text.substring(0, 2000)}`
  );
  
  const context = contextParts.join("\n\n---\n\n");
  
  return {
    context,
    pages: uniquePages.slice(0, 10),
  };
}

function extractKeywords(query: string): string[] {
  const stopWords = new Set([
    "what", "is", "the", "a", "an", "are", "how", "why", "when", "where",
    "who", "which", "can", "you", "tell", "me", "about", "explain", "describe",
    "of", "in", "to", "for", "and", "or", "but", "on", "at", "by", "with",
    "this", "that", "these", "those", "from", "do", "does"
  ]);
  
  const words = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
  
  return [...new Set(words)];
}

function calculateContextBonus(text: string): number {
  const importantTerms = [
    "instructional design", "learning theory", "addie", "constructivism",
    "evaluation", "performance", "technology", "assessment", "motivation",
    "cognitive", "behavioral", "chapter", "section", "model", "framework",
    "definition", "summary", "principles", "theory", "practice"
  ];
  
  let bonus = 0;
  for (const term of importantTerms) {
    if (text.includes(term.toLowerCase())) {
      bonus += 2;
    }
  }
  
  if (text.includes("chapter") || text.includes("section")) {
    bonus += 3;
  }
  
  return bonus;
}
