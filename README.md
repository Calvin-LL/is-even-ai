# is-even-ai

[![NPM Version](https://img.shields.io/npm/v/is-even-ai.svg?style=flat)](https://www.npmjs.com/package/is-even-ai)
[![NPM License](https://img.shields.io/npm/l/is-even-ai.svg?style=flat)](https://github.com/Calvin-LL/is-even-ai/blob/main/LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dt/is-even-ai.svg?style=flat)](https://www.npmjs.com/package/is-even-ai)

Check if a number is even using the power of ✨AI✨.

Uses OpenAI or OpenRouter compatible models under the hood to determine if a number is even.

For all those who want to use AI in their product but don't know how.

Inspired by the famous [`is-even`](https://www.npmjs.com/package/is-even) npm package and [this tweet](https://twitter.com/erenbali/status/1766602689863950658).

## Installation

[This package is on npm.](https://www.npmjs.com/package/is-even-ai)

```sh
npm install is-even-ai
```

## Usage

You can use convenience functions for quick setup:

```ts
import {
  areEqual,
  areNotEqual,
  isEven,
  isGreaterThan,
  isLessThan,
  isOdd,
  setOpenAIApiKey,
  setOpenRouterConfig,
} from "is-even-ai";

// For OpenAI (won't need this if you have OPENAI_API_KEY in your environment)
// setOpenAIApiKey("YOUR_OPENAI_API_KEY");

// For OpenRouter (won't need this if you have OPENROUTER_API_KEY in your environment)
setOpenRouterConfig({
  apiKey: "YOUR_OPENROUTER_API_KEY",
  // Optional:
  // siteUrl: "https://your-site.com",
  // siteName: "Your App Name",
  // model: "mistralai/mistral-7b-instruct" // Defaults to openai/gpt-3.5-turbo
});


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

For more advanced usage like changing which model to use and setting the temperature, instantiate the specific AI client class:

### OpenAI

```ts
import { IsEvenAiOpenAi } from "is-even-ai";

const isEvenAiOpenAi = new IsEvenAiOpenAi(
  {
    // won't need this if you have OPENAI_API_KEY in your environment
    apiKey: "YOUR_OPENAI_API_KEY",
  },
  {
    model: "gpt-3.5-turbo",
    temperature: 0,
  }
);

console.log(await isEvenAiOpenAi.isEven(2)); // true
// ... and other methods
```

### OpenRouter

```ts
import { IsEvenAiOpenRouter } from "is-even-ai";

const isEvenAiOpenRouter = new IsEvenAiOpenRouter(
  {
    apiKey: "YOUR_OPENROUTER_API_KEY",
    // Optional:
    // siteUrl: "https://your-site.com", // Sent as HTTP-Referer
    // siteName: "Your App Name",       // Sent as X-Title
    // baseURL: "https://openrouter.ai/api/v1", // Default
    // model: "mistralai/mistral-7b-instruct" // Default model for IsEvenAiOpenRouter if not specified in chatOptions
  },
  {
    // These are OpenAI.Chat.ChatCompletionCreateParamsStreaming options
    // model: "openai/gpt-3.5-turbo", // Can override the default model here too
    temperature: 0,
  }
);

console.log(await isEvenAiOpenRouter.isEven(2)); // true
// ... and other methods
```

The library will automatically try to use `OPENAI_API_KEY` or `OPENROUTER_API_KEY` (and related `OPENROUTER_SITE_URL`, `OPENROUTER_SITE_NAME`, `OPENROUTER_MODEL`, `OPENROUTER_BASE_URL`) from your environment variables if no API key is explicitly set using the convenience functions. OpenAI is prioritized if both are set.

## Supported AI platforms

Feel free to make a PR to add more AI platforms.

- [x] [OpenAI](https://openai.com) via `IsEvenAiOpenAi`
- [x] [OpenRouter](https://openrouter.ai) via `IsEvenAiOpenRouter`

## Supported methods

- `isEven(n: number)`
- `isOdd(n: number)`
- `areEqual(a: number, b: number)`
- `areNotEqual(a: number, b: number)`
- `isGreaterThan(a: number, b: number)`
- `isLessThan(a: number, b: number)`