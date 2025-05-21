import { expect, it, vi } from "vitest";
import {
  areEqual,
  areNotEqual,
  isEven,
  isGreaterThan,
  isLessThan,
  isOdd,
  setOpenAIApiKey,
  setOpenRouterConfig,
} from "../src/index";

it("should work with OpenAI key as an environmental variable", async () => {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("Skipping convenience OpenAI env var test: OPENAI_API_KEY not set.");
    return;
  }
  vi.stubEnv("OPENROUTER_API_KEY", ""); // Ensure OpenRouter is not picked up by default

  expect(await isEven(2)).toBe(true);
  expect(await isEven(3)).toBe(false);
  expect(await isOdd(4)).toBe(false);
  expect(await isOdd(5)).toBe(true);
  expect(await areEqual(6, 6)).toBe(true);
  expect(await areEqual(6, 7)).toBe(false);
  expect(await areNotEqual(6, 7)).toBe(true);
  expect(await areNotEqual(7, 7)).toBe(false);
  expect(await isGreaterThan(8, 7)).toBe(true);
  expect(await isGreaterThan(7, 8)).toBe(false);
  expect(await isLessThan(8, 9)).toBe(true);
  expect(await isLessThan(9, 8)).toBe(false);
  vi.unstubAllEnvs();
}, 60000);

it("should work with OpenAI key passed to setOpenAIApiKey", async () => {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("Skipping convenience setOpenAIApiKey test: OPENAI_API_KEY not set.");
    return;
  }
  const tempOpenAiApiKey = process.env.OPENAI_API_KEY!;

  vi.stubEnv("OPENAI_API_KEY", "");
  vi.stubEnv("OPENROUTER_API_KEY", "");

  setOpenAIApiKey(tempOpenAiApiKey);

  expect(await isEven(2)).toBe(true);
  expect(await isEven(3)).toBe(false);
  expect(await isOdd(4)).toBe(false);
  expect(await isOdd(5)).toBe(true);
  expect(await areEqual(6, 6)).toBe(true);
  expect(await areEqual(6, 7)).toBe(false);
  expect(await areNotEqual(6, 7)).toBe(true);
  expect(await areNotEqual(7, 7)).toBe(false);
  expect(await isGreaterThan(8, 7)).toBe(true);
  expect(await isGreaterThan(7, 8)).toBe(false);
  expect(await isLessThan(8, 9)).toBe(true);
  expect(await isLessThan(9, 8)).toBe(false);

  vi.unstubAllEnvs();
}, 60000);

it("should work with OpenRouter key as an environmental variable", async () => {
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn("Skipping convenience OpenRouter env var test: OPENROUTER_API_KEY not set.");
    return;
  }
  vi.stubEnv("OPENAI_API_KEY", ""); // Ensure OpenAI is not picked up by default

  expect(await isEven(22)).toBe(true);
  expect(await isEven(23)).toBe(false);
  
  vi.unstubAllEnvs();
}, 60000);


it("should work with OpenRouter key passed to setOpenRouterConfig", async () => {
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn("Skipping convenience setOpenRouterConfig test: OPENROUTER_API_KEY not set.");
    return;
  }
  const tempOpenRouterApiKey = process.env.OPENROUTER_API_KEY!;

  vi.stubEnv("OPENAI_API_KEY", "");
  vi.stubEnv("OPENROUTER_API_KEY", "");

  setOpenRouterConfig({
    apiKey: tempOpenRouterApiKey,
    model: process.env.OPENROUTER_MODEL || "openai/gpt-3.5-turbo",
    siteName: "is-even-ai-tests-convenience",
  });

  expect(await isEven(2)).toBe(true);
  expect(await isEven(3)).toBe(false);
  expect(await isOdd(4)).toBe(false);
  expect(await isOdd(5)).toBe(true);
  expect(await areEqual(6, 6)).toBe(true);
  expect(await areEqual(6, 7)).toBe(false);
  expect(await areNotEqual(6, 7)).toBe(true);
  expect(await areNotEqual(7, 7)).toBe(false);
  expect(await isGreaterThan(8, 7)).toBe(true);
  expect(await isGreaterThan(7, 8)).toBe(false);
  expect(await isLessThan(8, 9)).toBe(true);
  expect(await isLessThan(9, 8)).toBe(false);

  vi.unstubAllEnvs();
}, 60000);