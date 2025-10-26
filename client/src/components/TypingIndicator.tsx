export function TypingIndicator() {
  return (
    <div className="flex justify-start w-full animate-in fade-in-50 slide-in-from-bottom-3 duration-300">
      <div className="max-w-[85%] lg:max-w-3xl mr-auto">
        <div className="p-4 rounded-2xl rounded-bl-md bg-card border border-card-border shadow-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
