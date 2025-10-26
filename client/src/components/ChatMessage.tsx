import { BookOpen } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const formattedTime = message.timestamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex w-full animate-in fade-in-50 slide-in-from-bottom-3 duration-500",
        isUser ? "justify-end" : "justify-start"
      )}
      data-testid={`message-${message.role}-${message.id}`}
    >
      <div
        className={cn(
          "max-w-[85%] lg:max-w-3xl space-y-2",
          isUser ? "ml-auto" : "mr-auto"
        )}
      >
        <div
          className={cn(
            "p-4 rounded-2xl shadow-sm transition-all hover:shadow-md",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-card border border-card-border rounded-bl-md"
          )}
        >
          <p
            className={cn(
              "text-base leading-relaxed whitespace-pre-wrap break-words",
              isUser ? "text-primary-foreground" : "text-card-foreground"
            )}
            data-testid={`text-content-${message.id}`}
          >
            {message.content}
          </p>

          {!isUser && message.pageReferences && message.pageReferences.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                {message.pageReferences.map((ref, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium transition-colors hover:bg-accent/80"
                    data-testid={`page-reference-${idx}`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{ref}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <p
          className={cn(
            "text-xs text-muted-foreground px-2",
            isUser ? "text-right" : "text-left"
          )}
          data-testid={`timestamp-${message.id}`}
        >
          {formattedTime}
        </p>
      </div>
    </div>
  );
}
