// ─── Devicon CDN helper ──────────────────────────────────────────────────────
const D = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

export interface TechItem {
  name: string;
  description: string;
  icon: string;
  level: number;
}

export interface TechCategory {
  id: string;
  label: string;
  emoji: string;
  title: string;
  subtitle: string;
  items: TechItem[];
}

export const DEFAULT_TECH_CATEGORIES: TechCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    emoji: "🖥️",
    title: "Frontend Development",
    subtitle: "Creating beautiful, responsive user interfaces",
    items: [
      { name: "HTML", description: "Structuring web content effectively", icon: D("html5"), level: 95 },
      { name: "CSS", description: "Designing responsive and modern UIs", icon: D("css3"), level: 90 },
      { name: "JavaScript", description: "Dynamic and interactive web experiences", icon: D("javascript"), level: 88 },
      { name: "TypeScript", description: "Type-safe modern JavaScript development", icon: D("typescript"), level: 82 },
      { name: "React.js", description: "Building scalable single-page applications", icon: D("react"), level: 85 },
      { name: "Next.js", description: "Server-side rendering & static generation", icon: D("nextjs"), level: 75 },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI", icon: D("tailwindcss"), level: 90 },
      { name: "Bootstrap", description: "Responsive, mobile-first CSS framework", icon: D("bootstrap"), level: 85 },
      { name: "Framer Motion", description: "Declarative animations & gestures for React", icon: D("framermotion"), level: 78 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    emoji: "⚙️",
    title: "Backend Development",
    subtitle: "Building robust server-side applications",
    items: [
      { name: "Python", description: "Versatile scripting and backend development", icon: D("python"), level: 85 },
      { name: "Django", description: "High-level Python web framework", icon: D("django", "plain"), level: 80 },
      { name: "PHP", description: "Server-side scripting language", icon: D("php"), level: 78 },
      { name: "Laravel", description: "Elegant PHP web application framework", icon: D("laravel", "original"), level: 75 },
      { name: "Node.js", description: "Server-side JavaScript runtime", icon: D("nodejs"), level: 80 },
      { name: "Express.js", description: "Minimalist Node.js web framework", icon: D("express"), level: 78 },
      { name: "REST API", description: "RESTful architecture & API best practices", icon: D("nodejs"), level: 85 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    emoji: "🗄️",
    title: "Database Management",
    subtitle: "Storing and managing data efficiently",
    items: [
      { name: "MySQL", description: "Reliable relational database management", icon: D("mysql"), level: 85 },
      { name: "PostgreSQL", description: "Advanced open-source relational database", icon: D("postgresql"), level: 80 },
      { name: "MongoDB", description: "Flexible NoSQL document database", icon: D("mongodb"), level: 78 },
      { name: "SQLite", description: "Lightweight embedded database", icon: D("sqlite"), level: 80 },
      { name: "Firebase", description: "Real-time cloud database by Google", icon: D("firebase"), level: 75 },
      { name: "Supabase", description: "Open-source Firebase alternative with PostgreSQL", icon: D("supabase"), level: 72 },
    ],
  },
  {
    id: "deployment",
    label: "Deployment",
    emoji: "🚀",
    title: "Deployment & DevOps",
    subtitle: "Shipping and maintaining production apps",
    items: [
      { name: "Git", description: "Distributed version control system", icon: D("git"), level: 90 },
      { name: "GitHub", description: "Code hosting & collaboration platform", icon: D("github"), level: 88 },
      { name: "Vercel", description: "Frontend cloud deployment platform", icon: D("vercel"), level: 85 },
      { name: "Netlify", description: "Modern web hosting & CI/CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", level: 80 },
      { name: "Linux", description: "Server administration & command line", icon: D("linux"), level: 75 },
      { name: "Docker", description: "Containerized application deployment", icon: D("docker"), level: 65 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    emoji: "🛠️",
    title: "Development Tools",
    subtitle: "Tools that power my daily workflow",
    items: [
      { name: "VS Code", description: "Primary code editor with extensions", icon: D("vscode"), level: 95 },
      { name: "Postman", description: "API testing and documentation", icon: D("postman"), level: 88 },
      { name: "Figma", description: "UI/UX design and prototyping", icon: D("figma"), level: 75 },
      { name: "npm", description: "Node.js package manager", icon: D("npm"), level: 88 },
      { name: "Premiere Pro", description: "Professional video editing suite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg", level: 95 },
      { name: "After Effects", description: "Motion graphics & visual effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg", level: 92 },
    ],
  },
  {
    id: "aitools",
    label: "AI Tools",
    emoji: "🤖",
    title: "AI Tools",
    subtitle: "Leveraging AI to boost productivity and create smarter solutions",
    items: [
      { name: "ChatGPT", description: "AI assistant for coding and content creation", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", level: 95 },
      { name: "GitHub Copilot", description: "AI-powered code completion assistant", icon: D("github"), level: 90 },
      { name: "Gemini", description: "Google AI for research and automation", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg", level: 85 },
      { name: "Claude AI", description: "AI for code review, writing & analysis", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Claude_AI_logo.svg", level: 85 },
      { name: "DeepSeek", description: "Advanced AI for code generation & reasoning", icon: "https://upload.wikimedia.org/wikipedia/commons/e/ec/DeepSeek_logo.svg", level: 80 },
      { name: "Midjourney", description: "AI image generation for creative projects", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png", level: 82 },
    ],
  },
  {
    id: "video",
    label: "Video",
    emoji: "🎬",
    title: "Video Editing",
    subtitle: "Crafting cinematic stories through professional video production",
    items: [
      { name: "Premiere Pro", description: "Industry-standard professional video editing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg", level: 95 },
      { name: "After Effects", description: "Motion graphics, VFX & compositing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg", level: 92 },
      { name: "DaVinci Resolve", description: "Professional color grading & editing", icon: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg", level: 88 },
      { name: "CapCut", description: "Fast short-form content editing for social media", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c0/CapCut_logo_2022.svg", level: 90 },
      { name: "Canva", description: "Quick graphics and thumbnail creation", icon: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Canva_Logo.svg", level: 85 },
    ],
  },
];
