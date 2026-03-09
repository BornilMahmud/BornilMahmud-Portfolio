import { Facebook, Github, Linkedin, ExternalLink, Twitter, Instagram, Youtube, MessageCircle, Send, Palette, Gamepad2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import type { SocialLink } from "@/lib/types";
import { defaultSocialLinks } from "@/lib/defaultData";

const platformConfig: Record<string, { icon: any; gradient: string; hoverBg: string }> = {
  facebook: { icon: Facebook, gradient: "from-blue-600 to-blue-400", hoverBg: "hover:bg-blue-500/10" },
  github: { icon: Github, gradient: "from-gray-600 to-gray-400", hoverBg: "hover:bg-gray-500/10" },
  linkedin: { icon: Linkedin, gradient: "from-blue-700 to-blue-500", hoverBg: "hover:bg-blue-600/10" },
  twitter: { icon: Twitter, gradient: "from-sky-500 to-sky-400", hoverBg: "hover:bg-sky-500/10" },
  instagram: { icon: Instagram, gradient: "from-pink-500 to-purple-500", hoverBg: "hover:bg-pink-500/10" },
  youtube: { icon: Youtube, gradient: "from-red-600 to-red-400", hoverBg: "hover:bg-red-500/10" },
  fiverr: { icon: ExternalLink, gradient: "from-green-500 to-emerald-400", hoverBg: "hover:bg-green-500/10" },
  dribbble: { icon: Palette, gradient: "from-pink-500 to-pink-400", hoverBg: "hover:bg-pink-500/10" },
  behance: { icon: Palette, gradient: "from-blue-600 to-blue-400", hoverBg: "hover:bg-blue-500/10" },
  discord: { icon: Gamepad2, gradient: "from-indigo-500 to-indigo-400", hoverBg: "hover:bg-indigo-500/10" },
  tiktok: { icon: ExternalLink, gradient: "from-gray-800 to-gray-600", hoverBg: "hover:bg-gray-500/10" },
  whatsapp: { icon: MessageCircle, gradient: "from-green-500 to-green-400", hoverBg: "hover:bg-green-500/10" },
  telegram: { icon: Send, gradient: "from-blue-500 to-blue-400", hoverBg: "hover:bg-blue-500/10" },
};

const defaultPlatform = { icon: ExternalLink, gradient: "from-primary to-accent", hoverBg: "hover:bg-primary/10" };

interface SocialLinksSectionProps {
  socialLinks?: SocialLink[];
}

const SocialLinksSection = ({ socialLinks = defaultSocialLinks }: SocialLinksSectionProps) => {
  return (
    <section id="social" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background" />

      <div className="container px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Connect</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
              Find Me <span className="gradient-text">Online</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="flex justify-center gap-6 flex-wrap max-w-2xl mx-auto">
          {socialLinks.map((social, index) => {
            const platform = social.platform?.toLowerCase() || '';
            const isCustom = platform === 'custom' && social.icon;
            const config = platformConfig[platform] || defaultPlatform;
            const Icon = config.icon;
            return (
              <AnimatedSection key={social.name} delay={index * 100}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 px-6 py-4 rounded-2xl glass border border-border/30 shadow-xl hover:border-primary/30 hover:-translate-y-2 ${config.hoverBg} transition-all duration-300`}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    {isCustom ? (
                      <img src={social.icon!} alt={social.name} className="h-5 w-5 object-contain" />
                    ) : (
                      <Icon className="h-5 w-5 text-foreground" />
                    )}
                  </div>
                  <span className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {social.name}
                  </span>
                </a>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialLinksSection;
