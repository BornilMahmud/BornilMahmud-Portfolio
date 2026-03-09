import { useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { X, Wrench, Star, Trophy, CheckCircle2 } from "lucide-react";
import { CinematicSection, SkillCircle, ParallaxLayer } from "./motion";
import type { Skill } from "@/lib/types";
import { defaultSkills } from "@/lib/defaultData";
import { getPopupDetails } from "@/lib/popupDetails";

const levelBadgeColors: Record<string, string> = {
  Expert: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Advanced: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

interface SkillsSectionProps {
  skills?: Skill[];
}

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [details, setDetails] = useState(() => getPopupDetails().skills);

  useEffect(() => {
    const handler = () => setDetails(getPopupDetails().skills);
    window.addEventListener('popupDetailsUpdated', handler);
    return () => window.removeEventListener('popupDetailsUpdated', handler);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const springY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  const detail = selectedSkill ? details[selectedSkill.name] : null;

  return (
    <section ref={ref} id="skills" className="py-20 relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" style={{ y: springY }} />
      <ParallaxLayer offset={0.35} className="absolute inset-0">
        <motion.div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" style={{ scale: orbScale }} />
      </ParallaxLayer>

      <div className="container px-4 md:px-6 relative z-10">
        <CinematicSection>
          <div className="text-center mb-16">
            <motion.span className="text-primary text-sm font-semibold tracking-wider uppercase" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              My Skills
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
              What I <span className="gradient-text">Bring</span>
            </motion.h2>
            <motion.p className="text-sm text-muted-foreground mt-3" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              Click any skill to see tools, capabilities & more
            </motion.p>
          </div>
        </CinematicSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCircle key={skill.name} name={skill.name} percentage={skill.percentage} description={skill.description} color={skill.color} delay={index * 0.1} onClick={() => setSelectedSkill(skill)} />
          ))}
        </div>
      </div>

      {selectedSkill && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedSkill(null)}>
          <div className="absolute inset-0 bg-background/85 backdrop-blur-lg" />
          <div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass border border-border/50 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <button onClick={() => setSelectedSkill(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-card/80 border border-border/30 transition-colors" aria-label="Close">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-7">
                <div className="flex-shrink-0 relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke={`hsl(var(--${selectedSkill.color}))`} strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 45} strokeDashoffset={2 * Math.PI * 45 - (selectedSkill.percentage / 100) * 2 * Math.PI * 45} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold gradient-text">{selectedSkill.percentage}%</span>
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
                  <div className="mt-3 w-full bg-border/30 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${selectedSkill.percentage}%` }} />
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
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
