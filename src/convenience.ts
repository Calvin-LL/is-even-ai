import { IsEvenAiOpenAi } from "./IsEvenAiOpenAi";

let openAiApiKey: string | undefined;
let isEvenAiOpenAi: IsEvenAiOpenAi | undefined;

function getIsEvenAiOpenAi(): IsEvenAiOpenAi {
  if (!isEvenAiOpenAi) {
    isEvenAiOpenAi = new IsEvenAiOpenAi({ apiKey: openAiApiKey });
  }

  return isEvenAiOpenAi;
}

export function setApiKey(apiKey: string) {
  openAiApiKey = apiKey;
}

export function isEven(n: number) {
  return getIsEvenAiOpenAi().isEven(n);
}

export function isOdd(n: number) {
  return getIsEvenAiOpenAi().isOdd(n);
}

export function areEqual(a: number, b: number) {
  return getIsEvenAiOpenAi().areEqual(a, b);
}

export function areNotEqual(a: number, b: number) {
  return getIsEvenAiOpenAi().areNotEqual(a, b);
}

export function isGreaterThan(a: number, b: number) {
  return getIsEvenAiOpenAi().isGreaterThan(a, b);
}

export function isLessThan(a: number, b: number) {
  return getIsEvenAiOpenAi().isLessThan(a, b);
}
