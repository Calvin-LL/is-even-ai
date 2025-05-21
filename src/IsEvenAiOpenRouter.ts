import { ClientOptions, OpenAI } from "openai";
import { IsEvenAiCore, IsEvenAiCorePromptTemplates } from "./IsEvenAiCore";

const SYSTEM_PROMPT =
  "You are an AI assistant designed to answer questions about numbers. You will only answer with only the word true or false.";

const OpenRouterPromptTemplates = {
  isEven: (n: number) => `Is ${n} an even number?`,
  isOdd: (n: number) => `Is ${n} an odd number?`,
  areEqual: (a: number, b: number) => `Are ${a} and ${b} equal?`,
  areNotEqual: (a: number, b: number) => `Are ${a} and ${b} not equal?`,
  isGreaterThan: (a: number, b: number) => `Is ${a} greater than ${b}?`,
  isLessThan: (a: number, b: number) => `Is ${a} less than ${b}?`,
} satisfies IsEvenAiCorePromptTemplates;

export interface IsEvenAiOpenRouterConfig {
  apiKey: string;
  baseURL?: string;
  siteUrl?: string;
  siteName?: string;
  model?: string;
}

export class IsEvenAiOpenRouter extends IsEvenAiCore {
  constructor(
    config: IsEvenAiOpenRouterConfig,
    chatOptions: Omit<
      OpenAI.Chat.ChatCompletionCreateParamsStreaming,
      "messages" | "stream" | "model"
    > & { model?: string } = {
      temperature: 0,
    }
  ) {
    const openAi = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL || "https://openrouter.ai/api/v1",
      defaultHeaders: {
        ...(config.siteUrl && { "HTTP-Referer": config.siteUrl }),
        ...(config.siteName && { "X-Title": config.siteName }),
      },
    });

    const modelToUse = config.model || chatOptions.model || "openai/gpt-3.5-turbo";

    const query = async (s: string) => {
      const stream = await openAi.beta.chat.completions.stream({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: s },
        ],
        model: modelToUse,
        temperature: chatOptions.temperature,
        ...chatOptions,
      });

      let response = "";
      for await (const chunk of stream) {
        response += chunk.choices[0]?.delta?.content?.toLowerCase() || "";

        if (response.length > 0) {
          if ("true".startsWith(response)) {
            return true;
          } else if ("false".startsWith(response)) {
            return false;
          }
        }
      }
      return undefined;
    };

    super(OpenRouterPromptTemplates, query);
  }
}