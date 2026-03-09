import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxBackgroundProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
  opacity?: [number, number];
  scale?: [number, number];
}

const ParallaxBackground = ({
  children,
  className = '',
  speed = 0.3,
  direction = 'up',
  opacity,
  scale,
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(smoothProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
  
  const opacityValue = opacity 
    ? useTransform(smoothProgress, [0, 0.3, 0.7, 1], [opacity[0], 1, 1, opacity[1]])
    : undefined;
    
  const scaleValue = scale
    ? useTransform(smoothProgress, [0, 0.5, 1], [scale[0], 1, scale[1]])
    : undefined;

  return (
    <motion.div 
      ref={ref} 
      style={{ 
        y, 
        opacity: opacityValue,
        scale: scaleValue,
      }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxLayerProps {
  children?: ReactNode;
  className?: string;
  offset?: number;
}

export const ParallaxLayer = ({
  children,
  className = '',
  offset = 0.5,
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * offset, -100 * offset]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: springY }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxBackground;
