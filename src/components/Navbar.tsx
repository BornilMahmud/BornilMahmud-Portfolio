import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

function BornilLogo() {
  return (
    <span
      className="text-2xl font-black select-none text-black dark:text-white"
      style={{ letterSpacing: "0.15em", lineHeight: 1.2 }}
    >
      BORNIL
    </span>
  );
}

export interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Education", href: "#education" },
  { name: "Goals", href: "#goals" },
  { name: "Contact", href: "#contact" },
];

const CrowSVG = ({ className = "" }: { className?: string }) => (
  <svg
    width="18"
    height="14"
    viewBox="0 0 24 18"
    fill="none"
    className={className}
    style={{ display: "block" }}
  >
    <path
      d="M12 10C12 10 8.5 4 3 2C3 2 5 6 5 8C5 8 2 7 0 6C0 6 2 10 6 12H10L12 14L14 12H18C22 10 24 6 24 6C22 7 19 8 19 8C19 6 21 2 21 2C15.5 4 12 10 12 10Z"
      fill="currentColor"
    />
    <circle cx="5" cy="5" r="0.8" fill="hsl(var(--background))" />
    <circle cx="19" cy="5" r="0.8" fill="hsl(var(--background))" />
  </svg>
);

const crowVariants = {
  idle: {
    x: 0,
    y: 0,
    scaleY: 1,
    rotate: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  flap1: { scaleY: 0.7, y: -1, transition: { duration: 0.08 } },
  flap2: { scaleY: 1.1, y: -3, transition: { duration: 0.1 } },
  flap3: { scaleY: 0.75, y: -2, transition: { duration: 0.08 } },
  fly: {
    x: 12,
    y: -6,
    scaleY: 1,
    rotate: -8,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  return: {
    x: 0,
    y: 0,
    scaleY: 1,
    rotate: 0,
    transition: { duration: 0.35, ease: "easeInOut" as const },
  },
};

function useCrowAnimation() {
  const [variant, setVariant] = useState<string>("idle");
  const timeoutRef = useRef<number[]>([]);

  const trigger = useCallback(() => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
    const steps: [string, number][] = [
      ["flap1", 0],
      ["flap2", 90],
      ["flap3", 200],
      ["flap2", 290],
      ["fly", 380],
      ["return", 700],
      ["idle", 1050],
    ];
    steps.forEach(([v, delay]) => {
      const t = window.setTimeout(() => setVariant(v), delay);
      timeoutRef.current.push(t);
    });
  }, []);

  useEffect(() => {
    return () => timeoutRef.current.forEach(clearTimeout);
  }, []);

  return { variant, trigger };
}

function useTilt3D(ref: React.RefObject<HTMLElement | null>, strength = 6) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / (rect.width / 2);
      const py = (e.clientY - cy) / (rect.height / 2);
      rotateY.set(px * strength);
      rotateX.set(-py * (strength * 0.6));
    },
    [ref, rotateX, rotateY, strength, reducedMotion]
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { rotateX, rotateY, handleMove, handleLeave };
}

