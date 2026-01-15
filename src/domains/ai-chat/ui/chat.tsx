import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import { RefreshCw, Send, Settings, StopCircle } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
import { cn } from "@/domains/shared/lib/utils";
import { DEFAULT_SYSTEM_PROMPT } from "../types/constants";

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
  console.log("Messages:", messages);

  return (
    <>
      <header>
        <Sheet open={openSettings} onOpenChange={setOpenSettings}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>AI Settings</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-6 px-5">
              <div className="space-y-2">
                <Label htmlFor="api-key">OpenAI API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-muted-foreground text-xs">
                  Required for the MVP. Not stored on server.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">System Persona</Label>
                <Textarea
                  id="prompt"
                  className="min-h-[200px] font-mono text-xs"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <ScrollArea>
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "mb-4",
              message.role === "assistant" ? "text-blue-600" : "text-gray-800",
            )}
          >
            <div>{message.role === "assistant" ? "🤖 AI:" : "🧑 User:"}</div>
            <div>
              {message.parts.map((part, idx) => {
                if (part.type === "thinking") {
                  return (
                    <div
                      key={idx}
                      className="mb-2 text-gray-500 text-sm italic"
                    >
                      💭 Thinking: {part.content}
                    </div>
                  );
                }
                if (part.type === "text") {
                  return (
                    <ReactMarkdown key={idx} remarkPlugins={[remarkGfm]}>
                      {part.content}
                    </ReactMarkdown>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="border-t bg-background p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim() && !isLoading) {
              sendMessage(input.trim());
              setInput("");
            }
          }}
          className="mx-auto flex max-w-3xl gap-3"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isLoading
                ? "Generating Japanese..."
                : "Type a message in English or Japanese..."
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
        <div className="mx-auto mt-2 max-w-3xl text-center">
          {messages.length > 0 && !isLoading && (
            <Button
              variant="link"
              size="sm"
              onClick={() => reload()}
              className="text-muted-foreground text-xs"
            >
              <RefreshCw className="mr-1 h-3 w-3" /> Regenerate last response
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
