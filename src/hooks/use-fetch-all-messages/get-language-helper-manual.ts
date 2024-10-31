import { z } from "zod";
import { chatModel } from "@/lib/langchain-setup";

const ChineseContentSchema = {
  chinese: z.string(),
  pinyin: z.string(),
  english: z.string()
};

const WordsSchema = z.object({
  ...ChineseContentSchema,
  examples: z.array(z.object(ChineseContentSchema)).optional()
});

const PhraseSchema = z.object({
  ...ChineseContentSchema,
  examples: z.array(z.object(ChineseContentSchema)).optional()
});

const SentenceSchema = z.object(ChineseContentSchema);

const IdeaSchema = z.object({
  standard: z.array(z.object(ChineseContentSchema)).optional(),
  open: z.array(z.object(ChineseContentSchema)).optional(),
  creative: z.array(z.object(ChineseContentSchema)).optional()
});

const ResponseSchema = z.object({
  words: z.array(WordsSchema),
  phrases: z.array(PhraseSchema),
  sentences: z.array(SentenceSchema)
});


export const getLanguageHelperManual = async (textContent: string) => {

  const prompt = `
  Analyze the following Chinese text and provide a structured breakdown:

  1. Words: Extract 3-10 key Chinese words.
  2. Phrases: Identify 2-5 meaningful and common phrases (not full sentences).
  3. Sentences: Select 1-3 complete sentences from the text.

  For each item:
  - Provide the Chinese characters
  - Include Pinyin romanization
  - Give English translations

  For phrases, also provide 1-3 example usages with Chinese, Pinyin, and English.

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
    ]
  }
  `;

  const startTime = Date.now();
  console.log(`language helper invoked at ${new Date(startTime).toISOString()}`);
  
  const response = await chatModel.invoke(prompt);

  console.log('response', response)

  let parsedResponse;
  try {
    // Extract the JSON string from the response content
    const jsonString = (response.content as string).match(/```json\s*([\s\S]*?)\s*```/)?.[1];
    if (!jsonString) {
      throw new Error("No JSON found in the response");
    }
    parsedResponse = JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    throw new Error("Invalid response format from language model");
  }

  let validatedResponse;

  // Uncomment and use the following code if you need to validate the response structure
  try {
    validatedResponse = ResponseSchema.parse(parsedResponse);
  } catch (error) {
    console.error("Failed to validate response structure:", error);
    throw new Error("Invalid response structure from language model");
  }

  const endTime = Date.now();
  const elapsedTime = (endTime - startTime);
  console.log(`language helper completed at ${new Date(endTime).toISOString()}, after ${elapsedTime.toFixed(1)} milliseconds`);

  return validatedResponse;
};

export const getSuggestionIdeas = async (messages: { role: string, content: string }[]) => {
  const prompt = `
  Based on the following conversation, provide suggestion ideas to answer the previous question or to continue the conversation. The suggestions should be categorized into three types:

  1. Standard: 1-2 straightforward follow-ups
  2. Open: 1-2 thought-provoking questions or topics
  3. Creative: 1-2 unique or unexpected directions

  For each suggestion, provide the Chinese characters, Pinyin romanization, and English translations.

  Conversation:
  ${messages.map(message => `${message.role === 'user' ? 'User' : 'Assistant'}: ${message.content}`).join('\n')}

  Please return the response in the following JSON format:
  {
    "standard": [{ "chinese": "", "pinyin": "", "english": "" }],
    "open": [{ "chinese": "", "pinyin": "", "english": "" }],
    "creative": [{ "chinese": "", "pinyin": "", "english": "" }]
  }`;

  const startTime = Date.now();
  console.log(`suggestion ideas helper invoked at ${new Date(startTime).toISOString()}`);
  
  const response = await chatModel.invoke(prompt);

  console.log('response', response)

  let parsedResponse;
  try {
    // Extract the JSON string from the response content
    const jsonString = (response.content as string).match(/```json\s*([\s\S]*?)\s*```/)?.[1];
    if (!jsonString) {
      throw new Error("No JSON found in the response");
    }
    parsedResponse = JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    throw new Error("Invalid response format from language model");
  }

  let validatedResponse;

  // Uncomment and use the following code if you need to validate the response structure
  try {
    validatedResponse = IdeaSchema.parse(parsedResponse);
  } catch (error) {
    console.error("Failed to validate response structure:", error);
    throw new Error("Invalid response structure from language model");
  }

  const endTime = Date.now();
  const elapsedTime = (endTime - startTime);
  console.log(`suggestion ideas helper completed at ${new Date(endTime).toISOString()}, after ${elapsedTime.toFixed(1)} milliseconds`);

  return validatedResponse;
};
