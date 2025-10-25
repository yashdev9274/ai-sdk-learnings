import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set");
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function main() {
  const input = process.argv[2];

  if (!input) {
    console.error("Please provide the text to summarize as a command-line argument.");
    process.exit(1);
  }

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    messages: [
      {
        role: "system",
        content: `You are a text summarizer. ` +
          `Summarize the text you receive. ` +
          `Be concise. ` +
          `Return only the summary. ` +
          `Do not use the phrase "here is a summary". ` +
          `Highlight relevant phrases in bold. ` +
          `The summary should be two sentences long. `,
      },
      {
        role: "user",
        content: input,
      }
    ]
  });

  console.log(text);
}

main();