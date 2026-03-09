import { useEffect, useState, useRef } from "react";

// Vibrant colors that contrast well on blue background
const vibrantColors = [
  "hsl(185, 100%, 50%)",   // Cyan
  "hsl(280, 100%, 65%)",   // Violet
  "hsl(320, 100%, 60%)",   // Magenta
  "hsl(160, 100%, 45%)",   // Teal
  "hsl(120, 100%, 55%)",   // Neon Green
  "hsl(190, 100%, 55%)",   // Aqua
];

const getRandomColors = () => {
  const shuffled = [...vibrantColors].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
};

interface AnimatedLogoProps {
  size?: number;
  showCounter?: boolean;
  counterValue?: number;
}

const AnimatedLogo = ({ 
  size = 120, 
  showCounter = true,
  counterValue = 100 
}: AnimatedLogoProps) => {
  const [colors] = useState(getRandomColors);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  // Stock counter animation
  useEffect(() => {
    if (hasAnimated || !showCounter) return;
    
    const duration = 2500;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease-out function
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * counterValue));

      if (currentStep >= steps) {
        clearInterval(interval);
        setCount(counterValue);
        setHasAnimated(true);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [counterValue, hasAnimated, showCounter]);

  const innerPadding = size * 0.15; // 15% padding
  const ringWidth = size * 0.08;
  const innerSize = size - ringWidth * 2 - innerPadding;

  return (
    <div 
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: showCounter ? size + 40 : size }}
    >
      {/* Outer rotating ring */}
      <div 
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(from 0deg, ${colors[0]}, ${colors[1]}, ${colors[0]})`,
          animation: "logoRotate 12s linear infinite",
          filter: "blur(1px)",
        }}
      />

      {/* Glow effect from rotating colors */}
      <div 
        className="absolute rounded-full opacity-60"
        style={{
          width: size + 20,
          height: size + 20,
          background: `conic-gradient(from 0deg, ${colors[0]}40, ${colors[1]}40, ${colors[0]}40)`,
          animation: "logoRotate 12s linear infinite",
          filter: "blur(15px)",
        }}
      />

      {/* Inner circle background */}
      <div 
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: size - ringWidth * 2,
          height: size - ringWidth * 2,
          background: "linear-gradient(135deg, hsl(240 20% 8%) 0%, hsl(240 20% 12%) 100%)",
          boxShadow: "inset 0 0 30px hsl(0 0% 0% / 0.5)",
        }}
      >
        {/* BM Text */}
        <span 
          className="font-bold select-none"
          style={{
            fontSize: innerSize * 0.45,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: `drop-shadow(0 0 10px ${colors[0]}60)`,
          }}
        >
          BM
        </span>
      </div>

      {/* Stock counter */}
      {showCounter && (
        <div 
          ref={counterRef}
          className="absolute flex items-center justify-center"
          style={{
            bottom: -35,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <span 
            className="font-medium tracking-wider"
            style={{
              fontSize: size * 0.14,
              fontFamily: "'DM Sans', sans-serif",
              background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.9,
            }}
          >
            {count}
          </span>
        </div>
      )}

      <style>{`
        @keyframes logoRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
