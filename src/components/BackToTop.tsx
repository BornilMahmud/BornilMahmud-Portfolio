import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full transition-all duration-500 ease-out group ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-75 pointer-events-none"
      }`}
      style={{
        background: "linear-gradient(135deg, rgba(56,189,248,0.8) 0%, rgba(139,92,246,0.8) 50%, rgba(236,72,153,0.8) 100%)",
        backgroundSize: "200% 200%",
        animation: isVisible ? "gradientSpin 3s ease-in-out infinite" : "none",
        boxShadow: "0 0 20px rgba(139,92,246,0.4), 0 0 40px rgba(236,72,153,0.2)",
      }}
      aria-label="Back to top"
    >
      {/* Glow ring */}
      <span 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: "0 0 30px rgba(56,189,248,0.6), 0 0 60px rgba(139,92,246,0.4)",
        }}
      />
      
      {/* Pulse ring animation */}
      <span 
        className="absolute inset-0 rounded-full"
        style={{
          animation: "pulseRing 2s ease-out infinite",
          background: "linear-gradient(135deg, rgba(56,189,248,0.4), rgba(236,72,153,0.4))",
        }}
      />
      
      {/* Arrow with bounce */}
      <ArrowUp className="h-5 w-5 text-white relative z-10 group-hover:animate-bounce transition-transform duration-300" />

      <style>{`
        @keyframes gradientSpin {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default BackToTop;
