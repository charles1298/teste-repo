import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

const EMOJIS = ['🥕', '🐴', '⭐', '🏆', '💖', '🎀', '✨', '🌸', '🎉', '🍀'];

interface FallingItem {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const EasterEgg = () => {
  const [activated, setActivated] = useState(false);
  const inputSequenceRef = useRef<string[]>([]);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Konami Code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const seq = inputSequenceRef.current;
      seq.push(e.key);
      if (seq.length > KONAMI_CODE.length) seq.shift();
      if (seq.length === KONAMI_CODE.length &&
          seq.every((key, i) => key === KONAMI_CODE[i])) {
        triggerEasterEgg();
        inputSequenceRef.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Secret: tap the logo 7 times fast (mobile easter egg)
  useEffect(() => {
    const logo = document.querySelector('img[alt="Oguri Cap"]') ||
                 document.querySelector('img[alt="Oguri Cap Logo"]');
    
    if (!logo) return;

    let tapTimer: ReturnType<typeof setTimeout>;
    
    const handleClick = () => {
      setClickCount(prev => {
        const newCount = prev + 1;
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => setClickCount(0), 2000);
        
        if (newCount >= 7) {
          triggerEasterEgg();
          return 0;
        }
        return newCount;
      });
    };

    logo.addEventListener('click', handleClick);
    return () => {
      logo.removeEventListener('click', handleClick);
      clearTimeout(tapTimer);
    };
  }, [clickCount]);

  const triggerEasterEgg = useCallback(() => {
    if (activated) return;
    setActivated(true);
    setShowMessage(true);

    // Generate falling items
    const newItems: FallingItem[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      size: 16 + Math.random() * 32,
      rotation: Math.random() * 720 - 360,
    }));
    setItems(newItems);

    // Clear after animation
    setTimeout(() => {
      setActivated(false);
      setShowMessage(false);
      setItems([]);
    }, 6000);
  }, [activated]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
        >
          {/* Falling items */}
          {items.map(item => (
            <motion.span
              key={item.id}
              initial={{ 
                y: -60, 
                x: `${item.x}vw`, 
                opacity: 1, 
                rotate: 0,
                scale: 0 
              }}
              animate={{ 
                y: '110vh', 
                opacity: [1, 1, 1, 0],
                rotate: item.rotation,
                scale: [0, 1.2, 1, 0.8]
              }}
              transition={{ 
                duration: item.duration, 
                delay: item.delay,
                ease: 'easeIn'
              }}
              style={{ 
                fontSize: item.size,
                position: 'absolute',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}
            >
              {item.emoji}
            </motion.span>
          ))}

          {/* Message banner */}
          {showMessage && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 15,
                delay: 0.5 
              }}
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="bg-gradient-to-br from-pink-500 via-pink-400 to-yellow-400 text-white px-8 py-6 rounded-3xl shadow-2xl border-4 border-white/50 text-center"
                   style={{ 
                     textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                     boxShadow: '0 0 60px rgba(236,72,153,0.5), 0 10px 40px rgba(0,0,0,0.2)' 
                   }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="text-4xl mb-2"
                >
                  🐴✨🥕
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-black mb-1">
                  Oguri Cap Supremacy!
                </h2>
                <p className="text-pink-100 text-sm md:text-base font-semibold">
                  A fome infinita da Oguri foi ativada! 🥕🥕🥕
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
