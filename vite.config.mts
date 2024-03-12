import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  if (!process.env.OPENAI_API_KEY) {
    const env = loadEnv(mode, process.cwd(), "");

    return {
      define: {
        "process.env.OPENAI_API_KEY": JSON.stringify(env.OPENAI_API_KEY),
      },
    };
  }
  return {};
});
