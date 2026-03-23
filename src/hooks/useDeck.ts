import { useState, useEffect } from 'react';

const STORAGE_KEY = 'umamusume-deck';

export interface Deck {
  id: string;
  name: string;
  cards: string[];
}

export const useDeck = () => {
  const [decks, setDecks] = useState<Deck[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(STORAGE_KEY);
        if (item) {
          const parsed = JSON.parse(item);
          // Migration from old array string format to new Deck object array
          if (Array.isArray(parsed) && (parsed.length === 0 || typeof parsed[0] === 'string')) {
            return Array.from({ length: 5 }, (_, i) => ({
              id: `deck-${i + 1}`,
              name: `Deck ${i + 1}`,
              cards: i === 0 ? parsed.slice(0, 6) : []
            }));
          }
          return parsed as Deck[];
        }
      }
    } catch (error) {
      console.warn("Error reading localStorage", error);
    }
    
    // Default empty decks
    return Array.from({ length: 5 }, (_, i) => ({
      id: `deck-${i + 1}`,
      name: `Deck ${i + 1}`,
      cards: []
    }));
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
      }
    } catch (error) {
      console.warn("Error setting localStorage", error);
    }
  }, [decks]);

  const renameDeck = (deckId: string, newName: string) => {
    setDecks(prev => prev.map(d => d.id === deckId ? { ...d, name: newName } : d));
  };

  const toggleCardInDeck = (deckId: string, cardId: string) => {
    let success = true;
    let isFull = false;

    setDecks(prev => prev.map(d => {
      if (d.id !== deckId) return d;
      
      const isOwned = d.cards.includes(cardId);
      if (isOwned) {
        return { ...d, cards: d.cards.filter(id => id !== cardId) };
      } else {
        if (d.cards.length >= 6) {
          success = false;
          isFull = true;
          return d;
        }
        return { ...d, cards: [...d.cards, cardId] };
      }
    }));
    
    return { success, isFull };
  };

  return {
    decks,
    renameDeck,
    toggleCardInDeck
  };
};
