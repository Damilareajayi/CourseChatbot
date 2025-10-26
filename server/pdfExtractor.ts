import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

interface TextbookContent {
  fullText: string;
  pageCount: number;
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

  const pdfPath = path.join(
    process.cwd(),
    "attached_assets",
    "Robert, G. et al. (2024). Trends and Issues in Instructional Design 1_1761520802485.pdf"
  );

  if (!fs.existsSync(pdfPath)) {
    throw new Error("Textbook PDF not found");
  }

  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);

  cachedContent = {
    fullText: data.text,
    pageCount: data.numpages,
    metadata: {
      title: "Trends and Issues in Instructional Design and Technology",
      author: "Reiser, Carr-Chellman, Dempsey",
    },
  };

  console.log(`Extracted textbook: ${cachedContent.pageCount} pages`);
  
  return cachedContent;
}

export async function getRelevantContext(query: string): Promise<string> {
  const content = await extractTextbookContent();
  
  const chunkSize = 50000;
  const chunks: string[] = [];
  
  for (let i = 0; i < content.fullText.length; i += chunkSize) {
    chunks.push(content.fullText.substring(i, i + chunkSize));
  }
  
  const queryLower = query.toLowerCase();
  const keywords = extractKeywords(queryLower);
  
  const scoredChunks = chunks.map((chunk, index) => {
    const chunkLower = chunk.toLowerCase();
    let score = 0;
    
    for (const keyword of keywords) {
      const regex = new RegExp(keyword, "gi");
      const matches = chunkLower.match(regex);
      if (matches) {
        score += matches.length * keyword.length;
      }
    }
    
    return { chunk, score, index };
  });
  
  scoredChunks.sort((a, b) => b.score - a.score);
  
  const topChunks = scoredChunks.slice(0, 3);
  
  const relevantContext = topChunks
    .map((c) => c.chunk)
    .join("\n\n---\n\n")
    .substring(0, 100000);
  
  return relevantContext;
}

function extractKeywords(query: string): string[] {
  const stopWords = new Set([
    "what", "is", "the", "a", "an", "are", "how", "why", "when", "where",
    "who", "which", "can", "you", "tell", "me", "about", "explain", "describe",
    "of", "in", "to", "for", "and", "or", "but", "on", "at", "by", "with"
  ]);
  
  const words = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
  
  return [...new Set(words)];
}
