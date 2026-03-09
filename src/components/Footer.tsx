import { Heart, Github, Linkedin, Facebook, ExternalLink, ArrowUp, Mail, MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const footerNavLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Education", href: "#education" },
  { name: "Goals", href: "#goals" },
  { name: "Social", href: "#social" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/BornilMahmud/BornilMahmud" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/bornil-mahmud-9a3483325/" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/1AWZpiZK4e/" },
  { name: "Fiverr", icon: ExternalLink, href: "https://www.fiverr.com/s/YRqkY1p" },
];

const MAPS_URL = "https://www.google.com/maps/search/Daffodil+Smart+City,+Dhaka,+Bangladesh";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-border/30">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold gradient-text" data-testid="text-footer-brand">Bornil Mahmud</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creative video editor & aspiring developer from Bangladesh, specializing in cinematic content and modern web solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <a
                href="mailto:bornilprof@gmail.com"
                className="hover:text-primary transition-colors"
                data-testid="link-footer-email"
              >
                bornilprof@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                data-testid="link-footer-location"
              >
                Daffodil Smart City, Dhaka
              </a>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {footerNavLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  data-testid={`link-footer-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold">Connect</h3>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md glass border border-border/30 hover:border-primary/50 transition-all duration-300"
                  data-testid={`link-footer-social-${social.name.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Available for freelance work and collaborations.
            </p>
          </motion.div>
        </div>

        <div className="py-6 pb-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span data-testid="text-footer-copyright">&copy; {currentYear} Bornil Mahmud. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 pr-20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
              <span>in Bangladesh</span>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-md glass border border-border/30 hover:border-primary/50 transition-all duration-300"
              data-testid="button-scroll-top"
            >
              <ArrowUp className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
