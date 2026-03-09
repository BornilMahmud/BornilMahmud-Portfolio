import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Award, ExternalLink } from "lucide-react";
import { CinematicSection } from "./motion";
import type { Education } from "@/lib/types";
import { defaultEducation } from "@/lib/defaultData";

interface EducationSectionProps {
  education?: Education[];
}

const EducationSection = ({ education = defaultEducation }: EducationSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="education" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <CinematicSection>
            <div className="text-center mb-12">
              <motion.span 
                className="text-primary text-sm font-semibold tracking-wider uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                Education
              </motion.span>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Academic <span className="gradient-text">Journey</span>
              </motion.h2>
            </div>
          </CinematicSection>

          <div className="space-y-6">
            {education.map((edu, eduIndex) => (
              <motion.div 
                key={edu.institution}
                className="p-8 rounded-2xl glass border border-border/30 shadow-xl"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.2 + eduIndex * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {edu.logo_url ? (
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-border/30 bg-background/50">
                        <img src={edu.logo_url} alt={edu.institution} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </motion.div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        {edu.website_url ? (
                          <a href={edu.website_url} target="_blank" rel="noopener noreferrer" className="group/link">
                            <h3 className="text-2xl font-bold gradient-text group-hover/link:underline inline-flex items-center gap-2">
                              {edu.institution}
                              <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                            </h3>
                          </a>
                        ) : (
                          <h3 className="text-2xl font-bold gradient-text">{edu.institution}</h3>
                        )}
                        <p className="text-muted-foreground mt-1">{edu.department}</p>
                      </div>
                      <motion.span 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-semibold border border-primary/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Award className="w-4 h-4" />
                        {edu.status}
                      </motion.span>
                    </div>
                    
                    <div className="pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-4 h-4 text-accent" />
                        <p className="text-sm font-semibold text-muted-foreground">Courses & Technologies Studied</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {edu.courses.map((course, index) => (
                          <motion.span
                            key={course.name}
                            className={`px-4 py-2 text-sm rounded-full glass border border-${course.color}/30 text-muted-foreground hover:text-${course.color} hover:border-${course.color}/50 hover:bg-${course.color}/5 transition-all duration-300 cursor-default`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.4 + eduIndex * 0.1 + index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            {course.name}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
