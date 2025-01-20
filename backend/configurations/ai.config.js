import { GoogleGenerativeAI } from "@google/generative-ai";

let model;
let generationConfig;

const initConfig = (func) => {
  const apiKey = process.env.LLM_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  model = genAI.getGenerativeModel({
    model: process.env.LLM_MODEL,
    systemInstruction: process.env.LLM_MODEL_CONFIG_SYSTEM_PROMPT,
  });

  generationConfig = {
    temperature: process.env.LLM_MODEL_CONFIG_TEMPERATURE || 1,
    topP: process.env.LLM_MODEL_CONFIG_TOP_P || 0.95,
    topK: process.env.LLM_MODEL_CONFIG_TOP_K || 40,
    maxOutputTokens: process.env.LLM_MODEL_CONFIG_MAX_TOKENS,
    responseMimeType: "text/plain",
  };

  console.log(
    "Initialized config parameters: " +
      "\n----------------------------------------------------\n" +
      JSON.stringify({
        model: process.env.LLM_MODEL,
        systemInstruction: process.env.LLM_MODEL_CONFIG_SYSTEM_PROMPT,
        temperature: generationConfig.temperature,
        topP: generationConfig.topP,
        topK: generationConfig.topK,
        maxOutputTokens: generationConfig.maxOutputTokens,
      }) +
      "\n---------------------------------------------------\n"
  );

  func();
};

export { generationConfig, initConfig, model };
