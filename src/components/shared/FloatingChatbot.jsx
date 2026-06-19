import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import { useState } from "react";
import { events } from "../../data/mockEvents";
import { chatbotSeed } from "../../data/mockUsers";

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: "1", sender: "bot", text: chatbotSeed.greeting, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");

  const ask = (text = input) => {
    if (!text.trim()) return;
    const userMessage = { id: crypto.randomUUID(), sender: "user", text, timestamp: new Date() };
    setMessages((items) => [...items, userMessage]);
    setInput("");
    setTimeout(
      () =>
        setMessages((items) => [
          ...items,
          { id: crypto.randomUUID(), sender: "bot", text: responseFor(text), timestamp: new Date() },
        ]),
      500
    );
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-[60] md:bg-transparent md:pointer-events-none"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="fixed bottom-20 md:bottom-6 right-4 z-[70] flex flex-col items-end gap-3">
        {open && (
          <div className="w-[min(100vw-2rem,380px)] h-[min(70vh,520px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto animate-in fade-in-0 zoom-in-95">
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-white/15 rounded-full grid place-items-center">
                <Bot className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sm">UniPulse AI Assistant</h2>
                <p className="text-xs text-primary-foreground/80 truncate">Event & club helper</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/15 grid place-items-center"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {messages.length === 1 && (
              <div className="p-3 border-b border-border shrink-0">
                <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                <div className="space-y-2">
                  {chatbotSeed.prompts.map((question) => (
                    <button
                      key={question}
                      onClick={() => ask(question)}
                      className="block w-full text-left p-2.5 bg-muted/50 rounded-lg border border-border text-sm hover:bg-muted transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full grid place-items-center shrink-0 ${
                      message.sender === "bot"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.sender === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line ${
                      message.sender === "bot"
                        ? "bg-muted border border-border"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border shrink-0">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && ask()}
                  className="flex-1 px-3 py-2.5 bg-background rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ask me anything..."
                />
                <button
                  onClick={() => ask()}
                  disabled={!input.trim()}
                  className="px-3 py-2.5 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((value) => !value)}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all grid place-items-center pointer-events-auto"
          aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        >
          {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
}

function responseFor(text) {
  if (text.toLowerCase().includes("tech")) {
    return `Here are upcoming tech events:\n\n${events
      .filter((event) => event.category === "Technology")
      .slice(0, 3)
      .map((event) => `- ${event.title}: ${event.date}, ${event.time}`)
      .join("\n")}\n\nWould you like to RSVP to one of these?`;
  }
  if (text.toLowerCase().includes("entrepreneur")) {
    return "Entrepreneurship Workshop is on May 26, 2026 at P19 - Conference Hall, recommended because you like Entrepreneurship.";
  }
  if (text.toLowerCase().includes("basketball")) {
    return "Basketball Tournament Finals is on May 25, 2026 at the Sports Complex.";
  }
  return "I found several events that may interest you. You can filter by category, date, faculty, or club in Discover Events.";
}
