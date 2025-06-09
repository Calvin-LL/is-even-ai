import { expect, it, vi } from "vitest";
import {
  areEqual,
  areNotEqual,
  isEven,
  isGreaterThan,
  isLessThan,
  isOdd,
  isPositive,
  isNegative,
  setApiKey,
} from "../src/index";

it("should work with key as a environmental variable", async () => {
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
  expect(await isPositive(5)).toBe(true);
  expect(await isPositive(-5)).toBe(false);
  expect(await isNegative(-5)).toBe(true);
  expect(await isNegative(5)).toBe(false);
}, 60000);

it("should work with key passed to setKey", async () => {
  const tempOpenAiApiKey = process.env.OPENAI_API_KEY!;

  vi.stubEnv("OPENAI_API_KEY", "");

  setApiKey(tempOpenAiApiKey);

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
  expect(await isPositive(5)).toBe(true);
  expect(await isPositive(-5)).toBe(false);
  expect(await isNegative(-5)).toBe(true);
  expect(await isNegative(5)).toBe(false);

  vi.unstubAllEnvs();
}, 60000);
