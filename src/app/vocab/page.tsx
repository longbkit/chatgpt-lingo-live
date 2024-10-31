'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLearnedWords, increaseSeenCount, updateLearnedDictionary, getWordsForReview } from '@/apis/language-backend';
import { Avatar } from "@/components/ui/avatar";
import { Bot, Sparkles, Loader } from 'lucide-react';
import Markdown from "react-markdown";
import { cn } from '@/lib/utils';

const profileId = 'fa307f6f-953c-4354-aac6-845911381506';

interface VocabCard {
  id: number;
  word: string;
  translation: string;
  category: string;
}

const VocabBuilding: React.FC = () => {
  // const [cards, setCards] = useState<VocabCard[]>([
  //   { id: 1, word: '你好', translation: 'Hello', category: 'Greetings' },
  //   { id: 2, word: '谢谢', translation: 'Thank you', category: 'Politeness' },
  //   // Add more vocab cards here
  // ]);

  const [words, setWords] = useState<any[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [wordsForReview, setWordsForReview] = useState<any[]>([]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % wordsForReview.length);
    setShowTranslation(false);
  };

  const handleMarkLearned = () => {
    handleLearnedDictionary(wordsForReview[currentCardIndex], true);
    handleNextCard();
  };

  const handleAddToReview = () => {
    handleLearnedDictionary(wordsForReview[currentCardIndex], false);
    handleNextCard();
  };

  const handleWordClick = async (word: any) => {
    if (selectedWord === word.dictionary.text) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word.dictionary.text);

      const response = await increaseSeenCount(profileId, word.dictionary.id);
      setWords(prevWords => prevWords.map((w: any) => (
        word.dictionary.text === w.dictionary.text ?
        {
          ...w,
          learned_dictionary: response
        } : w)
      ));

      console.log(`Seen count increased to ${response.seen_count} for word ${word.dictionary.text}, id = ${word.dictionary.id}`, JSON.stringify(response, null, 2));
    }
  };

  const handleLearnedDictionary = async (word: any, isCorrect: boolean) => {
    console.log(`Learned: ${word.dictionary.text}`);
    const response = await updateLearnedDictionary(profileId, word.dictionary.id, isCorrect);
    console.log(`Dictionary updated to status ${response.status} for word ${word.dictionary.text}, id = ${word.dictionary.id}`, JSON.stringify(response, null, 2));
    setWords(prevWords => prevWords.map((w: any) => (
      word.dictionary.text === w.dictionary.text ?
      {
        ...w,
        ...response
      } : w)
    ));

    setSelectedWord(null);
  };

  useEffect(() => {
    const fetchWords = async () => {
      const words = await getLearnedWords(profileId);
      setWords(words);

      const wordsForReview = await getWordsForReview(profileId);
      setWordsForReview(wordsForReview);
    }
    fetchWords();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow p-4">
        <h2 className="text-lg font-semibold mb-4">
          Words to learn <span className="text-blue-500">({wordsForReview.length})</span> - Progress: {currentCardIndex + 1}/{wordsForReview.length}
        </h2>
        {wordsForReview.length > 0 && <Card className="mb-6">
          <CardHeader>
            <CardTitle>{wordsForReview[currentCardIndex].dictionary.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <details className="mb-4">
              <summary className="cursor-pointer text-blue-500" onClick={() => setShowTranslation(!showTranslation)}>
                {showTranslation ? 'Hide Translation' : 'Show Translation'}
              </summary>
              <p className="text-lg mb-0 text-gray-500">{wordsForReview[currentCardIndex].dictionary.pinyin}</p>
              <p className="text-lg mb-4 text-blue-700">{wordsForReview[currentCardIndex].dictionary.definition}</p>
            </details>
            <div className="flex justify-between mb-4">
              <div className='flex gap-2'>
                <Button
                  onClick={handleMarkLearned}
                  variant="default"
                >
                  Mark Learned
                </Button>
                <Button
                  onClick={handleAddToReview}
                  variant="secondary"
                >
                  Add to Review
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              <span>Seen:</span> <span className="font-semibold">{wordsForReview[currentCardIndex].seen_count}</span> | &nbsp;
              <span>Reviewed:</span> <span className="font-semibold">{wordsForReview[currentCardIndex].review_count}</span> | &nbsp;
              <span>Updated:</span> <span className="font-semibold">{wordsForReview[currentCardIndex].updated_at ? new Date(wordsForReview[currentCardIndex].updated_at).toLocaleDateString() : 'N/A'}</span>
            </p>
          </CardContent>
        </Card>}

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-4">
            Learned Words <span className="text-blue-500">({words.length})</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {words.map((word: any, index: number) => (
              <div 
                key={index} 
                className={`p-2 min-w-24 rounded shadow-sm cursor-pointer hover:cursor-pointer group ${
                    word.status === 'mastered'
                      ? 'bg-green-100'
                      : word.status === 'reviewing'
                        ? 'bg-blue-200'
                        : word.status === 'learning'
                          ? 'bg-yellow-100'
                          : (word.status === 'new' && word.seen_count < 3)
                            ? 'bg-yellow-200'
                            : (word.status === 'new' && word.seen_count >= 3)
                              ? 'bg-red-400' : 'bg-white'
                } ${selectedWord === word.dictionary.text ? 'row-span-2' : ''}`}
                onClick={() => handleWordClick(word)}
              >
                <div className='relative'>
                  <div className="text-xs text-gray-500">
                    Seen: {word.seen_count} |
                    Learned: {word.review_count}
                  </div>
                  <div className="text-base font-semibold">{word.dictionary.text}</div>
                  {selectedWord === word.dictionary.text && (
                    <>
                      <div className="text-sm text-gray-500">{word.dictionary.pinyin}</div>
                      <div className="text-sm">{word.dictionary.definition}</div>
                      <div className="flex flex-col gap-2 pt-2 pb-2 mt-auto">
                        <Button className="bg-green-500 text-white px-2 py-1 w-full rounded" onClick={() => handleLearnedDictionary(word, true)}>Learned</Button>
                        <Button className="bg-yellow-500 text-white px-2 py-1 w-full rounded" onClick={() => handleLearnedDictionary(word, false)}>Need Review</Button>
                      </div>
                  </>)}
                  <div className="text-xs text-gray-500">
                    {word.updated_at && `${new Date(word.updated_at).toLocaleDateString()}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VocabBuilding;
