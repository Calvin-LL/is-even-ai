import OpenAI from "openai";
import { afterAll, beforeAll, expect, it } from "vitest";
import { IsEvenAiOpenAi } from "../src/index";

beforeAll(() => {
  process.env.OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;
});

afterAll(() => {
  delete process.env.OPENAI_API_KEY;
});

it("should construct with config", async () => {
  const isEvenAiOpenAi = new IsEvenAiOpenAi();

  expect(await isEvenAiOpenAi.isEven(2)).toBe(true);
  expect(await isEvenAiOpenAi.isEven(3)).toBe(false);
  expect(await isEvenAiOpenAi.isOdd(4)).toBe(false);
  expect(await isEvenAiOpenAi.isOdd(5)).toBe(true);
  expect(await isEvenAiOpenAi.areEqual(6, 6)).toBe(true);
  expect(await isEvenAiOpenAi.areEqual(6, 7)).toBe(false);
  expect(await isEvenAiOpenAi.areNotEqual(6, 7)).toBe(true);
  expect(await isEvenAiOpenAi.areNotEqual(7, 7)).toBe(false);
  expect(await isEvenAiOpenAi.isGreaterThan(8, 7)).toBe(true);
  expect(await isEvenAiOpenAi.isGreaterThan(7, 8)).toBe(false);
  expect(await isEvenAiOpenAi.isLessThan(8, 9)).toBe(true);
  expect(await isEvenAiOpenAi.isLessThan(9, 8)).toBe(false);
}, 60000);

it("should construct with OpenAi instance", async () => {
  const openAi = new OpenAI();
  const isEvenAiOpenAi = new IsEvenAiOpenAi(openAi);

  expect(await isEvenAiOpenAi.isEven(2)).toBe(true);
  expect(await isEvenAiOpenAi.isEven(3)).toBe(false);
  expect(await isEvenAiOpenAi.isOdd(4)).toBe(false);
  expect(await isEvenAiOpenAi.isOdd(5)).toBe(true);
  expect(await isEvenAiOpenAi.areEqual(6, 6)).toBe(true);
  expect(await isEvenAiOpenAi.areEqual(6, 7)).toBe(false);
  expect(await isEvenAiOpenAi.areNotEqual(6, 7)).toBe(true);
  expect(await isEvenAiOpenAi.areNotEqual(7, 7)).toBe(false);
  expect(await isEvenAiOpenAi.isGreaterThan(8, 7)).toBe(true);
  expect(await isEvenAiOpenAi.isGreaterThan(7, 8)).toBe(false);
  expect(await isEvenAiOpenAi.isLessThan(8, 9)).toBe(true);
  expect(await isEvenAiOpenAi.isLessThan(9, 8)).toBe(false);
}, 60000);
