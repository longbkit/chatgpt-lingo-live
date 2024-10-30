import React, { useEffect, useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Bot, Sparkles, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/use-fetch-all-messages';
import Markdown from "react-markdown";
import { createDictionary, updateLearnedDictionary, getOneDictionary, increaseSeenCount } from '@/apis/language-backend';
import { Button } from '@/components/ui/button';

interface MessageProps {
  message: Message;
  isLastMessage: boolean;
  updateMessages: (messages: Record<string, Message>) => void;
  updateSingleMessage: (message: Message) => void;
  autoCollapsePrevious: boolean;
  autoExpandSentences: boolean;
  autoExpandWords: boolean;
  autoExpandPhrases: boolean;
  fetchLanguageHelper: (message: Message) => Promise<void>;
}

const profileId = 'fa307f6f-953c-4354-aac6-845911381506';

const MessageRenderer: React.FC<MessageProps> = ({ message, fetchLanguageHelper, isLastMessage = false, 
  updateSingleMessage, updateMessages, autoCollapsePrevious, autoExpandSentences, autoExpandWords, autoExpandPhrases }) => {
  const isAI = message.author.role === 'assistant';
  const parts = message.content.parts || [message.content.text];

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isLastMessage && message && !message.language_helper) {
      console.log('fetching language helper for message', message, isLastMessage, message.language_helper, !message.language_helper);
      handleFetchLanguageHelper(message);
    }
  }, [isLastMessage]);

  const handleWordClick = async (word: string, definition: string, pinyin: string) => {
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
      let dictionary = await getOneDictionary(word);
      if (!dictionary) {
        dictionary = await createDictionary({ text: word, definition: definition, pinyin: pinyin, type: 'word'});
        console.log(`Word ${word} created, id = ${dictionary.id}`, JSON.stringify(dictionary, null, 2));
      } else {
        console.log(`Found word ${word}, id = ${dictionary.id}`);
      }

      const response = await increaseSeenCount(profileId, dictionary.id);
      message.language_helper.words = message.language_helper.words.map((word: any) => (
        dictionary.text === word.chinese ?
        {
          ...word,
          learned_dictionary: response
        } : word)
      );

      updateSingleMessage(message);
      // const newMessages : Record<string, Message> = {
      //   ...messages,
      //   [message.id]: {
      //     ...messages[message.id],
      //     ...message
      //   }
      // }
      // updateMessages((prevMessages: any) => ({
      //   ...prevMessages,
      //   [message.id]: {
      //     ...prevMessages[message.id],
      //     ...message
      //   }
      // }));

      console.log(`Seen count increased to ${response.seen_count} for word ${word}, id = ${dictionary.id}`, JSON.stringify(response, null, 2));
    }
    // console.log(dictionary);
  };

  const handleLearnedDictionary = async (word: string, isCorrect: boolean) => {
    console.log(`Learned: ${word}`);
    const dictionary = await getOneDictionary(word);
    if (dictionary) {
      const response = await updateLearnedDictionary(profileId, dictionary.id, isCorrect);
      console.log(`Dictionary updated to status ${response.status} for word ${word}, id = ${dictionary.id}`, JSON.stringify(response, null, 2));
      // message['learning_helper'] = response;
      message.language_helper.words = message.language_helper.words.map((word: any) => (
        dictionary.text === word.chinese ?
        {
          ...word,
          learned_dictionary: response
        } : word)
      );
      updateSingleMessage(message);
    }

    setSelectedWord(null);
  };

  const handleFetchLanguageHelper = async (message: Message) => {
    setIsLoading(true);
    await fetchLanguageHelper(message);
    setIsLoading(false);
  };

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
        {isAI && (
          <div className="flex items-center mb-1">
            <Avatar className="w-8 h-8 mr-2">
              <Bot className="h-full w-full" />
            </Avatar>
            <span className="text-sm font-medium">AI Assistant</span>
          </div>
        )}
        <div className={`flex gap-2 items-start ${!isAI ? 'flex-row-reverse' : ''}`}>
          <div className={`p-3 rounded-lg ${isAI ? 'bg-gray-200 text-left' : 'bg-blue-500 text-white text-right'}`}>
            <pre className={cn("whitespace-pre-wrap", isAI ? "text-gray-500" : "text-white")}>
              {parts.map((part, index) => (
                <Markdown key={index}>
                  {typeof part === 'string' ? part : part?.text || ''}
                </Markdown>
              ))}
            </pre>
            {false && message && (
              <div className="mt-2">
                <details>
                  <summary className="cursor-pointer text-sm text-gray-600">
                    Show raw message
                  </summary>
                  <pre className="mt-2 p-2 rounded text-xs overflow-auto">
                    {JSON.stringify(message, null, 2)}
                  </pre>
                </details>
              </div>
            )}
            {message.language_helper && (
              <div className="mt-4 border-t pt-4 flex flex-col gap-4 animate-fade-in">
                {/* Sentences */}
                <details open={(isLastMessage || !autoCollapsePrevious) && autoExpandSentences}>
                  <summary className="cursor-pointer text-sm font-medium text-gray-600 mb-1">
                    Key Sentences
                  </summary>
                  <div className="space-y-2">
                    {message.language_helper?.sentences?.map((sentence: any, index: number) => (
                      <div key={index} className="bg-white p-2 rounded shadow-sm">
                        <Markdown className="text-base">{sentence.chinese}</Markdown>
                        <Markdown className="text-sm text-gray-500">{sentence.pinyin}</Markdown>
                        <Markdown className="text-sm italic">{sentence.english}</Markdown>
                      </div>
                    ))}
                  </div>
                </details>
                {/* Words */}
                <details open={(isLastMessage || !autoCollapsePrevious) && autoExpandWords}>
                  <summary className="cursor-pointer text-sm font-medium text-gray-600 mb-1">
                    Key Words
                  </summary>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {message.language_helper?.words?.map((word: any, index: number) => (
                      <div 
                        key={index} 
                        className={`p-2 min-w-24 rounded shadow-sm cursor-pointer hover:cursor-pointer group ${
                          word.learned_dictionary
                            ? word.learned_dictionary.status === 'mastered'
                              ? 'bg-green-100'
                              : word.learned_dictionary.status === 'reviewing'
                                ? 'bg-blue-200'
                                : word.learned_dictionary.status === 'learning'
                                  ? 'bg-yellow-100'
                                  : (word.learned_dictionary.status === 'new' && word.learned_dictionary.seen_count < 3)
                                    ? 'bg-yellow-200'
                                    : (word.learned_dictionary.status === 'new' && word.learned_dictionary.seen_count >= 3)
                                      ? 'bg-red-400' : 'bg-white'
                              : 'bg-white'
                        } ${selectedWord === word.chinese ? 'row-span-2' : ''}`}
                        onClick={() => handleWordClick(word.chinese, word.english, word.pinyin)}
                      >
                        <div className='relative'>
                          {word.learned_dictionary && (
                              <div className="text-xs text-gray-500">
                                Seen: {word.learned_dictionary.seen_count} |
                                Learned: {word.learned_dictionary.review_count}
                              </div>
                          )}
                          <div className="text-base font-semibold">{word.chinese}</div>
                          {selectedWord === word.chinese && (
                            <>
                              <div className="text-sm text-gray-500">{word.pinyin}</div>
                              <div className="text-sm">{word.english}</div>
                              <div className="flex flex-col gap-2 pt-2 mt-auto">
                                <Button className="bg-green-500 text-white px-2 py-1 w-full rounded" onClick={() => handleLearnedDictionary(word.chinese, true)}>Learned</Button>
                                <Button className="bg-yellow-500 text-white px-2 py-1 w-full rounded" onClick={() => handleLearnedDictionary(word.chinese, false)}>Need Review</Button>
                              </div>
                          </>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>

                {/* Phrases */}
                <details open={(isLastMessage || !autoCollapsePrevious) && autoExpandPhrases}>
                  <summary className="cursor-pointer text-sm font-medium text-gray-600 mb-1">
                    Useful Phrases
                  </summary>
                  <div className="space-y-2">
                    {message.language_helper?.phrases?.map((phrase: any, index: number) => (
                      <div key={index} className="bg-white p-2 rounded shadow-sm">
                        <Markdown className="text-base font-semibold">{phrase.chinese}</Markdown>
                        <Markdown className="text-sm text-gray-500">{phrase.pinyin}</Markdown>
                        <Markdown className="text-sm mb-1">{phrase.english}</Markdown>
                        {phrase.examples && (
                          <details open={isLastMessage}>
                            <summary className="cursor-pointer text-xs text-gray-500">Examples</summary>
                            <ul className="list-disc list-inside text-sm">
                              {phrase.examples.map((example: any, exIndex: number) => (
                                <li key={exIndex}>
                                  <Markdown>{example.chinese as string}</Markdown>
                                  <Markdown className="text-gray-500">{(example.pinyin as string).trim()}</Markdown>
                                  <Markdown className="italic">{example.english as string}</Markdown>
                                </li>
                              ))}
                            </ul>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            )}
          </div>
          {!message.language_helper && (
            isLoading ? (
              <Loader className="w-6 h-6 mt-2 animate-spin" />
            ) : (
              <Sparkles className="w-6 h-6 mt-2 cursor-pointer hover:text-blue-500" onClick={() => handleFetchLanguageHelper(message)}/>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageRenderer;