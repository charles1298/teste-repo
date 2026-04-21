import { useRef, useEffect, useState } from 'react';
import { Clock, Plus, TrendingDown } from 'lucide-react';
import type { Product } from '../hooks/useRealtimeData';

interface Props {
  products: Product[];
  formatPrice: (v: number) => string;
}

export default function ProductCarousel({ products, formatPrice }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isPaused) return;

    const interval = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 2) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 174, behavior: 'smooth' });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const discount = (old: number, current: number) => {
    const pct = Math.round(((old - current) / old) * 100);
    return pct > 0 ? `-${pct}%` : null;
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div ref={scrollRef} className="carousel-container">
        {products.map((product, i) => {
          const disc = discount(product.oldPrice, product.price);
          return (
            <div
              key={product.id}
              className="carousel-item animate-fadeInUp"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Image */}
              <div className="relative w-full aspect-square bg-[rgba(255,255,255,0.03)] flex items-center justify-center p-3">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
                {disc && (
                  <span className="absolute top-2 left-2 bg-[rgba(255,82,82,0.9)] text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                    <TrendingDown size={8} /> {disc}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3 pt-2 flex flex-col gap-1.5">
                <h4
                  className="text-[12px] font-bold leading-snug line-clamp-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {product.name}
                </h4>
                <p
                  className="text-[10px] font-medium"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {product.store}
                </p>
                <div className="flex items-end justify-between mt-auto pt-1">
                  <div>
                    <p
                      className="text-[9px] line-through"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {formatPrice(product.oldPrice)}
                    </p>
                    <span className="text-[15px] font-black neon-text leading-none">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <button
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: 'rgba(0, 230, 118, 0.1)',
                      color: 'var(--green-neon)',
                    }}
                    onMouseEnter={e => {
                      (e.target as HTMLElement).style.background = 'var(--green-neon)';
                      (e.target as HTMLElement).style.color = '#060B14';
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLElement).style.background = 'rgba(0, 230, 118, 0.1)';
                      (e.target as HTMLElement).style.color = 'var(--green-neon)';
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <p
                  className="text-[9px] flex items-center gap-1 mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Clock size={9} /> {product.updatedMinutes} min atrás
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
