import { expect, it, vi } from "vitest";
import { IsEvenAiCore, IsEvenAiCorePromptTemplates } from "../src/index";

type OptionalKeys<T> = keyof {
  [K in keyof T as undefined extends T[K] ? K : never]: T[K];
};
type RequiredKeys<T> = keyof {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

const testPromptTemplates = {
  isEven: (n: number) => `isEven ${n}`,
  isOdd: (n: number) => `isOdd ${n}`,
  areEqual: (a: number, b: number) => `areEqual ${a} ${b}`,
  areNotEqual: (a: number, b: number) => `areNotEqual ${a} ${b}`,
  isGreaterThan: (a: number, b: number) => `isGreaterThan ${a} ${b}`,
  isLessThan: (a: number, b: number) => `isLessThan ${a} ${b}`,
} satisfies IsEvenAiCorePromptTemplates;

const requiredKeys = [
  "isEven",
  "areEqual",
  "isGreaterThan",
] satisfies RequiredKeys<IsEvenAiCorePromptTemplates>[];
const optionalKeys = [
  "isOdd",
  "areNotEqual",
  "isLessThan",
] satisfies OptionalKeys<IsEvenAiCorePromptTemplates>[];
const allKeys = [...requiredKeys, ...optionalKeys];

for (const key of allKeys) {
  it(`should call query with ${key}`, async () => {
    const query = vi.fn().mockResolvedValue(true);

    const isEvenAi = new IsEvenAiCore(testPromptTemplates, query);
    const result = await isEvenAi[key](1, 2);

    expect(result).toBe(true);
    expect(query).toHaveBeenCalledOnce();
    expect(query.mock.lastCall[0]).toSatisfy((q: string) => q.startsWith(key));
  });
}

const optionalKeyComplements: Record<
  OptionalKeys<IsEvenAiCorePromptTemplates>,
  RequiredKeys<IsEvenAiCorePromptTemplates>
> = {
  isOdd: "isEven",
  areNotEqual: "areEqual",
  isLessThan: "isGreaterThan",
};

for (const [key, complementKey] of Object.entries(optionalKeyComplements)) {
  it(`should call query with ${complementKey} when ${key} is undefined`, async () => {
    const query = vi.fn().mockResolvedValue(true);

    const testPromptTemplatesWithoutKey: Partial<IsEvenAiCorePromptTemplates> =
      {
        ...testPromptTemplates,
      };
    // @ts-expect-error
    delete testPromptTemplatesWithoutKey[key];

    // @ts-expect-error
    const isEvenAi = new IsEvenAiCore(testPromptTemplatesWithoutKey, query);
    // @ts-expect-error
    const result = await isEvenAi[key](1, 2);

    expect(result).toBe(false);
    expect(query).toHaveBeenCalledOnce();
    expect(query.mock.lastCall[0]).toSatisfy((q: string) =>
      q.startsWith(complementKey)
    );
  });
}
