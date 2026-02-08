import { GeminiTextModels } from "@tanstack/ai-gemini";
import { GROK_CHAT_MODELS } from "@tanstack/ai-grok";
import { OPENAI_CHAT_MODELS } from "@tanstack/ai-openai";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useChatSettingsForm } from "@/domains/ai-chat/hooks/use-chat-settings-form";
import { SelectField } from "@/domains/shared/components/form/select-field";
import { SubscribeButton } from "@/domains/shared/components/form/subscribe-button";
import { TextField } from "@/domains/shared/components/form/text-field";
import { TextareaField } from "@/domains/shared/components/form/textarea-field";
import { Button } from "@/domains/shared/components/ui/button";
import { FieldGroup } from "@/domains/shared/components/ui/field";
import {
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/domains/shared/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/domains/shared/components/ui/sheet";

export function ChatSettings() {
  const form = useChatSettingsForm();
  const [openSettings, setOpenSettings] = useState(false);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit().then(() => {
              setOpenSettings(false);
            });
          }}
          className="mt-6 flex flex-col gap-6 px-5"
        >
          <FieldGroup>
            <form.AppField
              name="apiKey"
              children={() => (
                <>
                  <TextField type="password" placeholder="sk-...">
                    OpenAI API Key
                  </TextField>
                  <p className="text-muted-foreground text-xs">
                    Your API key is encrypted and stored securely.
                  </p>
                </>
              )}
            />

            <form.AppField
              name="model"
              children={() => (
                <SelectField
                  placeholder="Select a model"
                  options={
                    <>
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
                    </>
                  }
                >
                  Model
                </SelectField>
              )}
            />

            <form.AppField
              name="systemPrompt"
              children={() => (
                <TextareaField className="min-h-[200px] font-mono text-xs">
                  System Persona
                </TextareaField>
              )}
            />
          </FieldGroup>

          <div className="flex justify-end pt-4">
            <form.AppForm>
              <SubscribeButton>Save Settings</SubscribeButton>
            </form.AppForm>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
