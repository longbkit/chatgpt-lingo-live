'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VocabCard {
  id: number;
  word: string;
  translation: string;
  category: string;
}

const VocabBuilding: React.FC = () => {
  const [cards, setCards] = useState<VocabCard[]>([
    { id: 1, word: '你好', translation: 'Hello', category: 'Greetings' },
    { id: 2, word: '谢谢', translation: 'Thank you', category: 'Politeness' },
    // Add more vocab cards here
  ]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setShowTranslation(false);
  };

  const handleMarkLearned = () => {
    // Implement logic to mark card as learned
    handleNextCard();
  };

  const handleAddToReview = () => {
    // Implement logic to add card to review list
    handleNextCard();
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 flex items-center justify-between p-4 border-b">
        <h1 className="text-lg font-semibold">Vocab Building</h1>
      </header>
      
      <main className="flex-grow overflow-y-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{cards[currentCardIndex].word}</CardTitle>
          </CardHeader>
          <CardContent>
            {showTranslation && (
              <p className="text-lg mb-4">{cards[currentCardIndex].translation}</p>
            )}
            <p className="text-sm text-muted-foreground mb-4">
              Category: {cards[currentCardIndex].category}
            </p>
            <div className="flex justify-center mb-4">
              <Button
                onClick={() => setShowTranslation(!showTranslation)}
                variant="outline"
              >
                {showTranslation ? 'Hide Translation' : 'Show Translation'}
              </Button>
            </div>
            <div className="flex justify-between">
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VocabBuilding;
