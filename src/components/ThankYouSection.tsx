import AnimatedSection from "./AnimatedSection";
import { Sparkles, Heart } from "lucide-react";

const ThankYouSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.1) 50%, rgba(236,72,153,0.1) 100%)",
        }}
      />
      
      <div className="container px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            {/* Decorative sparkles */}
            <div className="flex justify-center gap-4 mb-6">
              <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" />
              <Sparkles className="h-8 w-8 text-violet-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
              <Sparkles className="h-6 w-6 text-pink-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Thank You for{" "}
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  background: "linear-gradient(90deg, #38bdf8, #8b5cf6, #ec4899)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                Visiting
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              I appreciate you taking the time to explore my portfolio. 
              If you have any questions or would like to collaborate, 
              feel free to reach out!
            </p>
            
            {/* Animated heart */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span>Made with</span>
              <Heart 
                className="h-5 w-5 text-rose-500 fill-rose-500" 
                style={{
                  animation: "heartbeat 1.2s ease-in-out infinite",
                }}
              />
              <span>by Bornil</span>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.15);
          }
        }
      `}</style>
    </section>
  );
};

export default ThankYouSection;
