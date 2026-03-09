import { cn } from "@/lib/utils";

interface SlideIndicatorProps {
  totalSlides: number;
  currentSlide: number;
  onSlideClick: (index: number) => void;
  sectionNames: string[];
}

const SlideIndicator = ({
  totalSlides,
  currentSlide,
  onSlideClick,
  sectionNames,
}: SlideIndicatorProps) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideClick(index)}
          className="group relative flex items-center"
          aria-label={`Go to ${sectionNames[index]} section`}
        >
          {/* Tooltip */}
          <span
            className={cn(
              "absolute right-8 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap",
              "bg-card/90 backdrop-blur-sm border border-border/50",
              "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
              "transition-all duration-300 pointer-events-none",
              "text-muted-foreground group-hover:text-foreground"
            )}
          >
            {sectionNames[index]}
          </span>

          {/* Indicator dot */}
          <div
            className={cn(
              "relative w-3 h-3 rounded-full transition-all duration-500",
              currentSlide === index
                ? "scale-125"
                : "scale-100 hover:scale-110"
            )}
          >
            {/* Glow effect */}
            <div
              className={cn(
                "absolute inset-0 rounded-full blur-sm transition-opacity duration-500",
                currentSlide === index ? "opacity-100" : "opacity-0"
              )}
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(185 100% 50%) 0%, hsl(280 100% 60%) 100%)",
              }}
            />

            {/* Main dot */}
            <div
              className={cn(
                "relative w-full h-full rounded-full border-2 transition-all duration-500",
                currentSlide === index
                  ? "border-transparent"
                  : "border-muted-foreground/30 hover:border-muted-foreground/60 bg-transparent"
              )}
              style={{
                backgroundImage:
                  currentSlide === index
                    ? "linear-gradient(135deg, hsl(185 100% 50%) 0%, hsl(280 100% 60%) 100%)"
                    : "none",
              }}
            />
          </div>
        </button>
      ))}

      {/* Progress line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-muted-foreground/10 -z-10" />
    </div>
  );
};

export default SlideIndicator;
