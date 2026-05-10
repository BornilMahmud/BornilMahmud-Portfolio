import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTechStack } from "@/hooks/useTechStack";

// ─── Fallback icon (letter) when img fails ────────────────────────────────────
function TechIcon({ src, name }: { src: string; name: string }) {
  return (
    <img
      src={src}
      alt={name}
      className="w-8 h-8 object-contain"
      onError={(e) => {
        const el = e.currentTarget;
        el.style.display = "none";
        const parent = el.parentElement;
        if (parent && !parent.querySelector(".fallback-letter")) {
          const span = document.createElement("span");
          span.className = "fallback-letter text-sm font-black text-primary";
          span.textContent = name.slice(0, 2).toUpperCase();
          parent.appendChild(span);
        }
      }}
    />
  );
}

// ─── Individual tech card ─────────────────────────────────────────────────────
function TechCard({ item, index }: { item: { name: string; description: string; icon: string; level: number }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col gap-2.5 p-4 rounded-xl border border-border/30 bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-background/60 border border-border/20">
          <TechIcon src={item.icon} name={item.name} />
        </div>
        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
          {item.name}
        </h4>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-border/20 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-cyan"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${item.level}%` } : {}}
          transition={{ duration: 1.1, delay: index * 0.05 + 0.2, ease: "easeOut" }}
        />
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
const TechStackSection = () => {
  const { categories } = useTechStack();
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "frontend");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <section ref={ref} id="techstack" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            className="text-primary text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Tech Stack
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Languages &amp; <span className="gradient-text">Tools</span>
          </motion.h2>
          <motion.p
            className="text-sm text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Technologies I use to bring ideas to life
          </motion.p>
        </div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                activeId === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-105"
                  : "bg-card/50 text-muted-foreground border-border/30 hover:border-primary/40 hover:text-foreground hover:bg-card/80"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Active category panel */}
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Category title */}
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-foreground">{active?.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{active?.subtitle}</p>
          </div>

          {/* Skills grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {active?.items.map((item, i) => (
              <TechCard key={`${activeId}-${item.name}-${i}`} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
