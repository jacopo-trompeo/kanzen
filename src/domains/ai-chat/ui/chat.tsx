import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import { Send, StopCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/domains/shared/components/ui/button";
import { Input } from "@/domains/shared/components/ui/input";
import { useAutoscroll } from "@/domains/shared/hooks/use-autoscroll";
import { useAiChatSettings } from "../hooks/use-ai-chat-settings";
import { ChatSettings } from "./chat-settings";
import { Message } from "./message";

export function Chat() {
  const { settings } = useAiChatSettings();
  const [input, setInput] = useState("");

  const { messages, sendMessage, isLoading, stop } = useChat({
    connection: fetchServerSentEvents("api/chat", {
      body: {
        apiKey: settings?.apiKey,
        systemPrompt: settings?.systemPrompt,
        model: settings?.model,
      },
    }),
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const { scrollContainerRef, scrollToBottom } = useAutoscroll({
    stickyScrollThreshold: 100,
  });

  const hasMessages = messages.length > 0;

  const inputForm = (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
          sendMessage(input.trim());
          setInput("");
          setTimeout(() => {
            scrollToBottom();
          }, 0);
        }
      }}
      className="mx-auto flex w-full max-w-4xl gap-3 px-4"
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          isLoading ? "Generating explaination..." : "Ask a question!"
        }
        className="flex-1"
        disabled={isLoading}
      />

      <ChatSettings />

      {isLoading ? (
        <Button type="button" variant="destructive" onClick={stop}>
          <StopCircle className="mr-2 h-4 w-4" /> Stop
        </Button>
      ) : (
        <Button type="submit" disabled={false}>
          <Send className="h-4 w-4" />
        </Button>
      )}
    </form>
  );

  return (
    <div className="flex h-screen w-full flex-col">
      {hasMessages ? (
        <>
          <div
            className="flex-1 overflow-y-auto [scrollbar-gutter:stable]"
            ref={scrollContainerRef}
          >
            <div className="mx-auto flex w-4xl flex-col gap-5 py-8">
              {messages.map((message) => (
                <Message
                  message={message}
                  key={message.id}
                  className={
                    message.role === "user" ? "justify-end" : "justify-start"
                  }
                />
              ))}
            </div>
          </div>
          <div className="border-t bg-background py-4">{inputForm}</div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="w-4xl">{inputForm}</div>
        </div>
      )}
    </div>
  );
}
