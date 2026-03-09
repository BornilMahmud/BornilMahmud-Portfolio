import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import EducationSection from "@/components/EducationSection";
import GoalsSection from "@/components/GoalsSection";
import SocialLinksSection from "@/components/SocialLinksSection";
import ContactSection from "@/components/ContactSection";
import ThankYouSection from "@/components/ThankYouSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FilmGrain, MouseFollower } from "@/components/motion";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { skills, projects, services, education, goals, socialLinks } = usePortfolioData();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <FilmGrain />
      <MouseFollower />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-cyan z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section id="hero">
          <HeroSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="skills">
          <SkillsSection skills={skills} />
        </section>

        <section id="projects">
          <ProjectsSection projects={projects} />
        </section>

        <section id="services">
          <ServicesSection services={services} />
        </section>

        <section id="education">
          <EducationSection education={education} />
        </section>

        <section id="goals">
          <GoalsSection goals={goals} />
        </section>

        <section id="social">
          <SocialLinksSection socialLinks={socialLinks} />
        </section>

        <section id="contact">
          <ContactSection />
        </section>

        <section id="thankyou">
          <ThankYouSection />
        </section>
      </motion.main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
