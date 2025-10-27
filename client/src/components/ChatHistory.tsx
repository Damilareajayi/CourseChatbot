import { MessageSquare, Plus, Trash2, Clock } from "lucide-react";
import { ChatSession } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatHistoryProps {
  sessions: ChatSession[];
  currentSessionId?: string;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
}

export function ChatHistory({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
}: ChatHistoryProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <Button
          onClick={onNewChat}
          className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
          data-testid="button-new-chat"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="px-3 py-2 border-b border-sidebar-border">
        <h2 className="text-sm font-semibold text-sidebar-foreground flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Chat History
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-sm text-sidebar-foreground/60">
              No chat history yet
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "group relative rounded-lg transition-colors",
                  currentSessionId === session.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                )}
              >
                <button
                  onClick={() => onSelectSession(session.id)}
                  className="w-full text-left p-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
                  data-testid={`button-session-${session.id}`}
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {session.title}
                      </p>
                      <p className="text-xs opacity-70 mt-0.5">
                        {formatDate(session.updatedAt)} • {session.messages.length} messages
                      </p>
                    </div>
                  </div>
                </button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2.5 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  data-testid={`button-delete-session-${session.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