const NavPill = ({
  link,
  index,
  isActive,
  onClick,
}: {
  link: NavLink;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-5 py-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 overflow-hidden"
      data-testid={`button-nav-${link.name.toLowerCase()}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: hovered ? 1.12 : isActive ? 1.04 : 1,
      }}
      transition={{
        delay: index * 0.06,
        type: "spring",
        stiffness: 350,
        damping: 22,
        scale: { type: "spring", stiffness: 500, damping: 20 },
      }}
      whileTap={{ scale: 0.92 }}
    >
      <motion.span
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          background: hovered
            ? "linear-gradient(135deg, hsl(var(--primary) / 0.18) 0%, hsl(var(--primary) / 0.08) 50%, hsl(var(--primary) / 0.18) 100%)"
            : isActive
            ? "linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--primary) / 0.04) 100%)"
            : "transparent",
          boxShadow: hovered
            ? "0 0 20px hsl(var(--primary) / 0.35), 0 0 40px hsl(var(--primary) / 0.15), inset 0 0 15px hsl(var(--primary) / 0.08)"
            : isActive
            ? "0 0 12px hsl(var(--primary) / 0.2)"
            : "0 0 0 transparent",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <motion.span
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          border: hovered
            ? "1.5px solid hsl(var(--primary) / 0.5)"
            : isActive
            ? "1px solid hsl(var(--primary) / 0.25)"
            : "1px solid transparent",
        }}
        transition={{ duration: 0.25 }}
      />

      <AnimatePresence>
        {hovered && (
          <motion.span
            className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="absolute inset-0"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.15) 50%, transparent 100%)",
                width: "50%",
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full pointer-events-none"
        animate={{
          scaleX: hovered ? 1 : isActive ? 0.6 : 0,
          opacity: hovered || isActive ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
          boxShadow: "0 0 8px hsl(var(--primary) / 0.6)",
          transformOrigin: "center",
        }}
      />

      {isActive && (
        <motion.span
          className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full pointer-events-none"
          layoutId="navActiveBar"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
            boxShadow: "0 0 10px hsl(var(--primary) / 0.5)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <motion.span
        className="relative z-10 flex items-center leading-none"
        animate={{
          y: hovered ? -1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.span
          className="font-semibold text-[0.84rem] tracking-wider uppercase"
          animate={{
            color: hovered
              ? "hsl(var(--primary))"
              : isActive
              ? "hsl(var(--primary))"
              : "hsl(var(--muted-foreground))",
            textShadow: hovered
              ? "0 0 12px hsl(var(--primary) / 0.5)"
              : "0 0 0 transparent",
          }}
          transition={{ duration: 0.25 }}
        >
          {link.name}
        </motion.span>
      </motion.span>
    </motion.button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const { rotateX, rotateY, handleMove, handleLeave } = useTilt3D(navRef, 4);
  const crow = useCrowAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
        opacity: { duration: 0.2 },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
        opacity: { duration: 0.25, delay: 0.08 },
        staggerChildren: 0.05,
        delayChildren: 0.12,
      },
    },
  };

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.nav
      ref={navRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-500 ${
        isScrolled ? "shadow-lg shadow-black/5" : ""
      }`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        willChange: "transform",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "hsl(var(--background) / 0.82)",
          backdropFilter: "blur(16px) saturate(1.6)",
          WebkitBackdropFilter: "blur(16px) saturate(1.6)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.25) 30%, hsl(var(--primary) / 0.4) 50%, hsl(var(--primary) / 0.25) 70%, transparent 100%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <a
          href="#"
          className="relative group/logo flex items-center gap-3 flex-shrink-0"
          data-testid="link-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <motion.div
            className="relative flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            <BornilLogo />
            <div className="bornil-glow absolute inset-[-6px] rounded-lg pointer-events-none" />
          </motion.div>
        </a>

        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link, index) => (
            <NavPill
              key={link.name}
              link={link}
              index={index}
              isActive={activeSection === link.href.substring(1)}
              onClick={() => scrollToSection(link.href)}
            />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <motion.button
            onClick={() => {
              crow.trigger();
              scrollToSection("#contact");
            }}
            onMouseEnter={crow.trigger}
            className="relative px-5 py-2.5 rounded-full overflow-hidden group/cta focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            data-testid="button-hire-me"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)",
              boxShadow: "0 2px 12px hsl(var(--primary) / 0.3), 0 1px 3px hsl(var(--primary) / 0.2), inset 0 1px 0 hsl(var(--foreground) / 0.08)",
            }}
          >
            <motion.span
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="absolute inset-0"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                style={{
                  background: "linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.1) 50%, transparent 100%)",
                  width: "40%",
                }}
              />
            </motion.span>

            <span className="relative z-10 flex items-center gap-2">
              <motion.span
                variants={crowVariants}
                animate={crow.variant}
                className="text-primary-foreground"
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <CrowSVG />
              </motion.span>
              <span className="font-semibold text-sm tracking-wide text-primary-foreground">
                Let's Talk
              </span>
            </span>
          </motion.button>

          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <motion.button
            className="relative p-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            data-testid="button-mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            style={{
              background: isMobileMenuOpen ? "hsl(var(--primary) / 0.1)" : "transparent",
              border: "1px solid hsl(var(--primary) / 0.2)",
            }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5 text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div
              className="p-4 space-y-1"
              style={{
                background: "hsl(var(--background) / 0.96)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid hsl(var(--primary) / 0.12)",
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    variants={mobileItemVariants}
                    className="relative flex items-center w-full text-left px-4 py-3 rounded-md"
                    data-testid={`button-mobile-nav-${link.name.toLowerCase()}`}
                    whileTap={{ scale: 0.98, x: 4 }}
                    style={{
                      background: isActive
                        ? "hsl(var(--primary) / 0.08)"
                        : "transparent",
                      borderLeft: isActive
                        ? "2px solid hsl(var(--primary))"
                        : "2px solid transparent",
                    }}
                  >
                    <span
                      className={`font-medium tracking-wide text-[0.9rem] ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.span
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{
                          boxShadow: [
                            "0 0 4px hsl(var(--primary))",
                            "0 0 10px hsl(var(--primary))",
                            "0 0 4px hsl(var(--primary))",
                          ],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </motion.button>
                );
              })}

              <motion.button
                onClick={() => scrollToSection("#contact")}
                variants={mobileItemVariants}
                className="w-full mt-3 px-4 py-3 rounded-md"
                data-testid="button-mobile-hire-me"
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "hsl(var(--primary))",
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <CrowSVG className="text-primary-foreground" />
                  <span className="font-semibold tracking-wide text-sm text-primary-foreground">
                    Let's Talk
                  </span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
