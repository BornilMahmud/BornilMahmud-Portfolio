const STORAGE_KEY = 'portfolio_popup_details';

export interface ServicePopupDetail {
  tagline: string;
  overview: string;
  tools: string[];
  includes: string[];
  idealFor: string;
}

export interface SkillPopupDetail {
  level: string;
  summary: string;
  tools: string[];
  capabilities: string[];
  highlight: string;
}

export interface GoalPopupDetail {
  overview: string;
  steps: string[];
  timeline: string;
  motivation: string;
}

export interface PopupDetailsStore {
  services: Record<string, ServicePopupDetail>;
  skills: Record<string, SkillPopupDetail>;
  goals: Record<string, GoalPopupDetail>;
}

export const defaultServiceDetails: Record<string, ServicePopupDetail> = {
  "Short-form Video Editing": {
    tagline: "Viral-ready content crafted for maximum engagement",
    overview:
      "I specialize in producing high-retention short-form video content for Instagram Reels, YouTube Shorts, and TikTok. Every edit is built around attention-grabbing openings, tight pacing, and visuals that hold viewers to the very last second.",
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut"],
    includes: [
      "Tight cuts & rhythm-synced transitions",
      "Animated captions & lower-thirds",
      "Color grading for platform aesthetics",
      "Background music sync & sound design",
      "Platform-ready export (9:16, 16:9, 1:1)",
      "Up to 2 rounds of revisions",
    ],
    idealFor:
      "Content creators, brands, influencers, and businesses looking to grow on social media through consistent, professional short-form content.",
  },
  "Anime & Music Edits": {
    tagline: "Cinematic AMVs with emotion, rhythm & visual storytelling",
    overview:
      "I create AMVs (Anime Music Videos) and music-synced edits that blend carefully selected scenes with the energy of the soundtrack. Each edit is crafted frame-by-frame to ensure the visuals breathe with the music.",
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Topaz Video AI"],
    includes: [
      "Scene selection & storyboarding",
      "Frame-accurate beat synchronization",
      "Custom motion graphics & visual effects",
      "Cinematic color grading & film grain",
      "Intro & outro sequences",
      "High-quality export for YouTube/TikTok",
    ],
    idealFor:
      "Anime fans, content creators, YouTube channels, and anyone who wants a high-quality, emotionally driven video production.",
  },
  "Website Development": {
    tagline: "Modern, responsive websites built for real-world performance",
    overview:
      "I build professional websites and web applications from scratch, with a focus on clean code, fast performance, and great user experience. From landing pages to fully custom web apps, I design and develop with scalability in mind.",
    tools: ["React", "TypeScript", "Tailwind CSS", "PHP", "Laravel", "Vite"],
    includes: [
      "Fully responsive design (mobile, tablet, desktop)",
      "Clean, well-structured & commented code",
      "SEO-friendly HTML structure",
      "Contact forms with email integration",
      "Fast load times & performance optimization",
      "Deployment-ready build",
    ],
    idealFor:
      "Freelancers, small businesses, startups, and professionals who need a polished online presence that works reliably across all devices.",
  },
  "Backend Setup": {
    tagline: "Scalable, secure backend infrastructure for your application",
    overview:
      "I design and implement robust backend systems that power web and mobile applications. From database design and RESTful APIs to authentication and server configuration, I ensure your backend is secure, well-documented, and built to scale.",
    tools: ["Python", "Django", "FastAPI", "PHP", "Laravel", "PostgreSQL", "MySQL"],
    includes: [
      "RESTful API design & implementation",
      "User authentication & session management",
      "Database schema design & optimization",
      "Admin panel / dashboard setup",
      "Server configuration & deployment guidance",
      "API documentation (Postman/Swagger)",
    ],
    idealFor:
      "Developers and businesses who need a solid backend foundation for their web app, mobile app, or SaaS product — ready for production.",
  },
  "Technical Assistance": {
    tagline: "Hands-on technical support to keep your project on track",
    overview:
      "Stuck on a bug? Need a second opinion on your architecture? I provide dedicated technical support for developers, students, and teams. I dig into the problem with you and deliver clear, actionable solutions.",
    tools: ["VS Code", "Git / GitHub", "Postman", "Linux / Shell", "Docker basics", "Browser DevTools"],
    includes: [
      "Code review & quality feedback",
      "Debugging & error resolution",
      "Architecture & design pattern advice",
      "Third-party API & library integration",
      "Performance bottleneck analysis",
      "Step-by-step guidance with explanations",
    ],
    idealFor:
      "Students, solo developers, and small teams who need reliable expert guidance without the cost of a full-time hire.",
  },
};

