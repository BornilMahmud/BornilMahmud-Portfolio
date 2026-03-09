import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Film, Code, Server, Wrench, Music, Globe, Sparkles, Briefcase, X, CheckCircle2, Layers } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import type { Service } from "@/lib/types";
import { defaultServices } from "@/lib/defaultData";
import { getPopupDetails } from "@/lib/popupDetails";

function getServiceIcon(title: string) {
  if (title.toLowerCase().includes('video') || title.toLowerCase().includes('edit')) return Film;
  if (title.toLowerCase().includes('anime') || title.toLowerCase().includes('music')) return Music;
  if (title.toLowerCase().includes('website') || title.toLowerCase().includes('web')) return Globe;
  if (title.toLowerCase().includes('backend') || title.toLowerCase().includes('server')) return Server;
  if (title.toLowerCase().includes('technical') || title.toLowerCase().includes('assist')) return Wrench;
  if (title.toLowerCase().includes('code') || title.toLowerCase().includes('develop')) return Code;
  return Briefcase;
}

interface ServicesSectionProps {
  services?: Service[];
}

const ServicesSection = ({ services = defaultServices }: ServicesSectionProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [details, setDetails] = useState(() => getPopupDetails().services);

  useEffect(() => {
    const handler = () => setDetails(getPopupDetails().services);
    window.addEventListener('popupDetailsUpdated', handler);
    return () => window.removeEventListener('popupDetailsUpdated', handler);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const detail = selectedService ? details[selectedService.title] : null;
  const Icon = selectedService ? getServiceIcon(selectedService.title) : null;

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Freelancing Services</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
              How I Can <span className="gradient-text">Help You</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-3">Click any card for full details</p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const ServiceIcon = getServiceIcon(service.title);
            return (
              <AnimatedSection key={service.title} delay={index * 100}>
                <button
                  onClick={() => setSelectedService(service)}
                  className="group h-full w-full text-left rounded-2xl glass border border-border/30 shadow-xl hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {service.image_url && (
                    <div className="w-full h-32 overflow-hidden">
                      <img src={service.image_url} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-${service.color}/20 to-${service.color}/5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <ServiceIcon className={`h-6 w-6 text-${service.color}`} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    <span className="inline-block mt-4 text-xs text-primary font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View full details →
                    </span>
                  </div>
                </button>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={500}>
          <div className="text-center mt-12">
            <Button variant="hero" size="lg" onClick={scrollToContact} className="group">
              <span className="relative z-10 flex items-center gap-2">
                Hire Me Now
                <Sparkles className="w-4 h-4 group-hover:animate-spin" />
              </span>
            </Button>
          </div>
        </AnimatedSection>
      </div>

      {selectedService && Icon && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedService(null)}>
          <div className="absolute inset-0 bg-background/85 backdrop-blur-lg" />
          <div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass border border-border/50 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <button onClick={() => setSelectedService(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-card/80 border border-border/30 transition-colors" aria-label="Close">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div className={`flex-shrink-0 inline-flex p-4 rounded-xl bg-gradient-to-br from-${selectedService.color}/25 to-${selectedService.color}/5`}>
                  <Icon className={`h-7 w-7 text-${selectedService.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text leading-tight">{selectedService.title}</h3>
                  {detail?.tagline && <p className={`text-sm text-${selectedService.color} font-medium mt-1`}>{detail.tagline}</p>}
                </div>
              </div>

              {detail ? (
                <div className="space-y-6">
                  {detail.overview && (
                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-2">
                        <Layers className="w-3.5 h-3.5" /> Overview
                      </h4>
                      <p className="text-sm text-foreground/85 leading-7">{detail.overview}</p>
                    </div>
                  )}

                  {detail.tools.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                        <Wrench className="w-3.5 h-3.5" /> Tools & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {detail.tools.map((tool) => (
                          <span key={tool} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">{tool}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {detail.includes.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                        <CheckCircle2 className="w-3.5 h-3.5" /> What's Included
                      </h4>
                      <ul className="space-y-2">
                        {detail.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {detail.idealFor && (
                    <div className="rounded-xl bg-card/60 border border-border/30 p-4">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Ideal For</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{detail.idealFor}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedService.description}</p>
              )}

              <div className="flex gap-3 mt-8">
                <Button variant="hero" className="flex-1" onClick={() => { setSelectedService(null); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); }}>
                  Hire Me for This
                </Button>
                <Button variant="outline" className="flex-shrink-0" onClick={() => setSelectedService(null)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
