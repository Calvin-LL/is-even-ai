import { expect, it, vi } from "vitest";
import { IsEvenAiOpenRouter, IsEvenAiOpenRouterConfig } from "../src/index";

it("should construct and work with OpenRouter config", async () => {
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn("Skipping IsEvenAiOpenRouter tests: OPENROUTER_API_KEY not set.");
    return;
  }

  const config: IsEvenAiOpenRouterConfig = {
    apiKey: process.env.OPENROUTER_API_KEY!,
    model: process.env.OPENROUTER_MODEL || "openai/gpt-3.5-turbo", // Or a known free model like 'mistralai/mistral-7b-instruct'
    siteName: "is-even-ai-tests",
  };
  const isEvenAiOpenRouter = new IsEvenAiOpenRouter(config);

  expect(await isEvenAiOpenRouter.isEven(2)).toBe(true);
  expect(await isEvenAiOpenRouter.isEven(3)).toBe(false);
  expect(await isEvenAiOpenRouter.isOdd(4)).toBe(false);
  expect(await isEvenAiOpenRouter.isOdd(5)).toBe(true);
  expect(await isEvenAiOpenRouter.areEqual(6, 6)).toBe(true);
  expect(await isEvenAiOpenRouter.areEqual(6, 7)).toBe(false);
  expect(await isEvenAiOpenRouter.areNotEqual(6, 7)).toBe(true);
  expect(await isEvenAiOpenRouter.areNotEqual(7, 7)).toBe(false);
  expect(await isEvenAiOpenRouter.isGreaterThan(8, 7)).toBe(true);
  expect(await isEvenAiOpenRouter.isGreaterThan(7, 8)).toBe(false);
  expect(await isEvenAiOpenRouter.isLessThan(8, 9)).toBe(true);
  expect(await isEvenAiOpenRouter.isLessThan(9, 8)).toBe(false);
}, 60000);