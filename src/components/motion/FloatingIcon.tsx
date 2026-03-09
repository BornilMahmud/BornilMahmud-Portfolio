import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingIconProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  orbit?: boolean;
  orbitRadius?: number;
}

const FloatingIcon = ({
  children,
  delay = 0,
  duration = 6,
  className = '',
  orbit = false,
  orbitRadius = 80,
}: FloatingIconProps) => {
  if (orbit) {
    return (
      <motion.div
        className={className}
        animate={{
          x: [orbitRadius, 0, -orbitRadius, 0, orbitRadius],
          y: [0, orbitRadius, 0, -orbitRadius, 0],
        }}
        transition={{
          duration: duration * 2,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [-10, 10, -10],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingIcon;
