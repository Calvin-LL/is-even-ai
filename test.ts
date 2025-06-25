import { IsEvenAiOllama } from "./src/IsEvenAiOllama.js";

const isEvenAiOpenAi = new IsEvenAiOllama({
  model: "qwen3:1.7b",
});
(async () => {
  console.log(await isEvenAiOpenAi.isEven(2)); // true (most of the time)
  console.log(await isEvenAiOpenAi.isEven(3)); // false (most of the time)
})();
