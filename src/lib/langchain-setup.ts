import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { BaseChatModel } from "@langchain/core/language_models/chat_models";

let chatModel : BaseChatModel;

if (process.env.NEXT_PUBLIC_LLM_PROVIDER === 'groq') {
  chatModel = new ChatGroq({
    model: process.env.NEXT_PUBLIC_LLM_MODEL || "llama3-groq-8b-8192-tool-use-preview",
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    temperature: 0
  });
} else if (process.env.NEXT_PUBLIC_LLM_PROVIDER === 'gemini') {
  chatModel = new ChatGoogleGenerativeAI({
    model: process.env.NEXT_PUBLIC_LLM_MODEL || "gemini-1.5-flash",
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    // maxOutputTokens: 2048,
    temperature: 0
  });
} else {
  // Default to OpenAI
  chatModel = new ChatOpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    modelName: process.env.NEXT_PUBLIC_LLM_MODEL || "gpt-4o-mini",
    temperature: 0,
  });
}

export { chatModel };