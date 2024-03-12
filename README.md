# is-even-ai

Check if a number is even using AI.

For all those who want to use AI in their product but don't know how.

Inspired by the famous [`is-even`](https://www.npmjs.com/package/is-even) npm package and [this tweet](https://twitter.com/erenbali/status/1766602689863950658).

## Usage

```ts
import { IsEvenAiOpenAi } from "is-even-ai";

const isEvenAiOpenAi = new IsEvenAiOpenAi({
  // won't need this if you have OPENAI_API_KEY in your environment
  apiKey: "YOUR_API_KEY",
});

console.log(await isEvenAiOpenAi.isEven(2)); // true (most of the time)
console.log(await isEvenAiOpenAi.isEven(3)); // false (most of the time)
console.log(await isEvenAiOpenAi.isOdd(4)); // false (most of the time)
console.log(await isEvenAiOpenAi.isOdd(5)); // true (most of the time)
console.log(await isEvenAiOpenAi.areEqual(6, 6)); // true (most of the time)
console.log(await isEvenAiOpenAi.areEqual(6, 7)); // false (most of the time)
console.log(await isEvenAiOpenAi.areNotEqual(6, 7)); // true (most of the time)
console.log(await isEvenAiOpenAi.areNotEqual(7, 7)); // false (most of the time)
console.log(await isEvenAiOpenAi.isGreaterThan(8, 7)); // true (most of the time)
console.log(await isEvenAiOpenAi.isGreaterThan(7, 8)); // false (most of the time)
console.log(await isEvenAiOpenAi.isLessThan(8, 9)); // true (most of the time)
console.log(await isEvenAiOpenAi.isLessThan(9, 8)); // false (most of the time)
```

## Supported AI platforms

Feel free to make a PR to add more AI platforms.

- [x] [OpenAI](https://openai.com)

## Supported methods

- `isEven(n: number)`
- `isOdd(n: number)`
- `areEqual(a: number, b: number)`
- `areNotEqual(a: number, b: number)`
- `isGreaterThan(a: number, b: number)`
- `isLessThan(a: number, b: number)`
