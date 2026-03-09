import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, X, Facebook, Github, Linkedin } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1AWZpiZK4e/",
    icon: Facebook,
    hoverColor: "hover:bg-blue-600 hover:border-blue-500",
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/s/YRqkY1p",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h1.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.527.303c-.36.858-1.145 1.342-2.357 1.342-1.692 0-2.71-.975-2.71-2.481 0-1.52 1.005-2.481 2.613-2.481 1.692 0 2.55.975 2.55 2.481 0 .175-.012.35-.1.465zm-1.634-.975c-.078-.487-.41-.77-.917-.77-.488 0-.82.264-.918.77h1.835zm-4.891-1.843h1.61v4.874h-1.61v-.74c-.302.574-.718.74-1.255.74h-.05c-1.283 0-2.114-.975-2.114-2.481 0-1.52.83-2.481 2.114-2.481h.05c.537 0 .953.166 1.255.74v-.652zm-1.12 3.852c.635 0 1.05-.448 1.05-1.27 0-.82-.415-1.27-1.05-1.27-.635 0-1.037.45-1.037 1.27 0 .822.402 1.27 1.037 1.27zm-4.693-5.106c.537 0 .976.449.976.996s-.439.996-.976.996a.996.996 0 0 1-.976-.996c0-.547.439-.996.976-.996zm-.805 5.106V12.44h1.61v4.874h-1.61zm-1.574-4.874v4.874H2.705v-2.063c0-.546-.264-.936-.771-.936-.498 0-.771.39-.771.936v2.063H0V10.44h1.163v.74c.273-.574.659-.87 1.293-.87.713 0 1.171.43 1.171 1.256v.975z"/>
      </svg>
    ),
    hoverColor: "hover:bg-green-600 hover:border-green-500",
  },
  {
    name: "GitHub",
    url: "https://github.com/BornilMahmud/BornilMahmud",
    icon: Github,
    hoverColor: "hover:bg-purple-600 hover:border-purple-500",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/bornil-mahmud-9a3483325/",
    icon: Linkedin,
    hoverColor: "hover:bg-sky-600 hover:border-sky-500",
  },
];

interface SocialLinksPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialLinksPopup = ({ isOpen, onClose }: SocialLinksPopupProps) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Popup */}
      <div
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md transition-all duration-500 ease-out ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <div className="relative glass border border-border/50 rounded-2xl p-6 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold gradient-text mb-2">Find Me Online</h3>
            <p className="text-sm text-muted-foreground">
              Connect with me on social platforms
            </p>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-lg ${link.hoverColor} group`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen
                      ? `fade-in 0.4s ease-out ${index * 100}ms both`
                      : "none",
                  }}
                >
                  <Icon className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                  <span className="font-medium text-foreground group-hover:text-white transition-colors">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLinksPopup;
