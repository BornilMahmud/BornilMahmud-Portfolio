import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, Building2, BookOpen, ShoppingCart, Bot, X, Code, Gamepad2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CinematicSection, ParallaxLayer } from "./motion";
import type { Project } from "@/lib/types";
import { defaultProjects } from "@/lib/defaultData";
import { convertImageUrl } from "@/lib/imageUtils";

function getProjectIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes('hospital') || t.includes('management')) return Building2;
  if (t.includes('library') || t.includes('book')) return BookOpen;
  if (t.includes('commerce') || t.includes('shop') || t.includes('drop')) return ShoppingCart;
  if (t.includes('bot') || t.includes('chat') || t.includes('ai') || t.includes('fitness')) return Bot;
  if (t.includes('game')) return Gamepad2;
  if (t.includes('app') || t.includes('mobile')) return Smartphone;
  return Code;
}

/** Parse newline-separated image_url into an array of direct URLs */
function parseImages(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map(convertImageUrl);
}

// ─── Slideshow component ─────────────────────────────────────────────────────
function ProjectSlideshow({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const stopped = useRef(false);

  useEffect(() => {
    if (images.length <= 1) return;
    stopped.current = false;

    const timer = setInterval(() => {
      if (stopped.current) return;
      setCurrent((prev) => {
        const next = prev + 1;
        if (next >= images.length) {
          stopped.current = true;
          clearInterval(timer);
          return prev;
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  if (images.length === 0) return null;

  return (
    <div
      className="w-full h-44 overflow-hidden relative"
      onMouseEnter={() => {
        setIsHovered(true);
        stopped.current = false;
        setCurrent(0);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt={`${title} ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={false}
          animate={{
            x: `${(i - current) * 100}%`,
            opacity: i === current ? 1 : 0.4,
          }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      ))}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
          {images.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-4 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const Icon = getProjectIcon(project.title);
  const images = parseImages(project.image_url);
  const logoUrl = project.logo_url ? convertImageUrl(project.logo_url) : null;

  return (
    <>
      <motion.div
        ref={cardRef}
        className="group relative h-full cursor-pointer"
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        onClick={() => setIsModalOpen(true)}
      >
        <motion.div
          className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-2xl opacity-0 group-hover:opacity-100 blur`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative h-full glass-strong rounded-2xl border border-border/50 group-hover:border-transparent transition-all duration-500 overflow-hidden">
          {/* Slideshow / single image */}
          {images.length > 0 && (
            <ProjectSlideshow images={images} title={project.title} />
          )}

          <div className="p-6">
            {/* Icon row — logo if available, else color gradient icon */}
            <div className="flex items-center gap-3 mb-4">
              {logoUrl ? (
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-border/30 bg-card/50 flex items-center justify-center flex-shrink-0">
                  <img
                    src={logoUrl}
                    alt={`${project.title} logo`}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-7 h-7 text-foreground" />
                </motion.div>
              )}
              <div>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground">{project.role}</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2 text-sm">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.15 + i * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github_link ? (
                <Button variant="outline" size="sm" className="group/btn rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all" asChild onClick={(e) => e.stopPropagation()}>
                  <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" /> Code
                  </a>
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="group/btn rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all" onClick={(e) => e.stopPropagation()}>
                  <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" /> Code
                </Button>
              )}
              {project.demo_link && (
                <Button variant="outline" size="sm" className="group/btn rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-all" asChild onClick={(e) => e.stopPropagation()}>
                  <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" /> Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div className="absolute inset-0 bg-background/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />

          <motion.div
            className="relative max-w-2xl w-full glass-strong rounded-2xl border border-border/50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal slideshow */}
            {images.length > 0 && (
              <div className="relative w-full h-52 overflow-hidden">
                <ProjectSlideshow images={images} title={project.title} />
              </div>
            )}

            <div className="p-8">
              <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-border/50 transition-colors z-10" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                {logoUrl ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-border/30 bg-card/50 flex items-center justify-center flex-shrink-0">
                    <img src={logoUrl} alt="logo" className="w-12 h-12 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                ) : (
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-foreground" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold gradient-text">{project.title}</h2>
                  <p className="text-primary font-medium text-sm">{project.role}</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{project.details}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">{tag}</span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.github_link ? (
                  <Button variant="hero" className="flex-1" asChild>
                    <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" /> View Code
                    </a>
                  </Button>
                ) : (
                  <Button variant="hero" className="flex-1">
                    <Github className="w-4 h-4 mr-2" /> View Code
                  </Button>
                )}
                {project.demo_link && (
                  <Button variant="glass" className="flex-1" asChild>
                    <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

// ─── Section wrapper ──────────────────────────────────────────────────────────
interface ProjectsSectionProps {
  projects?: Project[];
}

const ProjectsSection = ({ projects = defaultProjects }: ProjectsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const gradientRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const springY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} id="projects" className="py-20 relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" style={{ y: springY }} />
      <ParallaxLayer offset={0.4} className="absolute inset-0">
        <motion.div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" style={{ rotate: gradientRotate }} />
      </ParallaxLayer>

      <div className="container px-4 md:px-6 relative z-10">
        <CinematicSection>
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              <span className="gradient-text">My Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my completed projects demonstrating my skills in development and problem-solving.
            </p>
          </div>
        </CinematicSection>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
