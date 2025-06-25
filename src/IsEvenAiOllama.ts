import { Ollama } from "ollama";
import { IsEvenAiCore, IsEvenAiCorePromptTemplates } from "./IsEvenAiCore";

const SYSTEM_PROMPT =
  "You are an AI assistant designed to answer questions about numbers. You will only answer with only the word true or false.";

const OllamaPromptTemplates = {
  isEven: (n: number) => `Is ${n} an even number?`,
  isOdd: (n: number) => `Is ${n} an odd number?`,
  areEqual: (a: number, b: number) => `Are ${a} and ${b} equal?`,
  areNotEqual: (a: number, b: number) => `Are ${a} and ${b} not equal?`,
  isGreaterThan: (a: number, b: number) => `Is ${a} greater than ${b}?`,
  isLessThan: (a: number, b: number) => `Is ${a} less than ${b}?`,
} satisfies IsEvenAiCorePromptTemplates;

type OllamaConfig = {
  model?: string;
  host?: string;
};

export class IsEvenAiOllama extends IsEvenAiCore {
  constructor(obj: OllamaConfig = {}) {
    let ollama: Ollama;
    if (obj instanceof Ollama) {
      ollama = obj;
    } else {
      ollama = new Ollama({
        host: obj.host || "http://localhost:11434",
      });
    }

    const query = async (s: string) => {
      const result = await ollama.chat({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: s },
        ],
        model: obj.model || "qwen3:1.7b",
        stream: false,
      });

      let response = result.message.content;

      return response.toLocaleLowerCase().includes("true");
    };

    super(OllamaPromptTemplates, query);
  }
}
