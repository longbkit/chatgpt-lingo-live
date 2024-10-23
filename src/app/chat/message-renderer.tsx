import React from 'react';
import pinyin from 'pinyin';
import { Avatar } from "@/components/ui/avatar";
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/use-fetch-all-messages';
import Markdown from "react-markdown";

interface MessageProps {
  message: Message;
  isLastMessage: boolean;
}

const MessageRenderer: React.FC<MessageProps> = ({ message, isLastMessage = false }) => {
  const isAI = message.author.role === 'assistant';
  const parts = message.content.parts || [message.content.text];

  const renderContent = (text: string) => {
    const jsonRegex = /```json([\s\S]*?)```/;
    const jsonMatch = text.match(jsonRegex);
    
    if (jsonMatch) {
      try {
        const jsonObject = JSON.parse(jsonMatch[1]);
        const keys = Object.keys(jsonObject[0]);
        const tableHead = (
          <tr>
            {keys.map((key, index) => (
              <th key={index} className="border px-4 py-2">{key}</th>
            ))}
          </tr>
        );

        const tableRows = jsonObject.map((value: any, rowIndex: number) => (
          <tr key={rowIndex}>
            {Object.keys(value).map((key: string, colIndex: number) => (
              <td key={key} className="border px-4 py-2">
                {typeof value[key] === 'object' ? (
                  Object.keys(value[key]).map((subKey, subIndex) => (
                    <div key={subIndex}>
                      {subKey}: {value[key][subKey]}
                    </div>
                  ))
                ) : (
                  value[key]
                )}
              </td>
            ))}
          </tr>
        ));

        return (
          <table className="table-auto border-collapse border border-gray-400">
            <thead>{tableHead}</thead>
            <tbody>{tableRows}</tbody>
          </table>
        );
      } catch (error: any) {
        console.error('Error parsing JSON:', error);
      }
    }

    return text.split(/(\s+)/).map((segment: string, segmentIndex: number) => {
      if (/[\u4e00-\u9fa5]/.test(segment)) {
        const chineseChars = segment.split('');
        const pinyinText = pinyin(segment, { style: pinyin.STYLE_TONE }).flat().join(' ');
        return (
          <span key={segmentIndex} className="inline-flex flex-col items-start">
            <span className="text-lg">{chineseChars.map((char, charIndex) => 
              <span key={charIndex}>{char}</span>
            )}</span>
            <span className={cn("text-xs", isAI ? "text-gray-500" : "text-white")}>{pinyinText}</span>
          </span>
        );
      } else {
        return <span key={segmentIndex} className={cn("text-sm", isAI ? "text-gray-500" : "text-white")}>{segment}</span>;
      }
    });
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
        <div className={`p-3 rounded-lg ${isAI ? 'bg-gray-200 text-left' : 'bg-blue-500 text-white text-right'}`}>
          <pre className={cn("whitespace-pre-wrap", isAI ? "text-gray-500" : "text-white")}>
            {parts.map((part, index) => (
              <React.Fragment key={index}>
                {renderContent(typeof part === 'string' ? part : part?.text || '')}
              </React.Fragment>
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
              <details open={isLastMessage}>
                <summary className="cursor-pointer text-sm font-medium text-gray-600 mb-1">
                  Key Words
                </summary>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  {message.language_helper?.words?.map((word: any, index: number) => (
                    <div key={index} className="bg-white p-2 rounded shadow-sm">
                      <div className="text-base font-semibold">{word.chinese}</div>
                      <div className="text-sm text-gray-500">{word.pinyin}</div>
                      <div className="text-sm">{word.english}</div>
                    </div>
                  ))}
                </div>
              </details>

              {/* Phrases */}
              <details open={isLastMessage}>
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

              {/* Sentences */}
              <details open={isLastMessage}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageRenderer;