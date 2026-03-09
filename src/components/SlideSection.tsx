import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  isVisible?: boolean;
  index?: number;
}

const SlideSection = ({
  id,
  children,
  className,
  isVisible = false,
  index = 0,
}: SlideSectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen w-full flex items-center justify-center relative overflow-hidden",
        "transition-all duration-1000 ease-out",
        className
      )}
    >
      {/* Slide content with animation */}
      <div
        className={cn(
          "w-full h-full transition-all duration-1000 ease-out",
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95"
        )}
        style={{
          transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default SlideSection;
