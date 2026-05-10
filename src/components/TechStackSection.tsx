import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TechItem {
  name: string;
  description: string;
  icon: string;
  level: number;
}

interface TechCategory {
  id: string;
  label: string;
  emoji: string;
  title: string;
  subtitle: string;
  items: TechItem[];
}

// ─── Devicon CDN helper ──────────────────────────────────────────────────────
const D = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    emoji: "🖥️",
    title: "Frontend Development",
    subtitle: "Creating beautiful, responsive user interfaces",
    items: [
      { name: "HTML", description: "Structuring web content effectively", icon: D("html5"), level: 95 },
      { name: "CSS", description: "Designing responsive and modern UIs", icon: D("css3"), level: 90 },
      { name: "JavaScript", description: "Dynamic and interactive web experiences", icon: D("javascript"), level: 88 },
      { name: "TypeScript", description: "Type-safe modern JavaScript development", icon: D("typescript"), level: 82 },
      { name: "React.js", description: "Building scalable single-page applications", icon: D("react"), level: 85 },
      { name: "Next.js", description: "Server-side rendering & static generation", icon: D("nextjs"), level: 75 },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI", icon: D("tailwindcss"), level: 90 },
      { name: "Bootstrap", description: "Responsive, mobile-first CSS framework", icon: D("bootstrap"), level: 85 },
      { name: "Framer Motion", description: "Declarative animations & gestures for React", icon: D("framermotion"), level: 78 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    emoji: "⚙️",
    title: "Backend Development",
    subtitle: "Building robust server-side applications",
    items: [
      { name: "Python", description: "Versatile scripting and backend development", icon: D("python"), level: 85 },
      { name: "Django", description: "High-level Python web framework", icon: D("django", "plain"), level: 80 },
      { name: "PHP", description: "Server-side scripting language", icon: D("php"), level: 78 },
      { name: "Laravel", description: "Elegant PHP web application framework", icon: D("laravel", "original"), level: 75 },
      { name: "Node.js", description: "Server-side JavaScript runtime", icon: D("nodejs"), level: 80 },
      { name: "Express.js", description: "Minimalist Node.js web framework", icon: D("express"), level: 78 },
      { name: "REST API", description: "RESTful architecture & API best practices", icon: D("nodejs"), level: 85 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    emoji: "🗄️",
    title: "Database Management",
    subtitle: "Storing and managing data efficiently",
    items: [
      { name: "MySQL", description: "Reliable relational database management", icon: D("mysql"), level: 85 },
      { name: "PostgreSQL", description: "Advanced open-source relational database", icon: D("postgresql"), level: 80 },
      { name: "MongoDB", description: "Flexible NoSQL document database", icon: D("mongodb"), level: 78 },
      { name: "SQLite", description: "Lightweight embedded database", icon: D("sqlite"), level: 80 },
      { name: "Firebase", description: "Real-time cloud database by Google", icon: D("firebase"), level: 75 },
      { name: "Supabase", description: "Open-source Firebase alternative with PostgreSQL", icon: D("supabase"), level: 72 },
    ],
  },
  {
    id: "deployment",
    label: "Deployment",
    emoji: "🚀",
    title: "Deployment & DevOps",
    subtitle: "Shipping and maintaining production apps",
    items: [
      { name: "Git", description: "Distributed version control system", icon: D("git"), level: 90 },
      { name: "GitHub", description: "Code hosting & collaboration platform", icon: D("github"), level: 88 },
      { name: "Vercel", description: "Frontend cloud deployment platform", icon: D("vercel"), level: 85 },
      { name: "Netlify", description: "Modern web hosting & CI/CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", level: 80 },
      { name: "Linux", description: "Server administration & command line", icon: D("linux"), level: 75 },
      { name: "Docker", description: "Containerized application deployment", icon: D("docker"), level: 65 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    emoji: "🛠️",
    title: "Development Tools",
    subtitle: "Tools that power my daily workflow",
    items: [
      { name: "VS Code", description: "Primary code editor with extensions", icon: D("vscode"), level: 95 },
      { name: "Postman", description: "API testing and documentation", icon: D("postman"), level: 88 },
      { name: "Figma", description: "UI/UX design and prototyping", icon: D("figma"), level: 75 },
      { name: "npm", description: "Node.js package manager", icon: D("npm"), level: 88 },
      { name: "Premiere Pro", description: "Professional video editing suite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg", level: 95 },
      { name: "After Effects", description: "Motion graphics & visual effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg", level: 92 },
    ],
  },
  {
    id: "aitools",
    label: "AI Tools",
    emoji: "🤖",
    title: "AI Tools",
    subtitle: "Leveraging AI to boost productivity and create smarter solutions",
    items: [
      { name: "ChatGPT", description: "AI assistant for coding and content creation", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", level: 95 },
      { name: "GitHub Copilot", description: "AI-powered code completion assistant", icon: D("github"), level: 90 },
      { name: "Gemini", description: "Google AI for research and automation", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg", level: 85 },
      { name: "Claude AI", description: "AI for code review, writing & analysis", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Claude_AI_logo.svg", level: 85 },
      { name: "DeepSeek", description: "Advanced AI for code generation & reasoning", icon: "https://upload.wikimedia.org/wikipedia/commons/e/ec/DeepSeek_logo.svg", level: 80 },
      { name: "Midjourney", description: "AI image generation for creative projects", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png", level: 82 },
    ],
  },
  {
    id: "video",
    label: "Video",
    emoji: "🎬",
    title: "Video Editing",
    subtitle: "Crafting cinematic stories through professional video production",
    items: [
      { name: "Premiere Pro", description: "Industry-standard professional video editing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg", level: 95 },
      { name: "After Effects", description: "Motion graphics, VFX & compositing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg", level: 92 },
      { name: "DaVinci Resolve", description: "Professional color grading & editing", icon: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg", level: 88 },
      { name: "CapCut", description: "Fast short-form content editing for social media", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c0/CapCut_logo_2022.svg", level: 90 },
      { name: "Canva", description: "Quick graphics and thumbnail creation", icon: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Canva_Logo.svg", level: 85 },
    ],
  },
];

// ─── Fallback icon component (letter-based when img fails) ───────────────────
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

// ─── Individual tech card ────────────────────────────────────────────────────
function TechCard({ item, index }: { item: TechItem; index: number }) {
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
        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{item.name}</h4>
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
  const [activeId, setActiveId] = useState("frontend");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const active = TECH_CATEGORIES.find((c) => c.id === activeId) ?? TECH_CATEGORIES[0];

  const stats = TECH_CATEGORIES.map((c) => ({ label: c.label, count: c.items.length }));

  return (
    <section ref={ref} id="techstack" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background pointer-events-none" />
      {/* Glowing orb background */}
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
          {TECH_CATEGORIES.map((cat) => (
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
          {/* Category title block */}
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-foreground">{active.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{active.subtitle}</p>
            <p className="text-xs text-primary/70 mt-1">
              Showing {active.items.length} of {active.items.length} skills
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {active.items.map((item, i) => (
              <TechCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              onClick={() => setActiveId(TECH_CATEGORIES.find((c) => c.label === s.label)?.id ?? activeId)}
              className={`cursor-pointer text-center p-4 rounded-xl border transition-all duration-200 ${
                active.label === s.label
                  ? "border-primary/50 bg-primary/10"
                  : "border-border/30 bg-card/30 hover:border-primary/30 hover:bg-card/50"
              }`}
            >
              <p className={`text-2xl font-black ${active.label === s.label ? "gradient-text" : "text-foreground"}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
