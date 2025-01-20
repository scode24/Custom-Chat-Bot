import { generationConfig, model } from "../configurations/ai.config.js";

const askQueryService = async (query) => {
  return await processQuery(query);
};

const processQuery = async (query) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: "I know Java, Sprin boot what to learn next" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, that's a great foundation! Java and Spring Boot are powerful tools in the backend development world.  Let's explore some avenues you can take to further your skills, focusing on both immediate value and future-proofing your career.\n\n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(query);
  return result.response.text();
};

export { askQueryService };
