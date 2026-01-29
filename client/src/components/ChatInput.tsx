import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        <div className="relative flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about instructional design, learning theories, evaluation..."
              className={cn(
                "min-h-[56px] max-h-32 resize-none rounded-2xl pr-24 py-4 text-base shadow-sm transition-all",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={disabled}
              data-testid="input-message"
            />

            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              {message.length > 0 && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 rounded-full hover:bg-muted transition-colors"
                  onClick={() => setMessage("")}
                  data-testid="button-clear"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}

              <Button
                type="button"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full shadow-md transition-all",
                  message.trim() && !disabled
                    ? "bg-primary hover:bg-primary/90 hover:shadow-lg hover:scale-105"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
                onClick={handleSubmit}
                disabled={!message.trim() || disabled}
                data-testid="button-send"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-2 px-2 space-y-1">
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-xs">Enter</kbd> to send,{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-xs">Shift + Enter</kbd> for new line
          </p>
          <p className="text-xs text-muted-foreground/80 italic" data-testid="text-disclaimer">
            This platform is built using Gemini API. AI can make mistakes, so double-check it.
          </p>
        </div>
      </div>
    </div>
  );
}
