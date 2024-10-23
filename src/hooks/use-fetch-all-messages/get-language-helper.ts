import { z } from "zod";
import { chatModel } from "@/lib/langchain-setup";

export const getLanguageHelper = async (textContent: string) => {
  const WordsSchema = z.object({
    chinese: z.string(),
    pinyin: z.string(),
    english: z.string(),
    examples: z.array(z.object({
      chinese: z.string(),
      pinyin: z.string(),
      english: z.string()
    })).optional()
  });

  const PhraseSchema = z.object({
    chinese: z.string(),
    pinyin: z.string(),
    english: z.string(),
    examples: z.array(z.object({
      chinese: z.string(),
      pinyin: z.string(),
      english: z.string()
    })).optional()
  });

  const SentenceSchema = z.object({
    chinese: z.string(),
    pinyin: z.string(),
    english: z.string()
  });

  const IdeaSchema = z.object({
    chinese: z.string(),
    pinyin: z.string(),
    english: z.string()
  });

  const ResponseSchema = z.object({
    words: z.array(WordsSchema),
    phrases: z.array(PhraseSchema),
    sentences: z.array(SentenceSchema),
    ideas: z.object({
      standard: z.array(IdeaSchema),
      open: z.array(IdeaSchema),
      creative: z.array(IdeaSchema)
    })
  });

  const prompt = `
  Analyze the following Chinese text and provide a structured breakdown:

  1. Words: Extract key Chinese words.
  2. Phrases: Identify meaningful and common phrases (not full sentences).
  3. Sentences: Select complete sentences from the text.
  4. Ideas: Suggest continuation ideas in three categories:
     - Standard: 1-2 straightforward follow-ups
     - Open: 1-2 thought-provoking questions or topics
     - Creative: 1-2 unique or unexpected directions

  For each item, provide the English translation, Pinyin romanization, and Chinese characters.

  For phrases, also provide example usages with Chinese, Pinyin, and English.

  Ensure all Chinese content is suitable for a 6-year-old native speaker's level.

  Text to analyze: ${textContent}
  
  Please return the response in the following JSON format:
  {
    "words": [
      { "chinese": "", "pinyin": "", "english": "", "examples": [{ "chinese": "", "pinyin": "", "english": "" }] }
    ],
    "phrases": [
      { "chinese": "", "pinyin": "", "english": "", "examples": [{ "chinese": "", "pinyin": "", "english": "" }] }
    ],
    "sentences": [
      { "chinese": "", "pinyin": "", "english": "" }
    ],
    "ideas": {
      "standard": [{ "chinese": "", "pinyin": "", "english": "" }],
      "open": [{ "chinese": "", "pinyin": "", "english": "" }],
      "creative": [{ "chinese": "", "pinyin": "", "english": "" }]
    }
  }`;

  const startTime = Date.now();
  console.log(`language helper invoked at ${new Date(startTime).toISOString()}`);
  
  const structuredLlm = chatModel.withStructuredOutput(ResponseSchema, { name: "language_helper" });

  const response = await structuredLlm.invoke(prompt);
  
  const endTime = Date.now();
  const elapsedTime = (endTime - startTime);
  console.log(`language helper completed at ${new Date(endTime).toISOString()}, after ${elapsedTime.toFixed(1)} milliseconds`);

  return response;
};