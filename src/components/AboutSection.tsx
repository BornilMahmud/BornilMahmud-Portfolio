import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Heart, Zap, Target } from "lucide-react";
import { CinematicSection, ParallaxLayer } from "./motion";
import { useAdminUnlock } from "@/hooks/useAdminUnlock";

const highlights = [
  { icon: Heart, label: "Passionate", color: "primary" },
  { icon: Zap, label: "Creative", color: "accent" },
  { icon: Target, label: "Focused", color: "cyan" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { isUnlocked, handleClick } = useAdminUnlock();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const springY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background"
        style={{ y: springY }}
      />
      <ParallaxLayer offset={0.2} className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"
          style={{ opacity: gradientOpacity }}
        />
      </ParallaxLayer>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <CinematicSection>
            <div className="text-center mb-12">
              <motion.span 
                className="text-primary text-sm font-semibold tracking-wider uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                About Me
              </motion.span>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Creative Mind, <span className="gradient-text">Technical Soul</span>
              </motion.h2>
            </div>
          </CinematicSection>

          <motion.div 
            className="p-8 rounded-2xl glass border border-border/30 shadow-xl"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I am{" "}
              <span
                className="text-foreground font-semibold cursor-default select-none"
                onClick={handleClick}
                data-testid="text-bornil-mahmud-unlock"
              >
                Bornil Mahmud
              </span>
              , a creative video editor 
              and aspiring developer from <span className="text-primary">Bangladesh</span>, specializing in 
              short-form videos, anime-style edits, and high-engagement social media content. I am actively 
              developing my expertise in web and backend development while combining <span className="text-accent">creative storytelling with modern technology</span> to 
              produce impactful and scalable digital solutions.
            </motion.p>

            {isUnlocked && (
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <a
                  href="/admin"
                  className="px-4 py-2 rounded-md glass border border-primary/50 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-300"
                  data-testid="link-admin-panel"
                >
                  Admin Panel
                </a>
              </motion.div>
            )}

            <div className="flex justify-center gap-6 flex-wrap">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/30 group hover:border-primary/50 transition-colors cursor-default"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <item.icon className={`w-4 h-4 text-${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
