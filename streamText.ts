import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set");
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function main() {
  const prompt = process.argv[2];

  if (!prompt) {
    console.error("Please provide a prompt as a command-line argument.");
    process.exit(1);
  }

  const { textStream } = await streamText({
    model: google("gemini-2.5-flash"),
    prompt: prompt,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }
  
  // Add a newline at the end for better formatting
  process.stdout.write("\n");
}

main();


// original code

// import { streamText } from "ai";

// export const answerMyQuestion = async (
//   prompt: string,
// ) => {
//   const { textStream } = await streamText({
//     model,
//     prompt,
//   });

//   for await (const text of textStream) {
//     process.stdout.write(text);
//   }

//   return textStream;
// };

// await answerMyQuestion(
//   "What is the color of the sun?",
// );