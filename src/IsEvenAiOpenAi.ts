import { ClientOptions, OpenAI } from "openai";
import { IsEvenAiCore, IsEvenAiCorePromptTemplates } from "./IsEvenAiCore";

const SYSTEM_PROMPT =
  "You are an AI assistant designed to answer questions about numbers. You will only answer with only the word true or false.";

const OpenAiPromptTemplates = {
  isEven: (n: number) => `Is ${n} an even number?`,
  isOdd: (n: number) => `Is ${n} an odd number?`,
  areEqual: (a: number, b: number) => `Are ${a} and ${b} equal?`,
  areNotEqual: (a: number, b: number) => `Are ${a} and ${b} not equal?`,
  isGreaterThan: (a: number, b: number) => `Is ${a} greater than ${b}?`,
  isLessThan: (a: number, b: number) => `Is ${a} less than ${b}?`,
} satisfies IsEvenAiCorePromptTemplates;

export class IsEvenAiOpenAi extends IsEvenAiCore {
  constructor(
    obj: ClientOptions | OpenAI = {},
    chatOptions: Omit<
      OpenAI.Chat.ChatCompletionCreateParamsStreaming,
      "messages" | "stream"
    > = {
      model: "gpt-3.5-turbo",
      temperature: 0,
    }
  ) {
    let openAi: OpenAI;
    if (obj instanceof OpenAI) {
      openAi = obj;
    } else {
      openAi = new OpenAI(obj);
    }

    const query = async (s: string) => {
      const stream = await openAi.beta.chat.completions.stream({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: s },
        ],
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

    super(OpenAiPromptTemplates, query);
  }
}
