import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillCircleProps {
  name: string;
  percentage: number;
  description: string;
  color: string;
  delay?: number;
  onClick?: () => void;
}

const SkillCircle = ({ name, percentage, description, color, delay = 0, onClick }: SkillCircleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={`group relative flex flex-col items-center p-6 rounded-2xl glass border border-border/30 hover:border-primary/50 transition-all duration-500 ${onClick ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="relative w-28 h-28 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="6"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={`hsl(var(--${color}))`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : {}}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: 'easeOut' }}
            className="drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
          />
        </svg>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
        >
          <span className="text-2xl font-bold gradient-text">{percentage}%</span>
        </motion.div>
      </div>

      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
        {name}
      </h3>

      <p className="text-sm text-muted-foreground text-center leading-relaxed">
        {description}
      </p>

      {onClick && (
        <span className="mt-3 text-xs text-primary font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Tap for details →
        </span>
      )}

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

export default SkillCircle;
