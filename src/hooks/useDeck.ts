import { useState, useEffect } from 'react';

const STORAGE_KEY = 'umamusume-deck';

export const useDeck = () => {
  const [deck, setDeck] = useState<string[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(STORAGE_KEY);
        return item ? JSON.parse(item) : [];
      }
      return [];
    } catch (error) {
      console.warn("Error reading localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
      }
    } catch (error) {
      console.warn("Error setting localStorage", error);
    }
  }, [deck]);

  const toggleCard = (cardId: string) => {
    setDeck(prev => {
      const isOwned = prev.includes(cardId);
      if (isOwned) {
        return prev.filter(id => id !== cardId);
      } else {
        return [...prev, cardId];
      }
    });
  };

  return {
    deck,
    toggleCard
  };
};
