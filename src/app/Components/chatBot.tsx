"use client";

import type React from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Chatbot() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat<UIMessage>({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex flex-col h-[600px] bg-background border border-border rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/50">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            AI Portfolio Assistant
          </h3>
          <p className="text-xs text-muted-foreground">
            Ask me anything about the portfolio owner
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">
                Welcome to the AI Assistant
              </h4>
              <p className="text-sm text-muted-foreground max-w-sm">
                I use advanced intent classification, knowledge base retrieval,
                and gatekeeping to answer questions about the portfolio owner.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput("What are your technical skills?");
                }}
              >
                Technical Skills
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput("Tell me about your projects");
                }}
              >
                Projects
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput("What are your achievements?");
                }}
              >
                Achievements
              </Button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}

            <div
              className={cn(
                "rounded-lg px-4 py-2 max-w-[80%]",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              )}
            >
              {message.parts.map((part, index) => {
                if (part.type === "text") {
                  return (
                    <p
                      key={index}
                      className="text-sm leading-relaxed whitespace-pre-wrap"
                    >
                      {part.text}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {message.role === "user" && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary flex-shrink-0">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}

        {
          <div className="flex gap-3 justify-start">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="rounded-lg px-4 py-2 bg-muted">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        }

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about the portfolio owner..."
            className="flex-1 px-4 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
