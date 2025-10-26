import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ChatMessage as ChatMessageType } from "@shared/schema";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { TypingIndicator } from "@/components/TypingIndicator";
import { CourseSidebar } from "@/components/CourseSidebar";
import { Menu, X, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message });
      return response;
    },
    onSuccess: (data) => {
      const assistantMessage: ChatMessageType = {
        id: Date.now().toString() + "-assistant",
        role: "assistant",
        content: data.message,
        pageReferences: data.pageReferences,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (message: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    chatMutation.mutate(message);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom("auto");
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, chatMutation.isPending]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && messages.length > 0);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [messages.length]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 lg:relative lg:z-0 transform transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <CourseSidebar />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                data-testid="button-menu"
              >
                {isSidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-foreground">
                  EME 5608 Course Assistant
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Trends & Issues in Instructional Design and Technology
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                <span className="text-xs font-medium text-secondary">
                  AI Powered
                </span>
              </div>
            </div>
          </div>
        </header>

        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto scroll-smooth"
        >
          {messages.length === 0 ? (
            <WelcomeScreen onPromptClick={handlePromptClick} />
          ) : (
            <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8 space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {chatMutation.isPending && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {showScrollButton && (
          <div className="absolute bottom-24 right-6 z-20">
            <Button
              size="icon"
              className="h-10 w-10 rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={() => scrollToBottom()}
              data-testid="button-scroll-to-bottom"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
        )}

        <ChatInput
          onSend={handleSendMessage}
          disabled={chatMutation.isPending}
        />
      </div>
    </div>
  );
}
