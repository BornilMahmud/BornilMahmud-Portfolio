import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, Sparkles, Share2 } from "lucide-react";
import SocialLinksPopup from "./SocialLinksPopup";
import { AnimatedText, MagneticButton, ParallaxLayer } from "./motion";

// Import images
import coverImage from "@/assets/images/cover.jpg";
import profilePhoto from "@/assets/images/photo.jpg";

const HeroSection = () => {
  const [isSocialPopupOpen, setIsSocialPopupOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Parallax transforms
  const orbX1 = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const orbY1 = useTransform(smoothMouseY, [-500, 500], [-30, 30]);
  const orbX2 = useTransform(smoothMouseX, [-500, 500], [20, -20]);
  const orbY2 = useTransform(smoothMouseY, [-500, 500], [20, -20]);
  const photoX = useTransform(smoothMouseX, [-500, 500], [-10, 10]);
  const photoY = useTransform(smoothMouseY, [-500, 500], [-10, 10]);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Cover Image Background with Parallax */}
        {coverImage && (
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ 
              backgroundImage: `url(${coverImage})`,
              y: backgroundY,
            }}
          />
        )}

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />

        {/* Animated background grid */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </motion.div>

        {/* Floating orbs with mouse + scroll parallax */}
        <ParallaxLayer offset={0.4} className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-primary/30 to-accent/15 rounded-full blur-3xl"
            style={{ x: orbX1, y: orbY1 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0.6} className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent/20 to-cyan/15 rounded-full blur-3xl"
            style={{ x: orbX2, y: orbY2 }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0.3} className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-cyan/25 to-primary/15 rounded-full blur-2xl"
            animate={{ 
              y: [-20, 20, -20],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </ParallaxLayer>

        <div className="container relative z-10 px-4 md:px-6 py-20">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Profile Photo with parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ x: photoX, y: photoY }}
            >
              <div className="relative group">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-cyan rounded-full blur-md"
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  }}
                />
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-card to-card/80 border-2 border-border/50 flex items-center justify-center overflow-hidden shadow-2xl">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Bornil Mahmud"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 md:w-20 md:h-20 text-muted-foreground/50" />
                  )}
                </div>
              </div>
            </motion.div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30"
                animate={{ 
                  boxShadow: [
                    "0 0 20px hsl(var(--primary) / 0.2)",
                    "0 0 40px hsl(var(--primary) / 0.4)",
                    "0 0 20px hsl(var(--primary) / 0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm text-primary font-medium">
                  Available for freelance work
                </span>
              </motion.div>
            </motion.div>

            {/* Name with animated text */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                <AnimatedText 
                  text="Bornil Mahmud" 
                  className="gradient-text"
                  delay={0.5}
                  staggerChildren={0.08}
                />
                <motion.span 
                  className="text-foreground/40 text-2xl md:text-3xl lg:text-4xl ml-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  (BM)
                </motion.span>
              </h1>
              <motion.p 
                className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Quick Learner with Patience
              </motion.p>
            </motion.div>

            {/* CTA Buttons with magnetic effect */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <MagneticButton strength={0.2}>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={scrollToServices}
                  className="group hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Hire Me
                    <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                  </span>
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Button
                  variant="glass"
                  size="lg"
                  onClick={() => setIsSocialPopupOpen(true)}
                  className="group hover:bg-pink-600 hover:border-pink-500 hover:text-foreground transition-all duration-300"
                >
                  <Share2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Find Me Online
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Button
                  variant="glass"
                  size="lg"
                  onClick={scrollToContact}
                  className="group hover:bg-cyan-600 hover:border-cyan-500 hover:text-foreground transition-all duration-300"
                >
                  Contact Me
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator with animation */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <motion.div 
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-1 h-2 rounded-full bg-primary"
              animate={{ 
                y: [0, 8, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Social Links Popup */}
      <SocialLinksPopup
        isOpen={isSocialPopupOpen}
        onClose={() => setIsSocialPopupOpen(false)}
      />
    </>
  );
};

export default HeroSection;
