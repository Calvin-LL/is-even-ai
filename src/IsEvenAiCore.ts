type Tuple<
  N extends number,
  V = number,
  T extends V[] = []
> = N extends T["length"] ? T : Tuple<N, V, [...T, V]>;
export type PromptTemplate<T extends number> =
  | ((...args: Tuple<T>) => string)
  | ((...args: Tuple<T>) => Promise<string>);

export interface IsEvenAiCorePromptTemplates {
  isEven: PromptTemplate<1>;
  isOdd?: PromptTemplate<1>;
  areEqual: PromptTemplate<2>;
  areNotEqual?: PromptTemplate<2>;
  isGreaterThan: PromptTemplate<2>;
  isLessThan?: PromptTemplate<2>;
  isPositive: PromptTemplate<1>;
  isNegative?: PromptTemplate<1>;
}

export class IsEvenAiCore {
  constructor(
    protected promptTemplates: IsEvenAiCorePromptTemplates,
    private readonly query: (s: string) => Promise<boolean | undefined>
  ) {}

  private async getPrompt<T extends keyof IsEvenAiCorePromptTemplates>(
    prompt: T,
    ...args: Parameters<Required<IsEvenAiCorePromptTemplates>[T]>
  ): Promise<
    undefined extends IsEvenAiCorePromptTemplates[T]
      ? string | undefined
      : string
  > {
    const promptTemplate = this.promptTemplates[prompt];
    if (!promptTemplate) {
      return undefined as any;
    }
    const promptString = await (promptTemplate as any)(...args);
    return promptString;
  }

  async isEven(n: number): Promise<boolean | undefined> {
    const prompt = await this.getPrompt("isEven", n);
    return this.query(prompt);
  }

  async isOdd(n: number): Promise<boolean | undefined> {
    const prompt = await this.getPrompt("isOdd", n);

    if (!prompt) {
      return !(await this.isEven(n));
    }

    return this.query(prompt);
  }

  async areEqual(a: number, b: number): Promise<boolean | undefined> {
    const prompt = await this.getPrompt("areEqual", a, b);
    return this.query(prompt);
  }

  async areNotEqual(a: number, b: number): Promise<boolean | undefined> {
    const prompt = await this.getPrompt("areNotEqual", a, b);

    if (!prompt) {
      return !(await this.areEqual(a, b));
    }

    return this.query(prompt);
  }

  async isGreaterThan(a: number, b: number): Promise<boolean | undefined> {
    const prompt = await this.getPrompt("isGreaterThan", a, b);
    return this.query(prompt);
  }

  async isLessThan(a: number, b: number): Promise<boolean | undefined> {
    const prompt = await this.getPrompt("isLessThan", a, b);

    if (!prompt) {
      return !(await this.isGreaterThan(b, a));
    }

    return this.query(prompt);
  }

  async isPositive(n: number): Promise<boolean | undefined> {
    const prompt = await this.getPrompt("isPositive", n);
    return this.query(prompt);
  }

  async isNegative(n: number): Promise<boolean | undefined> {
    const prompt = await this.getPrompt("isNegative", n);

    if (!prompt) {
      return !(await this.isPositive(n));
    }

    return this.query(prompt);
  }
}
