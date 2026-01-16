import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import { RefreshCw, Send, Settings, StopCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/domains/shared/components/ui/button";
import { Input } from "@/domains/shared/components/ui/input";
import { Label } from "@/domains/shared/components/ui/label";
import { ScrollArea } from "@/domains/shared/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/domains/shared/components/ui/sheet";
import { Textarea } from "@/domains/shared/components/ui/textarea";
import { DEFAULT_SYSTEM_PROMPT } from "../types/constants";
import { Message } from "./message";

export function Chat() {
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [openSettings, setOpenSettings] = useState(false);

  const { messages, sendMessage, isLoading, stop, reload } = useChat({
    connection: fetchServerSentEvents("api/chat", {
      body: {
        apiKey,
        systemPrompt,
      },
    }),
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const scrollContainerRef = useAutoscroll(messages);

  const hasMessages = messages.length > 0;

  const inputForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
          sendMessage(input.trim());
          setInput("");
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
          <div className="mt-auto border-t bg-background py-4">{inputForm}</div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="w-4xl">{inputForm}</div>
        </div>
      )}
    </div>
  );
}