export const defaultSkillDetails: Record<string, SkillPopupDetail> = {
  "Working with AI": {
    level: "Expert",
    summary:
      "I actively use AI tools as a core part of my workflow — for content creation, automation, research, and problem-solving. I understand how to prompt effectively, chain tools together, and integrate AI APIs into real applications.",
    tools: ["ChatGPT / GPT-4", "Claude", "Gemini", "Midjourney", "ElevenLabs", "RunwayML", "GitHub Copilot"],
    capabilities: [
      "Prompt engineering for text, image & video generation",
      "Automating repetitive workflows using AI agents",
      "Integrating OpenAI & other AI APIs into web apps",
      "AI-assisted content creation for social media",
      "Using AI for code review, debugging & refactoring",
      "Staying current with rapidly evolving AI tools",
    ],
    highlight:
      "AI is not a replacement for skill — it's a force multiplier. I use it to move faster and deliver better results while keeping full creative and technical control.",
  },
  "Video Editing": {
    level: "Expert",
    summary:
      "Video editing is my primary professional skill. With years of hands-on experience, I produce polished short-form and long-form content for social media, YouTube, and client deliverables. I specialize in cinematic storytelling, motion graphics, and anime-style edits.",
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut", "Topaz Video AI"],
    capabilities: [
      "Short-form editing for Reels, Shorts & TikTok",
      "Cinematic color grading & LUTs",
      "Motion graphics & text animations",
      "Beat-synced edits & music video production",
      "AMV (Anime Music Video) creation",
      "Sound design, mixing & noise reduction",
    ],
    highlight:
      "I've edited hundreds of videos across multiple niches — each one crafted to hold attention, tell a story, and achieve the creator's goals.",
  },
  "Web Development": {
    level: "Advanced",
    summary:
      "I build modern, responsive web applications with a strong focus on clean architecture, performance, and user experience. I'm comfortable across the full stack — from designing polished UIs to setting up backend APIs and databases.",
    tools: ["React", "TypeScript", "Tailwind CSS", "Vite", "PHP", "Laravel", "PostgreSQL"],
    capabilities: [
      "Building responsive UIs with React & TypeScript",
      "Styling with Tailwind CSS & component libraries",
      "REST API consumption & integration",
      "Form handling, validation & state management",
      "Full-stack apps with Laravel / PHP backends",
      "Deployment to Vercel, Railway & shared hosting",
    ],
    highlight:
      "This very portfolio is a live example of my web development work — built with React, TypeScript, Framer Motion, and a custom Express backend.",
  },
  "App Development": {
    level: "Intermediate",
    summary:
      "I develop cross-platform mobile applications with a focus on clean UI and smooth performance. I'm currently deepening my expertise in Flutter and React Native to build production-ready apps.",
    tools: ["Flutter", "Dart", "React Native", "Firebase", "Android Studio"],
    capabilities: [
      "Cross-platform iOS & Android app development",
      "State management with Provider & Riverpod",
      "Firebase authentication & Firestore database",
      "Custom UI components & animations in Flutter",
      "API integration & local storage",
      "App performance optimization & profiling",
    ],
    highlight:
      "Mobile development is a growing area of my skillset — I've built functional apps for learning and client projects with a strong focus on user-friendly design.",
  },
  "Game Development": {
    level: "Intermediate",
    summary:
      "I explore game development as both a creative and technical discipline. I'm building experience with Unity and Unreal Engine to create interactive experiences — from 2D games to immersive 3D environments.",
    tools: ["Unity", "C#", "Unreal Engine", "Blueprints", "Blender (basic)"],
    capabilities: [
      "2D & 3D game development with Unity",
      "C# scripting for game logic & physics",
      "Visual scripting with Unreal Blueprints",
      "Scene design, lighting & basic asset management",
      "Player controls, collision detection & UI systems",
      "Exporting builds for PC & WebGL",
    ],
    highlight:
      "Game development merges my love for creativity and coding. I'm consistently expanding this skill through personal projects and game jams.",
  },
};

