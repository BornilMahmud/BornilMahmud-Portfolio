import { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const SectionPopup = ({ isOpen, onClose, children, title }: SectionPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === popupRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={popupRef}
      onClick={handleBackdropClick}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* Backdrop with blur */}
      <div
        className={cn(
          "absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Popup content */}
      <div
        ref={contentRef}
        className={cn(
          "relative w-full h-full max-w-[100vw] max-h-[100vh] overflow-y-auto",
          "transition-all duration-500 ease-out",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-5"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:scale-110 hover:bg-card group"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>

        {/* Title */}
        {title && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <h2 className="text-xl font-bold gradient-text">{title}</h2>
          </div>
        )}

        {/* Section content */}
        <div className="min-h-screen flex items-center justify-center py-20 px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SectionPopup;
