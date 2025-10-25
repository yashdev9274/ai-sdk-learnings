import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set");
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt,
  });

  return text;
};

const answer = await answerMyQuestion("What is the chemical formula for dihydrogen monoxide?")

console.log(answer);