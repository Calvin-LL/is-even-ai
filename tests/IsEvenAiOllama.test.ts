import { expect, it } from "vitest";
import { IsEvenAiOllama } from "../src/index";

it("should construct with config", async () => {
  const isEvenAiOllama = new IsEvenAiOllama();

  expect(await isEvenAiOllama.isEven(2)).toBe(true);
  expect(await isEvenAiOllama.isEven(3)).toBe(false);
  expect(await isEvenAiOllama.isOdd(4)).toBe(false);
  expect(await isEvenAiOllama.isOdd(5)).toBe(true);
  expect(await isEvenAiOllama.areEqual(6, 6)).toBe(true);
  expect(await isEvenAiOllama.areEqual(6, 7)).toBe(false);
  expect(await isEvenAiOllama.areNotEqual(6, 7)).toBe(true);
  expect(await isEvenAiOllama.areNotEqual(7, 7)).toBe(false);
  expect(await isEvenAiOllama.isGreaterThan(8, 7)).toBe(true);
  expect(await isEvenAiOllama.isGreaterThan(7, 8)).toBe(false);
  expect(await isEvenAiOllama.isLessThan(8, 9)).toBe(true);
  expect(await isEvenAiOllama.isLessThan(9, 8)).toBe(false);
}, 60000);
