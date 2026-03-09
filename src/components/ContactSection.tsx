import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, MapPin, MessageCircle, Github, Linkedin, Facebook } from "lucide-react";
import { CinematicSection, FloatingIcon, AnimatedText } from "./motion";

const socialIcons = [
  { icon: Github, href: "https://github.com/bornilm", color: "primary" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/bornilmahmud/", color: "accent" },
  { icon: Facebook, href: "https://www.facebook.com/BornilMahmudOfficialPage", color: "cyan" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Check your email for a confirmation. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Could not send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <CinematicSection>
          <div className="text-center mb-12">
            <motion.span 
              className="text-primary text-sm font-semibold tracking-wider uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Get In Touch
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              <AnimatedText 
                text="Let's Build Something" 
                delay={0.2}
                staggerChildren={0.05}
              />
              <span className="gradient-text block mt-2">
                <AnimatedText 
                  text="Great Together" 
                  delay={0.6}
                  staggerChildren={0.05}
                />
              </span>
            </h2>
            <motion.p 
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Ready to start a project? Have questions? I'd love to hear from you.
            </motion.p>
          </div>
        </CinematicSection>

        <div className="flex justify-center gap-6 mb-12">
          {socialIcons.map((social, index) => (
            <FloatingIcon key={index} delay={index * 0.2} duration={4 + index}>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full glass border border-border/30 hover:border-${social.color}/50 transition-all duration-300`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                data-testid={`link-social-${index}`}
              >
                <social.icon className={`w-6 h-6 text-${social.color}`} />
              </motion.a>
            </FloatingIcon>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            className="h-full p-8 rounded-2xl glass border border-border/30 shadow-xl space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Contact Information</h3>
            </div>

            <a
              href="mailto:bornilprof@gmail.com"
              className="group flex items-center gap-4 p-4 rounded-xl glass border border-border/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              data-testid="link-email"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold group-hover:text-primary transition-colors">bornilprof@gmail.com</p>
              </div>
            </a>
            
            <div className="flex items-center gap-4 p-4 rounded-xl glass border border-border/20">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">Bangladesh</p>
              </div>
            </div>

            <a
              href="mailto:bornilprof@gmail.com"
              data-testid="button-send-email"
              className="flex items-center justify-center gap-2 w-full mt-6 py-3 rounded-xl font-semibold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #059669, #10b981)",
                boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
              }}
            >
              <Mail className="h-5 w-5" />
              Send Email Directly
            </a>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="h-full p-8 rounded-2xl glass border border-border/30 shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Send className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold">Send a Message</h3>
            </div>

            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Your Name *</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-background/50 border-border/50 h-12 focus:border-primary/50 transition-colors"
                  data-testid="input-name"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Your Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="bg-background/50 border-border/50 h-12 focus:border-primary/50 transition-colors"
                  data-testid="input-email"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Subject</label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="bg-background/50 border-border/50 h-12 focus:border-primary/50 transition-colors"
                  data-testid="input-subject"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.75 }}
              >
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Your Message *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="bg-background/50 border-border/50 resize-none focus:border-primary/50 transition-colors"
                  data-testid="input-message"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full group"
                  disabled={isSubmitting}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Sending...
                    </motion.span>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
