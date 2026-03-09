import { useEffect, useState, useRef, useCallback } from 'react';

interface StarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  life: number;
  hue: number;
}

const StarSVG = ({ size, opacity, rotation, color }: { size: number; opacity: number; rotation: number; color: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ opacity, transform: `rotate(${rotation}deg)`, position: 'absolute' }}
  >
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const MouseFollower = () => {
  const [stars, setStars] = useState<StarParticle[]>([]);
  const starIdRef = useRef(0);
  const lastStarPos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  const spawnStar = useCallback((x: number, y: number) => {
    const dx = x - lastStarPos.current.x;
    const dy = y - lastStarPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 12) return;

    lastStarPos.current = { x, y };
    const offsetX = (Math.random() - 0.5) * 24;
    const offsetY = (Math.random() - 0.5) * 24;

    const newStar: StarParticle = {
      id: starIdRef.current++,
      x: x + offsetX,
      y: y + offsetY,
      size: Math.random() * 16 + 14,
      opacity: Math.random() * 0.4 + 0.6,
      rotation: Math.random() * 360,
      life: 1,
      hue: Math.floor(Math.random() * 360),
    };

    setStars(prev => [...prev.slice(-25), newStar]);
  }, []);

  useEffect(() => {
    const decay = () => {
      setStars(prev => {
        const updated = prev
          .map(s => ({ ...s, life: s.life - 0.018, opacity: s.opacity * 0.97, y: s.y - 0.4, rotation: s.rotation + 2 }))
          .filter(s => s.life > 0);
        return updated;
      });
      animFrameRef.current = requestAnimationFrame(decay);
    };
    animFrameRef.current = requestAnimationFrame(decay);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      spawnStar(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [spawnStar]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden="true"
    >
      {stars.map(star => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            transform: `translate(-50%, -50%)`,
            pointerEvents: 'none',
          }}
        >
          <StarSVG
            size={star.size}
            opacity={star.opacity * star.life}
            rotation={star.rotation}
            color={`hsl(${star.hue} 85% 60% / ${0.75 * star.life})`}
          />
        </div>
      ))}
    </div>
  );
};

export default MouseFollower;
