import { GeminiTextModels } from "@tanstack/ai-gemini";
import { GROK_CHAT_MODELS } from "@tanstack/ai-grok";
import { OPENAI_CHAT_MODELS } from "@tanstack/ai-openai";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useAiChatSettings } from "@/domains/ai-chat/hooks/use-ai-chat-settings";
import { DEFAULT_SYSTEM_PROMPT } from "@/domains/ai-chat/types/constants";
import { Button } from "@/domains/shared/components/ui/button";
import { Input } from "@/domains/shared/components/ui/input";
import { Label } from "@/domains/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/domains/shared/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/domains/shared/components/ui/sheet";
import { Textarea } from "@/domains/shared/components/ui/textarea";

export function ChatSettings() {
  const { settings, updateSettings, isLoading } = useAiChatSettings();
  const [apiKey, setApiKey] = useState(settings?.apiKey || "");
  const [selectedModel, setSelectedModel] = useState(settings?.model || "");
  const [systemPrompt, setSystemPrompt] = useState(settings?.systemPrompt || DEFAULT_SYSTEM_PROMPT);
  const [openSettings, setOpenSettings] = useState(false);

  const handleSave = async () => {
    await updateSettings.mutateAsync({
      apiKey,
      model: selectedModel,
      systemPrompt,
    });
  };

  return (
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
              Your API key is encrypted and stored securely.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger id="model" className="w-full">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gemini</SelectLabel>
                  {Object.values(GeminiTextModels).map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Grok</SelectLabel>
                  {Object.values(GROK_CHAT_MODELS).map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>OpenAI</SelectLabel>
                  {Object.values(OPENAI_CHAT_MODELS).map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
