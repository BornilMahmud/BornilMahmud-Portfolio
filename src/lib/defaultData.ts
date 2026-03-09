import type { Profile, Skill, Project, Service, Education, Goal, SocialLink } from '@/lib/types';

export const defaultProfile: Profile = {
  name: "Bornil Mahmud",
  title: "Creative Video Editor & Developer",
  bio: "I am Bornil Mahmud, a creative video editor and aspiring developer from Bangladesh, specializing in short-form videos, anime-style edits, and high-engagement social media content. I am actively developing my expertise in web and backend development while combining creative storytelling with modern technology to produce impactful and scalable digital solutions.",
  email: "bornilprof@gmail.com",
  location: "Bangladesh",
  available_status: "Available for freelance work",
};

export const defaultSkills: Skill[] = [
  { name: "Working with AI", percentage: 96, description: "Leveraging AI tools for automation, content creation & problem solving", color: "cyan" },
  { name: "Video Editing", percentage: 95, description: "After Effects, Premiere Pro, DaVinci Resolve for cinematic content", color: "primary" },
  { name: "Web Development", percentage: 85, description: "Building modern, responsive websites with React, TypeScript & more", color: "accent" },
  { name: "App Development", percentage: 80, description: "Cross-platform mobile applications with Flutter and React Native", color: "primary" },
  { name: "Game Development", percentage: 75, description: "Creating immersive games with Unity, Unreal Engine & custom engines", color: "cyan" },
];

export const defaultProjects: Project[] = [
  {
    title: "Hospital Management System",
    description: "A comprehensive healthcare management solution with patient records, appointment scheduling, billing, and staff management modules.",
    role: "Full Stack Developer",
    details: "Built a complete HMS with real-time patient tracking, automated appointment reminders, and integrated billing system.",
    tags: ["Python", "Django", "PostgreSQL", "REST API"],
    color: "from-emerald-500 to-teal-500",
    demo_link: null,
    github_link: null,
    image_url: null,
  },
  {
    title: "Library Management System",
    description: "Digital library platform featuring book cataloging, member management, borrowing system, and automated fine calculation.",
    role: "Backend Developer",
    details: "Developed a robust library system handling 10,000+ books with advanced search and recommendation features.",
    tags: ["PHP", "Laravel", "MySQL", "Bootstrap"],
    color: "from-blue-500 to-cyan-500",
    demo_link: null,
    github_link: null,
    image_url: null,
  },
  {
    title: "E-Commerce for Dropshipping",
    description: "Full-featured online store with product management, order tracking, payment integration, and supplier connectivity.",
    role: "Full Stack Developer",
    details: "Created a scalable e-commerce platform with automated inventory sync and multi-payment gateway support.",
    tags: ["TypeScript", "React", "Node.js", "Stripe"],
    color: "from-purple-500 to-pink-500",
    demo_link: "https://bmexpress.vercel.app/",
    github_link: null,
    image_url: null,
  },
  {
    title: "Fitness Control Chatbot",
    description: "AI-powered chatbot providing personalized workout plans, nutrition advice, and progress tracking for fitness enthusiasts.",
    role: "ML Engineer",
    details: "Implemented NLP-based chatbot with personalized fitness recommendations and progress analytics.",
    tags: ["Python", "NLP", "TensorFlow", "Flask"],
    color: "from-orange-500 to-red-500",
    demo_link: null,
    github_link: null,
    image_url: null,
  },
];

export const defaultServices: Service[] = [
  { title: "Short-form Video Editing", description: "Professional editing for Reels, Shorts, and TikTok content that engages audiences.", color: "primary", image_url: null },
  { title: "Anime & Music Edits", description: "Dynamic anime edits with perfectly synced music for maximum impact.", color: "accent", image_url: null },
  { title: "Website Development", description: "Modern, responsive websites using TypeScript, PHP, and Laravel.", color: "cyan", image_url: null },
  { title: "Backend Setup", description: "Robust backend solutions with Python, Django, PHP, and Laravel.", color: "primary", image_url: null },
  { title: "Technical Assistance", description: "Help with technical projects, debugging, and development tasks.", color: "accent", image_url: null },
];

export const defaultEducation: Education[] = [
  {
    institution: "Daffodil International University",
    department: "Computer Science / Technology Studies",
    status: "Undergraduate",
    courses: [
      { name: "Python", color: "primary" },
      { name: "Django", color: "accent" },
      { name: "Flutter", color: "cyan" },
      { name: "Dart", color: "primary" },
      { name: "PHP", color: "accent" },
      { name: "Laravel", color: "cyan" },
      { name: "C", color: "primary" },
      { name: "Java", color: "accent" },
    ],
    website_url: null,
    logo_url: null,
  },
  {
    institution: "Khoksha Government College",
    department: "Department of Science",
    status: "Graduated",
    courses: [
      { name: "Physics", color: "primary" },
      { name: "Chemistry", color: "accent" },
      { name: "Biology", color: "cyan" },
      { name: "Higher Math", color: "primary" },
    ],
    website_url: null,
    logo_url: null,
  },
  {
    institution: "Shomospur High School",
    department: "Department of Science",
    status: "Graduated",
    courses: [
      { name: "Physics", color: "primary" },
      { name: "Chemistry", color: "accent" },
      { name: "Biology", color: "cyan" },
      { name: "Higher Math", color: "primary" },
    ],
    website_url: null,
    logo_url: null,
  },
];

export const defaultGoals: Goal[] = [
  { title: "Freelancing Career", description: "Build a successful career as a freelance video editor and developer.", color: "primary" },
  { title: "Backend Development", description: "Master backend technologies and build scalable applications.", color: "accent" },
  { title: "Professional Editor", description: "Become a recognized professional in video editing and content creation.", color: "cyan" },
  { title: "Creative + Technical", description: "Combine creativity with technical skills for unique solutions.", color: "primary" },
];

export const defaultSocialLinks: SocialLink[] = [
  { name: "Facebook", href: "https://www.facebook.com/share/1AWZpiZK4e/", platform: "facebook", icon: null },
  { name: "Fiverr", href: "https://www.fiverr.com/s/YRqkY1p", platform: "fiverr", icon: null },
  { name: "GitHub", href: "https://github.com/BornilMahmud/BornilMahmud", platform: "github", icon: null },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/bornil-mahmud-9a3483325/", platform: "linkedin", icon: null },
];
