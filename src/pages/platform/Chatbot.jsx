import { Bot, Send, User } from "lucide-react";
import { useState } from "react";
import { events } from "../../data/mockEvents";
import { chatbotSeed } from "../../data/mockUsers";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ id: "1", sender: "bot", text: chatbotSeed.greeting, timestamp: new Date() }]);
  const [input, setInput] = useState("");
  const ask = (text = input) => {
    if (!text.trim()) return;
    const userMessage = { id: crypto.randomUUID(), sender: "user", text, timestamp: new Date() };
    setMessages((items) => [...items, userMessage]);
    setInput("");
    setTimeout(() => setMessages((items) => [...items, { id: crypto.randomUUID(), sender: "bot", text: responseFor(text), timestamp: new Date() }]), 500);
  };
  return (
    <div className="max-w-screen-sm mx-auto min-h-[calc(100vh-65px)] flex flex-col">
      <div className="bg-card border-b border-border px-4 py-4 flex gap-3"><div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full text-white grid place-items-center"><Bot className="w-6 h-6" /></div><div><h1 className="font-semibold">UniPulse AI Assistant</h1><p className="text-xs text-muted-foreground">RAG-style event and club helper</p></div></div>
      {messages.length === 1 && <div className="p-4"><p className="text-sm text-muted-foreground mb-3">Try asking:</p>{chatbotSeed.prompts.map((question) => <button key={question} onClick={() => ask(question)} className="block w-full text-left p-3 bg-card rounded-lg border border-border mb-2">{question}</button>)}</div>}
      <div className="flex-1 p-4 space-y-4 mb-20">{messages.map((message) => <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}><div className={`w-8 h-8 rounded-full grid place-items-center ${message.sender === "bot" ? "bg-gradient-to-br from-primary to-secondary text-white" : "bg-muted"}`}>{message.sender === "bot" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}</div><div className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-line ${message.sender === "bot" ? "bg-card border border-border" : "bg-primary text-primary-foreground"}`}>{message.text}</div></div>)}</div>
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4"><div className="max-w-screen-sm mx-auto flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} className="flex-1 px-4 py-3 bg-background rounded-lg border border-border" placeholder="Ask me anything..." /><button onClick={() => ask()} disabled={!input.trim()} className="px-4 py-3 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"><Send className="w-5 h-5" /></button></div></div>
    </div>
  );
}
function responseFor(text) {
  if (text.toLowerCase().includes("tech")) return `Here are upcoming tech events:\n\n${events.filter((event) => event.category === "Technology").slice(0, 3).map((event) => `- ${event.title}: ${event.date}, ${event.time}`).join("\n")}\n\nWould you like to RSVP to one of these?`;
  if (text.toLowerCase().includes("entrepreneur")) return "Entrepreneurship Workshop is on May 26, 2026 at P19 - Conference Hall, recommended because you like Entrepreneurship.";
  if (text.toLowerCase().includes("basketball")) return "Basketball Tournament Finals is on May 25, 2026 at the Sports Complex.";
  return "I found several events that may interest you. You can filter by category, date, faculty, or club in Discover Events.";
}
