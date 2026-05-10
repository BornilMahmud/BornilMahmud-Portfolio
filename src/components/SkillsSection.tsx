import { useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { X, Wrench, Star, Trophy, CheckCircle2, ChevronRight } from "lucide-react";
import { CinematicSection, ParallaxLayer } from "./motion";
import type { Skill } from "@/lib/types";
import { defaultSkills } from "@/lib/defaultData";
import { getPopupDetails } from "@/lib/popupDetails";

// ─── Skill category + icon mapping ───────────────────────────────────────────
const SKILL_ICONS: Record<string, string> = {
  "Video Editing": "🎬",
  "Working with AI": "🤖",
  "Web Development": "💻",
  "App Development": "📱",
  "Game Development": "🎮",
  "Motion Graphics": "✨",
  "UI/UX Design": "🎨",
  "Graphic Design": "🖌️",
  "Photography": "📷",
  "3D Modeling": "🧊",
  "Music Production": "🎵",
  "Content Creation": "📸",
};

function getIcon(name: string): string {
  if (SKILL_ICONS[name]) return SKILL_ICONS[name];
  const n = name.toLowerCase();
  if (n.includes("video") || n.includes("edit")) return "🎬";
  if (n.includes("ai") || n.includes("machine") || n.includes("neural")) return "🤖";
  if (n.includes("web") || n.includes("react") || n.includes("frontend")) return "💻";
  if (n.includes("app") || n.includes("mobile") || n.includes("flutter")) return "📱";
  if (n.includes("game") || n.includes("unity") || n.includes("unreal")) return "🎮";
  if (n.includes("design") || n.includes("ui") || n.includes("ux")) return "🎨";
  if (n.includes("photo") || n.includes("camera")) return "📷";
  if (n.includes("3d") || n.includes("model") || n.includes("blender")) return "🧊";
  if (n.includes("music") || n.includes("audio") || n.includes("sound")) return "🎵";
  if (n.includes("python") || n.includes("backend") || n.includes("server")) return "⚙️";
  return "⚡";
}

function getCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("video") || n.includes("motion") || n.includes("edit") || n.includes("anime") || n.includes("cinema")) return "Creative";
  if (n.includes("web") || n.includes("app") || n.includes("game") || n.includes("develop") || n.includes("code") || n.includes("python") || n.includes("backend")) return "Development";
  if (n.includes("ai") || n.includes("machine") || n.includes("neural") || n.includes("automation")) return "AI & Tools";
  if (n.includes("design") || n.includes("photo") || n.includes("3d") || n.includes("blender")) return "Design";
  return "General";
}

