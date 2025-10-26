import { BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

const suggestedPrompts = [
  "What is instructional design?",
  "Explain constructivist learning theory",
  "What are the phases of the ADDIE model?",
  "Tell me about performance improvement in IDT",
  "What is the history of instructional design?",
  "Explain the learning sciences",
];

export function WelcomeScreen({ onPromptClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-12 animate-in fade-in-50 duration-700">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="relative bg-primary/10 p-6 rounded-full">
              <BookOpen className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Welcome to EME 5608
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold text-primary">
            Course Assistant
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ask me anything about{" "}
            <span className="font-medium text-foreground">
              Trends and Issues in Instructional Design and Technology
            </span>
            . I'll provide answers with specific page references from your textbook.
          </p>
        </div>

        <div className="pt-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-secondary" />
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Try asking about
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {suggestedPrompts.map((prompt, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="h-auto p-4 text-left justify-start hover:bg-accent hover:border-primary/30 transition-all duration-200 group"
                onClick={() => onPromptClick(prompt)}
                data-testid={`prompt-${idx}`}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="mt-0.5 text-primary/60 group-hover:text-primary transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-foreground flex-1">{prompt}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 max-w-xl mx-auto">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Course:</span> EME 5608 - Trends and Issues in Instructional Design and Technology
            <br />
            <span className="font-medium text-foreground">Instructor:</span> Dr. Songhee Han
          </p>
        </div>
      </div>
    </div>
  );
}