export const defaultGoalDetails: Record<string, GoalPopupDetail> = {
  "Freelancing Career": {
    overview:
      "My primary goal is to build a self-sustaining freelance career that allows me to work with clients worldwide — delivering high-quality video editing and development services on my own terms.",
    steps: [
      "Establish a strong portfolio with 10+ completed projects",
      "Achieve consistent orders on Fiverr and Upwork",
      "Build a personal brand through social media content",
      "Develop long-term client relationships for recurring work",
      "Scale income to a professional full-time level",
    ],
    timeline: "2025 – 2026",
    motivation:
      "Freelancing gives me the freedom to grow at my own pace, work with diverse clients, and continuously sharpen my skills in both creative and technical fields.",
  },
  "Backend Development": {
    overview:
      "I am committed to mastering backend development — building fast, secure, and scalable server-side systems that power modern applications. This includes APIs, databases, and cloud infrastructure.",
    steps: [
      "Complete advanced Django & Laravel projects",
      "Build and deploy 3+ full-stack applications",
      "Learn RESTful and GraphQL API design",
      "Gain hands-on experience with PostgreSQL & Redis",
      "Explore cloud deployment with AWS or Railway",
    ],
    timeline: "2025 – 2026",
    motivation:
      "Backend development is the foundation of every great product. Mastering it will allow me to build complete, production-ready applications independently.",
  },
  "Professional Editor": {
    overview:
      "I aim to become a recognized, respected professional in the video editing industry — known for cinematic quality, reliability, and a unique creative signature that clients actively seek out.",
    steps: [
      "Build a cinematic portfolio of 20+ showcase edits",
      "Grow a YouTube channel dedicated to editing tutorials",
      "Collaborate with music artists on official music videos",
      "Earn Top Rated status on freelance platforms",
      "Develop a recognizable personal editing style",
    ],
    timeline: "2025 – 2027",
    motivation:
      "Video editing is where creativity meets impact. I want my work to be the kind people share, remember, and come back for.",
  },
  "Creative + Technical": {
    overview:
      "I believe the most powerful creators are those who bridge the gap between art and technology. My goal is to master both disciplines — using technical skill to bring creative visions to life.",
    steps: [
      "Develop full-stack projects with rich visual design",
      "Combine motion graphics with interactive web experiences",
      "Study UI/UX principles to improve design decisions",
      "Build tools that help other creators work more efficiently",
      "Publish open-source projects combining code & design",
    ],
    timeline: "Ongoing",
    motivation:
      "When creativity meets engineering, the results are extraordinary. I want to be someone who can both imagine a product and build it, end-to-end.",
  },
};

export function getPopupDetails(): PopupDetailsStore {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: Partial<PopupDetailsStore> = JSON.parse(stored);
      return {
        services: { ...defaultServiceDetails, ...(parsed.services ?? {}) },
        skills: { ...defaultSkillDetails, ...(parsed.skills ?? {}) },
        goals: { ...defaultGoalDetails, ...(parsed.goals ?? {}) },
      };
    }
  } catch {}
  return {
    services: { ...defaultServiceDetails },
    skills: { ...defaultSkillDetails },
    goals: { ...defaultGoalDetails },
  };
}

export function savePopupDetails(data: PopupDetailsStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('popupDetailsUpdated'));
}
