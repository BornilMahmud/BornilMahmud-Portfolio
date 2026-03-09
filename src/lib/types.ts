export interface Profile {
  id?: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  available_status: string;
}

export interface Skill {
  id?: string;
  profile_id?: string;
  name: string;
  percentage: number;
  description: string;
  color: string;
}

export interface Project {
  id?: string;
  profile_id?: string;
  title: string;
  description: string;
  role: string;
  details: string;
  tags: string[];
  color: string;
  demo_link: string | null;
  github_link: string | null;
  image_url: string | null;
}

export interface Service {
  id?: string;
  profile_id?: string;
  title: string;
  description: string;
  color: string;
  image_url: string | null;
}

export interface CourseItem {
  name: string;
  color: string;
}

export interface Education {
  id?: string;
  profile_id?: string;
  institution: string;
  department: string;
  status: string;
  courses: CourseItem[];
  website_url: string | null;
  logo_url: string | null;
}

export interface Goal {
  id?: string;
  profile_id?: string;
  title: string;
  description: string;
  color: string;
}

export interface SocialLink {
  id?: string;
  profile_id?: string;
  name: string;
  href: string;
  platform: string;
  icon: string | null;
}
