import { useEffect, useState, useRef } from 'react';

interface Props {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
  labelLeft?: string;
  labelRight?: string;
}

export default function ProgressBar({
  value,
  max,
  className = '',
  showLabel = true,
  labelLeft,
  labelRight,
}: Props) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) {
      setWidth((value / max) * 100);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => setWidth((value / max) * 100), 300);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, max]);

  return (
    <div ref={ref} className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
            {labelLeft}
          </span>
          <span className="text-xs font-black" style={{ color: 'var(--green-neon)' }}>
            {labelRight}
          </span>
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
