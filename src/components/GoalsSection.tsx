import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Code, Film, Lightbulb, Target, Rocket, Star, X, CheckCircle2, Clock, Flame } from "lucide-react";
import { CinematicSection } from "./motion";
import type { Goal } from "@/lib/types";
import { defaultGoals } from "@/lib/defaultData";
import { getPopupDetails } from "@/lib/popupDetails";

function getGoalIcon(title: string) {
  if (title.toLowerCase().includes('freelanc')) return Briefcase;
  if (title.toLowerCase().includes('backend') || title.toLowerCase().includes('develop')) return Code;
  if (title.toLowerCase().includes('editor') || title.toLowerCase().includes('video')) return Film;
  if (title.toLowerCase().includes('creative')) return Lightbulb;
  if (title.toLowerCase().includes('career')) return Rocket;
  if (title.toLowerCase().includes('professional')) return Star;
  return Target;
}

interface GoalsSectionProps {
  goals?: Goal[];
}

const GoalsSection = ({ goals = defaultGoals }: GoalsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [details, setDetails] = useState(() => getPopupDetails().goals);

  useEffect(() => {
    const handler = () => setDetails(getPopupDetails().goals);
    window.addEventListener('popupDetailsUpdated', handler);
    return () => window.removeEventListener('popupDetailsUpdated', handler);
  }, []);

  const detail = selectedGoal ? details[selectedGoal.title] : null;
  const GoalIcon = selectedGoal ? getGoalIcon(selectedGoal.title) : null;

  return (
    <section ref={sectionRef} id="goals" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container px-4 md:px-6 relative z-10">
        <CinematicSection>
          <div className="text-center mb-12">
            <motion.span className="text-primary text-sm font-semibold tracking-wider uppercase" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              Career Goals
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
              Where I'm <span className="gradient-text">Headed</span>
            </motion.h2>
            <motion.p className="text-sm text-muted-foreground mt-3" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              Click any goal to see the full plan
            </motion.p>
          </div>
        </CinematicSection>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {goals.map((goal, index) => {
            const Icon = getGoalIcon(goal.title);
            return (
              <motion.button
                key={goal.title}
                onClick={() => setSelectedGoal(goal)}
                className="group h-full w-full text-left p-6 rounded-2xl glass border border-border/30 shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div className={`flex-shrink-0 p-4 rounded-xl bg-gradient-to-br from-${goal.color}/20 to-${goal.color}/5`} whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                    <Icon className={`h-6 w-6 text-${goal.color}`} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{goal.description}</p>
                    <span className="inline-block mt-3 text-xs text-primary font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      See the plan →
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {selectedGoal && GoalIcon && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedGoal(null)}>
          <div className="absolute inset-0 bg-background/85 backdrop-blur-lg" />
          <div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass border border-border/50 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <button onClick={() => setSelectedGoal(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-card/80 border border-border/30 transition-colors" aria-label="Close">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div className={`flex-shrink-0 inline-flex p-4 rounded-xl bg-gradient-to-br from-${selectedGoal.color}/25 to-${selectedGoal.color}/5`}>
                  <GoalIcon className={`h-7 w-7 text-${selectedGoal.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text leading-tight">{selectedGoal.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{selectedGoal.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                {detail?.overview && (
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Goal Overview</h4>
                    <p className="text-sm text-foreground/85 leading-7">{detail.overview}</p>
                  </div>
                )}

                {detail && detail.steps.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Action Plan
                    </h4>
                    <ul className="space-y-2">
                      {detail.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary mt-0.5">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {detail?.timeline && (
                    <div className="rounded-xl bg-card/60 border border-border/30 p-4">
                      <h4 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-1">
                        <Clock className="w-3.5 h-3.5" /> Timeline
                      </h4>
                      <p className="text-sm text-foreground/90 font-medium">{detail.timeline}</p>
                    </div>
                  )}
                  {detail?.motivation && (
                    <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 sm:col-span-1">
                      <h4 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-1">
                        <Flame className="w-3.5 h-3.5" /> Motivation
                      </h4>
                      <p className="text-sm text-foreground/90 leading-relaxed italic">"{detail.motivation}"</p>
                    </div>
                  )}
                </div>

                {!detail && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No additional details added yet. You can add them from the Admin Panel under Card Details.
                  </p>
                )}
              </div>

              <button onClick={() => setSelectedGoal(null)} className="mt-7 w-full py-2.5 rounded-xl border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GoalsSection;
