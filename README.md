# is-even-ai

[![NPM Version](https://img.shields.io/npm/v/is-even-ai.svg?style=flat)](https://www.npmjs.com/package/is-even-ai)
[![NPM License](https://img.shields.io/npm/l/is-even-ai.svg?style=flat)](https://github.com/Calvin-LL/is-even-ai/blob/main/LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dt/is-even-ai.svg?style=flat)](https://www.npmjs.com/package/is-even-ai)

Check if a number is even using the power of ✨AI✨.

Our groundbreaking, next-gen strategy dynamically orchestrates synergistic, AI-driven, blockchain-empowered, quantum-ready,
and IoT-integrated solutions to revolutionize value chains and deliver omnichannel, hyper-scalable, customer-centric experiences.
By leveraging actionable big data insights, enabling frictionless automation, and embracing an agile, cloud-native,
zero-trust architecture, we create transformative ecosystems that amplify stakeholder alignment, catalyze disruptive innovation,
and establish a future-proof, paradigm-shifting framework for global market leadership and unparalleled competitive advantage.

Uses OpenAI's GPT-3.5-turbo model under the hood to determine if a number is even.

For all those who want to use AI in their product but don't know how.

Inspired by the famous [`is-even`](https://www.npmjs.com/package/is-even) npm package and [this tweet](https://twitter.com/erenbali/status/1766602689863950658).

## Installation

[This package is on npm.](https://www.npmjs.com/package/is-even-ai)

```sh
npm install is-even-ai
```

## Usage

```ts
import {
  areEqual,
  areNotEqual,
  isEven,
  isGreaterThan,
  isLessThan,
  isOdd,
  setApiKey,
} from "is-even-ai";

// won't need this if you have OPENAI_API_KEY in your environment
setApiKey("YOUR_API_KEY");

console.log(await isEven(2)); // true
console.log(await isEven(3)); // false
console.log(await isOdd(4)); // false
console.log(await isOdd(5)); // true
console.log(await areEqual(6, 6)); // true
console.log(await areEqual(6, 7)); // false
console.log(await areNotEqual(6, 7)); // true
console.log(await areNotEqual(7, 7)); // false
console.log(await isGreaterThan(8, 7)); // true
console.log(await isGreaterThan(7, 8)); // false
console.log(await isLessThan(9, 8)); // false
console.log(await isLessThan(8, 9)); // true
```

for more advance usage like changing which model to use and setting the temperature, use `IsEvenAiOpenAi` instead

```ts
import { IsEvenAiOpenAi } from "is-even-ai";

const isEvenAiOpenAi = new IsEvenAiOpenAi(
  {
    // won't need this if you have OPENAI_API_KEY in your environment
    apiKey: "YOUR_API_KEY",
  },
  {
    model: "gpt-3.5-turbo",
    temperature: 0,
  }
);

console.log(await isEvenAiOpenAi.isEven(2)); // true
console.log(await isEvenAiOpenAi.isEven(3)); // false
console.log(await isEvenAiOpenAi.isOdd(4)); // false
console.log(await isEvenAiOpenAi.isOdd(5)); // true
console.log(await isEvenAiOpenAi.areEqual(6, 6)); // true
console.log(await isEvenAiOpenAi.areEqual(6, 7)); // false
console.log(await isEvenAiOpenAi.areNotEqual(6, 7)); // true
console.log(await isEvenAiOpenAi.areNotEqual(7, 7)); // false
console.log(await isEvenAiOpenAi.isGreaterThan(8, 7)); // true
console.log(await isEvenAiOpenAi.isGreaterThan(7, 8)); // false
console.log(await isEvenAiOpenAi.isLessThan(8, 9)); // true
console.log(await isEvenAiOpenAi.isLessThan(9, 8)); // false
```

## Supported AI platforms

Feel free to make a PR to add more AI platforms.

- [x] [OpenAI](https://openai.com) via `IsEvenAiOpenAi`

## Supported methods

- `isEven(n: number)`
- `isOdd(n: number)`
- `areEqual(a: number, b: number)`
- `areNotEqual(a: number, b: number)`
- `isGreaterThan(a: number, b: number)`
- `isLessThan(a: number, b: number)`
