import { IsEvenAiOpenAi } from "./IsEvenAiOpenAi";
import { IsEvenAiOpenRouter, IsEvenAiOpenRouterConfig } from "./IsEvenAiOpenRouter";
import { IsEvenAiCore } from "./IsEvenAiCore";

let activeClient: IsEvenAiCore | undefined;

export function setOpenAIApiKey(apiKey: string) {
  activeClient = new IsEvenAiOpenAi({ apiKey });
}

export function setOpenRouterConfig(config: IsEvenAiOpenRouterConfig) {
  activeClient = new IsEvenAiOpenRouter(config);
}

function getActiveClient(): IsEvenAiCore {
  if (activeClient) {
    return activeClient;
  }

  if (process.env.OPENAI_API_KEY) {
    setOpenAIApiKey(process.env.OPENAI_API_KEY);
    return activeClient!;
  }

  if (process.env.OPENROUTER_API_KEY) {
    setOpenRouterConfig({
      apiKey: process.env.OPENROUTER_API_KEY,
      siteUrl: process.env.OPENROUTER_SITE_URL,
      siteName: process.env.OPENROUTER_SITE_NAME,
      model: process.env.OPENROUTER_MODEL,
      baseURL: process.env.OPENROUTER_BASE_URL,
    });
    return activeClient!;
  }

  throw new Error(
    "No AI provider API key set. Please call setOpenAIApiKey() or setOpenRouterConfig(), or set OPENAI_API_KEY or OPENROUTER_API_KEY environment variables."
  );
}

export function isEven(n: number) {
  return getActiveClient().isEven(n);
}

export function isOdd(n: number) {
  return getActiveClient().isOdd(n);
}

export function areEqual(a: number, b: number) {
  return getActiveClient().areEqual(a, b);
}

export function areNotEqual(a: number, b: number) {
  return getActiveClient().areNotEqual(a, b);
}

export function isGreaterThan(a: number, b: number) {
  return getActiveClient().isGreaterThan(a, b);
}

export function isLessThan(a: number, b: number) {
  return getActiveClient().isLessThan(a, b);
}