const levelBadgeColors: Record<string, string> = {
  Expert: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Advanced: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

const BAR_COLORS: Record<string, string> = {
  primary: "from-primary to-primary/70",
  accent: "from-accent to-accent/70",
  cyan: "from-cyan to-cyan/70",
  emerald: "from-emerald-500 to-emerald-400",
  blue: "from-blue-500 to-blue-400",
  purple: "from-purple-500 to-purple-400",
};

interface SkillsSectionProps {
  skills?: Skill[];
}

// ─── Individual skill row card ────────────────────────────────────────────────
function SkillCard({ skill, index, onSelect }: { skill: Skill; index: number; onSelect: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const barColor = BAR_COLORS[skill.color] ?? BAR_COLORS.primary;

  return (
    <motion.div
      ref={ref}
      onClick={onSelect}
      className="group relative flex items-center gap-4 p-4 rounded-2xl glass border border-border/30 hover:border-primary/50 cursor-pointer transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2, scale: 1.01 }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
        {getIcon(skill.name)}
      </div>

      {/* Name + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate pr-2">
            {skill.name}
          </h3>
          <span className="flex-shrink-0 text-sm font-black gradient-text">{skill.percentage}%</span>
        </div>
        <div className="w-full bg-border/30 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.percentage}%` } : {}}
            transition={{ duration: 1.2, delay: index * 0.07 + 0.3, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 truncate">{skill.description}</p>
      </div>

      {/* Arrow hint */}
      <ChevronRight className="flex-shrink-0 w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/3 to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [details, setDetails] = useState(() => getPopupDetails().skills);

  useEffect(() => {
    const handler = () => setDetails(getPopupDetails().skills);
    window.addEventListener("popupDetailsUpdated", handler);
    return () => window.removeEventListener("popupDetailsUpdated", handler);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const springY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  // Build category tabs from actual skills
  const categories = ["All", ...Array.from(new Set(skills.map((s) => getCategory(s.name))))];
  const filtered = activeTab === "All" ? skills : skills.filter((s) => getCategory(s.name) === activeTab);
  const detail = selectedSkill ? details[selectedSkill.name] : null;

  // Top skill for the hero card
  const topSkill = skills.reduce((a, b) => (a.percentage >= b.percentage ? a : b), skills[0]);

  return (
    <section ref={ref} id="skills" className="py-20 relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" style={{ y: springY }} />
      <ParallaxLayer offset={0.3} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </ParallaxLayer>

      <div className="container px-4 md:px-6 relative z-10">
        <CinematicSection>
          {/* Header */}
          <div className="text-center mb-12">
            <motion.span className="text-primary text-sm font-semibold tracking-wider uppercase" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              My Expertise
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
              Skills &amp; <span className="gradient-text">Abilities</span>
            </motion.h2>
            <motion.p className="text-sm text-muted-foreground mt-3" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              Click any skill for detailed breakdown
            </motion.p>
          </div>
        </CinematicSection>

        <div className="max-w-4xl mx-auto">
          {/* Top featured skill */}
          {topSkill && (
            <motion.div
              className="mb-8 p-5 rounded-2xl glass border border-primary/30 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => setSelectedSkill(topSkill)}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-3xl flex-shrink-0">
                  {getIcon(topSkill.name)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Top Skill</span>
                    <span className="text-xs bg-primary/15 text-primary border border-primary/20 rounded-full px-2 py-0.5 font-semibold">#{1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">{topSkill.name}</h3>
                    <span className="text-2xl font-black gradient-text">{topSkill.percentage}%</span>
                  </div>
                  <div className="w-full bg-border/30 rounded-full h-3 mt-2 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${BAR_COLORS[topSkill.color] ?? BAR_COLORS.primary} shadow-lg`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${topSkill.percentage}%` } : {}}
                      transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Category tabs */}
          {categories.length > 2 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    activeTab === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                      : "bg-card/40 text-muted-foreground border-border/30 hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                  <span className="ml-1.5 opacity-60">
                    {cat === "All" ? skills.length : skills.filter((s) => getCategory(s.name) === cat).length}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Skills list */}
          <div className="space-y-3">
            {filtered.map((skill, i) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={i}
                onSelect={() => setSelectedSkill(skill)}
              />
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            className="mt-8 grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {[
              { label: "Skills", value: skills.length },
              { label: "Avg. Proficiency", value: `${Math.round(skills.reduce((s, k) => s + k.percentage, 0) / (skills.length || 1))}%` },
              { label: "Top Score", value: `${Math.max(...skills.map((s) => s.percentage))}%` },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-2xl glass border border-border/30">
                <p className="text-2xl font-black gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ─── Popup modal ──────────────────────────────────────────────────── */}
      {selectedSkill && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedSkill(null)}>
          <div className="absolute inset-0 bg-background/85 backdrop-blur-lg" />
          <motion.div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass border border-border/50 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <button onClick={() => setSelectedSkill(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-card/80 border border-border/30 transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-7">
                {/* Icon + ring */}
                <div className="flex-shrink-0 relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke={`hsl(var(--${selectedSkill.color}))`} strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 45} strokeDashoffset={2 * Math.PI * 45 - (selectedSkill.percentage / 100) * 2 * Math.PI * 45} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-0.5">
                    <span className="text-2xl">{getIcon(selectedSkill.name)}</span>
                    <span className="text-sm font-black gradient-text">{selectedSkill.percentage}%</span>
                  </div>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-2xl font-bold gradient-text">{selectedSkill.name}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 flex-wrap">
                    {detail?.level && (
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border ${levelBadgeColors[detail.level] ?? levelBadgeColors["Intermediate"]}`}>
                        <Trophy className="w-3 h-3" /> {detail.level}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border border-border/30 bg-card/60 text-muted-foreground">
                      <Star className="w-3 h-3 text-primary" /> {selectedSkill.percentage}% Proficiency
                    </span>
                  </div>
                  <div className="mt-3 w-full bg-border/30 rounded-full h-2">
                    <div className={`h-2 rounded-full bg-gradient-to-r ${BAR_COLORS[selectedSkill.color] ?? BAR_COLORS.primary}`} style={{ width: `${selectedSkill.percentage}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">About This Skill</h4>
                  <p className="text-sm text-foreground/85 leading-7">{detail?.summary || selectedSkill.description}</p>
                </div>

                {detail && detail.tools.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                      <Wrench className="w-3.5 h-3.5" /> Tools I Use
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {detail.tools.map((tool) => (
                        <span key={tool} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">{tool}</span>
                      ))}
                    </div>
                  </div>
                )}

                {detail && detail.capabilities.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Key Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {detail.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2.5 text-sm text-foreground/85">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {detail?.highlight && (
                  <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                    <p className="text-sm text-foreground/90 leading-relaxed italic">"{detail.highlight}"</p>
                  </div>
                )}
              </div>

              <button onClick={() => setSelectedSkill(null)} className="mt-7 w-full py-2.5 rounded-xl border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
