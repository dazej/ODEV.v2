import OpenAI from "openai";
import { products } from "../data/products.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getRecommendations(userPrompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a clothing recommendation AI." },
      {
        role: "user",
        content: `
User request: ${userPrompt}
Catalog:
${JSON.stringify(products)}

Return an array of recommended product IDs in JSON.
`
      }
    ]
  });

  return response.choices[0].message.content;
}