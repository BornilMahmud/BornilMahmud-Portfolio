import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import type { Profile, Skill, Project, Service, Education, Goal, SocialLink, CourseItem } from '@/lib/types';
import {
  defaultProfile,
  defaultSkills,
  defaultProjects,
  defaultServices,
  defaultEducation,
  defaultGoals,
  defaultSocialLinks,
} from '@/lib/defaultData';
import { LogOut, ArrowLeft, Save, Plus, Trash2, User, Zap, FolderOpen, Briefcase, GraduationCap, Target, Share2, Home, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { getPopupDetails, savePopupDetails, type PopupDetailsStore, type ServicePopupDetail, type SkillPopupDetail, type GoalPopupDetail } from '@/lib/popupDetails';
import { useNavigate } from 'react-router-dom';

const ADMIN_USERNAME = 'bornilmhd';
const ADMIN_PASSWORD = 'Bornil125@';
const AUTH_KEY = 'admin_authenticated';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'socialLinks', label: 'Social Links', icon: Share2 },
  { id: 'cardDetails', label: 'Card Details', icon: FileText },
];

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md glass border border-border/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold gradient-text" data-testid="text-admin-title">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-login">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Username</label>
              <Input
                data-testid="input-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="bg-background/50 border-border/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Password</label>
              <Input
                data-testid="input-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-background/50 border-border/50"
              />
            </div>
            {error && <p className="text-red-500 text-sm" data-testid="text-login-error">{error}</p>}
            <Button type="submit" className="w-full" data-testid="button-login">
              Login
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/')} data-testid="button-back-home-login">
              <Home className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileEditor({ profile, onChange }: { profile: Profile; onChange: (p: Profile) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Name</label>
        <Input data-testid="input-profile-name" value={profile.name} onChange={(e) => onChange({ ...profile, name: e.target.value })} className="bg-background/50 border-border/50" />
      </div>
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Title</label>
        <Input data-testid="input-profile-title" value={profile.title} onChange={(e) => onChange({ ...profile, title: e.target.value })} className="bg-background/50 border-border/50" />
      </div>
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Bio</label>
        <Textarea data-testid="input-profile-bio" value={profile.bio} onChange={(e) => onChange({ ...profile, bio: e.target.value })} rows={5} className="bg-background/50 border-border/50 resize-none" />
      </div>
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Email</label>
        <Input data-testid="input-profile-email" value={profile.email} onChange={(e) => onChange({ ...profile, email: e.target.value })} className="bg-background/50 border-border/50" />
      </div>
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Location</label>
        <Input data-testid="input-profile-location" value={profile.location} onChange={(e) => onChange({ ...profile, location: e.target.value })} className="bg-background/50 border-border/50" />
      </div>
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Available Status</label>
        <Input data-testid="input-profile-status" value={profile.available_status} onChange={(e) => onChange({ ...profile, available_status: e.target.value })} className="bg-background/50 border-border/50" />
      </div>
    </div>
  );
}

function SkillsEditor({ skills, onChange }: { skills: Skill[]; onChange: (s: Skill[]) => void }) {
  const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addSkill = () => {
    onChange([...skills, { name: '', percentage: 50, description: '', color: 'primary' }]);
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <Card key={index} className="glass border border-border/30">
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Skill {index + 1}</span>
              <Button variant="ghost" size="icon" onClick={() => removeSkill(index)} data-testid={`button-remove-skill-${index}`}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <Input data-testid={`input-skill-name-${index}`} placeholder="Skill name" value={skill.name} onChange={(e) => updateSkill(index, 'name', e.target.value)} className="bg-background/50 border-border/50" />
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs text-muted-foreground">Percentage</label>
                <Input data-testid={`input-skill-percentage-${index}`} type="number" min={0} max={100} value={skill.percentage} onChange={(e) => updateSkill(index, 'percentage', parseInt(e.target.value) || 0)} className="bg-background/50 border-border/50" />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs text-muted-foreground">Color</label>
                <Input data-testid={`input-skill-color-${index}`} placeholder="primary/accent/cyan" value={skill.color} onChange={(e) => updateSkill(index, 'color', e.target.value)} className="bg-background/50 border-border/50" />
              </div>
            </div>
            <Textarea data-testid={`input-skill-description-${index}`} placeholder="Description" value={skill.description} onChange={(e) => updateSkill(index, 'description', e.target.value)} rows={2} className="bg-background/50 border-border/50 resize-none" />
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addSkill} className="w-full" data-testid="button-add-skill">
        <Plus className="w-4 h-4 mr-2" /> Add Skill
      </Button>
    </div>
  );
}

function ProjectsEditor({ projects, onChange }: { projects: Project[]; onChange: (p: Project[]) => void }) {
  const updateProject = (index: number, field: keyof Project, value: unknown) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addProject = () => {
    onChange([...projects, { title: '', description: '', role: '', details: '', tags: [], color: 'from-blue-500 to-cyan-500', demo_link: null, github_link: null, image_url: null }]);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <Card key={index} className="glass border border-border/30">
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Project {index + 1}</span>
              <Button variant="ghost" size="icon" onClick={() => removeProject(index)} data-testid={`button-remove-project-${index}`}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <Input data-testid={`input-project-title-${index}`} placeholder="Title" value={project.title} onChange={(e) => updateProject(index, 'title', e.target.value)} className="bg-background/50 border-border/50" />
            <Input data-testid={`input-project-role-${index}`} placeholder="Role" value={project.role} onChange={(e) => updateProject(index, 'role', e.target.value)} className="bg-background/50 border-border/50" />
            <Textarea data-testid={`input-project-description-${index}`} placeholder="Description" value={project.description} onChange={(e) => updateProject(index, 'description', e.target.value)} rows={2} className="bg-background/50 border-border/50 resize-none" />
            <Textarea data-testid={`input-project-details-${index}`} placeholder="Details" value={project.details} onChange={(e) => updateProject(index, 'details', e.target.value)} rows={2} className="bg-background/50 border-border/50 resize-none" />
            <Input data-testid={`input-project-tags-${index}`} placeholder="Tags (comma separated)" value={project.tags.join(', ')} onChange={(e) => updateProject(index, 'tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))} className="bg-background/50 border-border/50" />
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs text-muted-foreground">Color gradient</label>
                <Input data-testid={`input-project-color-${index}`} placeholder="from-blue-500 to-cyan-500" value={project.color} onChange={(e) => updateProject(index, 'color', e.target.value)} className="bg-background/50 border-border/50" />
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs text-muted-foreground">Demo Link</label>
                <Input data-testid={`input-project-demo-${index}`} placeholder="https://..." value={project.demo_link || ''} onChange={(e) => updateProject(index, 'demo_link', e.target.value || null)} className="bg-background/50 border-border/50" />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs text-muted-foreground">GitHub Link</label>
                <Input data-testid={`input-project-github-${index}`} placeholder="https://..." value={project.github_link || ''} onChange={(e) => updateProject(index, 'github_link', e.target.value || null)} className="bg-background/50 border-border/50" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Project Image URL</label>
              <Input data-testid={`input-project-image-${index}`} placeholder="https://example.com/image.png" value={project.image_url || ''} onChange={(e) => updateProject(index, 'image_url', e.target.value || null)} className="bg-background/50 border-border/50" />
              {project.image_url && (
                <div className="mt-2 rounded-lg overflow-hidden border border-border/30 max-w-[200px]">
                  <img src={project.image_url} alt="Preview" className="w-full h-auto object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addProject} className="w-full" data-testid="button-add-project">
        <Plus className="w-4 h-4 mr-2" /> Add Project
      </Button>
    </div>
  );
}

function ServicesEditor({ services, onChange }: { services: Service[]; onChange: (s: Service[]) => void }) {
  const updateService = (index: number, field: keyof Service, value: string | null) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addService = () => {
    onChange([...services, { title: '', description: '', color: 'primary', image_url: null }]);
  };

  const removeService = (index: number) => {
    onChange(services.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <Card key={index} className="glass border border-border/30">
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Service {index + 1}</span>
              <Button variant="ghost" size="icon" onClick={() => removeService(index)} data-testid={`button-remove-service-${index}`}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <Input data-testid={`input-service-title-${index}`} placeholder="Title" value={service.title} onChange={(e) => updateService(index, 'title', e.target.value)} className="bg-background/50 border-border/50" />
            <Textarea data-testid={`input-service-description-${index}`} placeholder="Description" value={service.description} onChange={(e) => updateService(index, 'description', e.target.value)} rows={2} className="bg-background/50 border-border/50 resize-none" />
            <Input data-testid={`input-service-color-${index}`} placeholder="primary/accent/cyan" value={service.color} onChange={(e) => updateService(index, 'color', e.target.value)} className="bg-background/50 border-border/50" />
            <div>
              <label className="text-xs text-muted-foreground">Service Image URL</label>
              <Input data-testid={`input-service-image-${index}`} placeholder="https://example.com/image.png" value={service.image_url || ''} onChange={(e) => updateService(index, 'image_url', e.target.value || null)} className="bg-background/50 border-border/50" />
              {service.image_url && (
                <div className="mt-2 rounded-lg overflow-hidden border border-border/30 max-w-[200px]">
                  <img src={service.image_url} alt="Preview" className="w-full h-auto object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addService} className="w-full" data-testid="button-add-service">
        <Plus className="w-4 h-4 mr-2" /> Add Service
      </Button>
    </div>
  );
}

function EducationEditor({ education, onChange }: { education: Education[]; onChange: (e: Education[]) => void }) {
  const updateEdu = (index: number, field: keyof Education, value: unknown) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const updateCourse = (eduIndex: number, courseIndex: number, field: keyof CourseItem, value: string) => {
    const updated = [...education];
    const courses = [...updated[eduIndex].courses];
    courses[courseIndex] = { ...courses[courseIndex], [field]: value };
    updated[eduIndex] = { ...updated[eduIndex], courses };
    onChange(updated);
  };

  const addCourse = (eduIndex: number) => {
    const updated = [...education];
    updated[eduIndex] = { ...updated[eduIndex], courses: [...updated[eduIndex].courses, { name: '', color: 'primary' }] };
    onChange(updated);
  };

  const removeCourse = (eduIndex: number, courseIndex: number) => {
    const updated = [...education];
    updated[eduIndex] = { ...updated[eduIndex], courses: updated[eduIndex].courses.filter((_, i) => i !== courseIndex) };
    onChange(updated);
  };

  const addEducation = () => {
    onChange([...education, { institution: '', department: '', status: '', courses: [], website_url: null, logo_url: null }]);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <Card key={index} className="glass border border-border/30">
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Education {index + 1}</span>
              <Button variant="ghost" size="icon" onClick={() => removeEducation(index)} data-testid={`button-remove-education-${index}`}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <Input data-testid={`input-education-institution-${index}`} placeholder="Institution" value={edu.institution} onChange={(e) => updateEdu(index, 'institution', e.target.value)} className="bg-background/50 border-border/50" />
            <Input data-testid={`input-education-department-${index}`} placeholder="Department" value={edu.department} onChange={(e) => updateEdu(index, 'department', e.target.value)} className="bg-background/50 border-border/50" />
            <Input data-testid={`input-education-status-${index}`} placeholder="Status (e.g., Graduated)" value={edu.status} onChange={(e) => updateEdu(index, 'status', e.target.value)} className="bg-background/50 border-border/50" />
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs text-muted-foreground">Institution Website</label>
                <Input data-testid={`input-education-website-${index}`} placeholder="https://university.edu" value={edu.website_url || ''} onChange={(e) => updateEdu(index, 'website_url', e.target.value || null)} className="bg-background/50 border-border/50" />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs text-muted-foreground">Institution Logo URL</label>
                <Input data-testid={`input-education-logo-${index}`} placeholder="https://example.com/logo.png" value={edu.logo_url || ''} onChange={(e) => updateEdu(index, 'logo_url', e.target.value || null)} className="bg-background/50 border-border/50" />
              </div>
            </div>
            {edu.logo_url && (
              <div className="rounded-lg overflow-hidden border border-border/30 max-w-[80px]">
                <img src={edu.logo_url} alt="Logo preview" className="w-full h-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
            <div className="pl-4 border-l-2 border-border/30 space-y-2 mt-2">
              <span className="text-xs font-medium text-muted-foreground">Courses</span>
              {edu.courses.map((course, cIndex) => (
                <div key={cIndex} className="flex gap-2 items-center flex-wrap">
                  <Input data-testid={`input-course-name-${index}-${cIndex}`} placeholder="Course name" value={course.name} onChange={(e) => updateCourse(index, cIndex, 'name', e.target.value)} className="flex-1 min-w-[100px] bg-background/50 border-border/50" />
                  <Input data-testid={`input-course-color-${index}-${cIndex}`} placeholder="Color" value={course.color} onChange={(e) => updateCourse(index, cIndex, 'color', e.target.value)} className="w-24 bg-background/50 border-border/50" />
                  <Button variant="ghost" size="icon" onClick={() => removeCourse(index, cIndex)} data-testid={`button-remove-course-${index}-${cIndex}`}>
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => addCourse(index)} data-testid={`button-add-course-${index}`}>
                <Plus className="w-3 h-3 mr-1" /> Add Course
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addEducation} className="w-full" data-testid="button-add-education">
        <Plus className="w-4 h-4 mr-2" /> Add Education
      </Button>
    </div>
  );
}

function GoalsEditor({ goals, onChange }: { goals: Goal[]; onChange: (g: Goal[]) => void }) {
  const updateGoal = (index: number, field: keyof Goal, value: string) => {
    const updated = [...goals];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addGoal = () => {
    onChange([...goals, { title: '', description: '', color: 'primary' }]);
  };

  const removeGoal = (index: number) => {
    onChange(goals.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {goals.map((goal, index) => (
        <Card key={index} className="glass border border-border/30">
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Goal {index + 1}</span>
              <Button variant="ghost" size="icon" onClick={() => removeGoal(index)} data-testid={`button-remove-goal-${index}`}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <Input data-testid={`input-goal-title-${index}`} placeholder="Title" value={goal.title} onChange={(e) => updateGoal(index, 'title', e.target.value)} className="bg-background/50 border-border/50" />
            <Textarea data-testid={`input-goal-description-${index}`} placeholder="Description" value={goal.description} onChange={(e) => updateGoal(index, 'description', e.target.value)} rows={2} className="bg-background/50 border-border/50 resize-none" />
            <Input data-testid={`input-goal-color-${index}`} placeholder="primary/accent/cyan" value={goal.color} onChange={(e) => updateGoal(index, 'color', e.target.value)} className="bg-background/50 border-border/50" />
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addGoal} className="w-full" data-testid="button-add-goal">
        <Plus className="w-4 h-4 mr-2" /> Add Goal
      </Button>
    </div>
  );
}

const PLATFORM_OPTIONS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'fiverr', label: 'Fiverr' },
  { value: 'dribbble', label: 'Dribbble' },
  { value: 'behance', label: 'Behance' },
  { value: 'discord', label: 'Discord' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'custom', label: 'Custom (use icon URL)' },
];

function SocialLinksEditor({ links, onChange }: { links: SocialLink[]; onChange: (l: SocialLink[]) => void }) {
  const updateLink = (index: number, field: keyof SocialLink, value: string | null) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addLink = () => {
    onChange([...links, { name: '', href: '', platform: '', icon: null }]);
  };

  const removeLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {links.map((link, index) => (
        <Card key={index} className="glass border border-border/30">
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Link {index + 1}</span>
              <Button variant="ghost" size="icon" onClick={() => removeLink(index)} data-testid={`button-remove-social-${index}`}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <Input data-testid={`input-social-name-${index}`} placeholder="Name (e.g., GitHub)" value={link.name} onChange={(e) => updateLink(index, 'name', e.target.value)} className="bg-background/50 border-border/50" />
            <Input data-testid={`input-social-href-${index}`} placeholder="URL" value={link.href} onChange={(e) => updateLink(index, 'href', e.target.value)} className="bg-background/50 border-border/50" />
            <div>
              <label className="text-xs text-muted-foreground">Platform Icon</label>
              <select
                data-testid={`select-social-platform-${index}`}
                value={link.platform}
                onChange={(e) => updateLink(index, 'platform', e.target.value)}
                className="w-full h-9 px-3 rounded-md border border-border/50 bg-background/50 text-sm text-foreground"
              >
                <option value="">Select a platform...</option>
                {PLATFORM_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {link.platform === 'custom' && (
              <div>
                <label className="text-xs text-muted-foreground">Custom Icon URL</label>
                <Input data-testid={`input-social-icon-${index}`} placeholder="https://example.com/icon.svg" value={link.icon || ''} onChange={(e) => updateLink(index, 'icon', e.target.value || null)} className="bg-background/50 border-border/50" />
                {link.icon && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md overflow-hidden border border-border/30">
                      <img src={link.icon} alt="Icon preview" className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                    <span className="text-xs text-muted-foreground">Icon preview</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addLink} className="w-full" data-testid="button-add-social">
        <Plus className="w-4 h-4 mr-2" /> Add Social Link
      </Button>
    </div>
  );
}

function ArrayField({ label, values, onChange }: { label: string; values: string[]; onChange: (v: string[]) => void }) {
  const update = (i: number, val: string) => { const n = [...values]; n[i] = val; onChange(n); };
  const add = () => onChange([...values, '']);
  const remove = (i: number) => onChange(values.filter((_, j) => j !== i));
  return (
    <div>
      <label className="text-xs text-muted-foreground block mb-1">{label}</label>
      <div className="space-y-1.5">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <Input value={v} onChange={(e) => update(i, e.target.value)} className="bg-background/50 border-border/50 text-sm" placeholder={`${label} item...`} />
            <Button variant="ghost" size="icon" onClick={() => remove(i)} className="flex-shrink-0"><Trash2 className="w-3.5 h-3.5 text-red-500" /></Button>
          </div>
        ))}
        <Button variant="ghost" size="sm" onClick={add} className="text-xs text-primary h-7 px-2"><Plus className="w-3 h-3 mr-1" />Add</Button>
      </div>
    </div>
  );
}

function DetailsEditor({
  services, skills, goals,
  onServicesChange, onSkillsChange, onGoalsChange,
}: {
  services: Service[]; skills: Skill[]; goals: Goal[];
  onServicesChange: (s: Service[]) => void;
  onSkillsChange: (s: Skill[]) => void;
  onGoalsChange: (g: Goal[]) => void;
}) {
  const [store, setStore] = useState<PopupDetailsStore>(() => getPopupDetails());
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const toggle = (key: string) => setExpandedKey(prev => prev === key ? null : key);

  const saveAll = () => {
    savePopupDetails(store);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  /* ---------- popup detail updaters ---------- */
  const updateService = (title: string, field: keyof ServicePopupDetail, value: string | string[]) =>
    setStore(prev => ({ ...prev, services: { ...prev.services, [title]: { ...(prev.services[title] ?? { tagline:'', overview:'', tools:[], includes:[], idealFor:'' }), [field]: value } } }));

  const updateSkill = (name: string, field: keyof SkillPopupDetail, value: string | string[]) =>
    setStore(prev => ({ ...prev, skills: { ...prev.skills, [name]: { ...(prev.skills[name] ?? { level:'Intermediate', summary:'', tools:[], capabilities:[], highlight:'' }), [field]: value } } }));

  const updateGoal = (title: string, field: keyof GoalPopupDetail, value: string | string[]) =>
    setStore(prev => ({ ...prev, goals: { ...prev.goals, [title]: { ...(prev.goals[title] ?? { overview:'', steps:[], timeline:'', motivation:'' }), [field]: value } } }));

  /* ---------- rename popup key when title changes ---------- */
  const renameServiceKey = (oldTitle: string, newTitle: string) => {
    if (oldTitle === newTitle) return;
    setStore(prev => {
      const entries = { ...prev.services };
      if (entries[oldTitle]) { entries[newTitle] = entries[oldTitle]; delete entries[oldTitle]; }
      return { ...prev, services: entries };
    });
  };
  const renameSkillKey = (oldName: string, newName: string) => {
    if (oldName === newName) return;
    setStore(prev => {
      const entries = { ...prev.skills };
      if (entries[oldName]) { entries[newName] = entries[oldName]; delete entries[oldName]; }
      return { ...prev, skills: entries };
    });
  };
  const renameGoalKey = (oldTitle: string, newTitle: string) => {
    if (oldTitle === newTitle) return;
    setStore(prev => {
      const entries = { ...prev.goals };
      if (entries[oldTitle]) { entries[newTitle] = entries[oldTitle]; delete entries[oldTitle]; }
      return { ...prev, goals: entries };
    });
  };

  /* ---------- add / delete ---------- */
  const addService = () => {
    const newSvc: Service = { title: 'New Service', description: '', color: 'primary', image_url: null };
    onServicesChange([...services, newSvc]);
    setExpandedKey(`svc-New Service`);
  };
  const deleteService = (title: string) => {
    onServicesChange(services.filter(s => s.title !== title));
    setStore(prev => { const e = { ...prev.services }; delete e[title]; return { ...prev, services: e }; });
    if (expandedKey === `svc-${title}`) setExpandedKey(null);
  };

  const addSkill = () => {
    const newSk: Skill = { name: 'New Skill', percentage: 50, description: '', color: 'primary' };
    onSkillsChange([...skills, newSk]);
    setExpandedKey(`sk-New Skill`);
  };
  const deleteSkill = (name: string) => {
    onSkillsChange(skills.filter(s => s.name !== name));
    setStore(prev => { const e = { ...prev.skills }; delete e[name]; return { ...prev, skills: e }; });
    if (expandedKey === `sk-${name}`) setExpandedKey(null);
  };

  const addGoal = () => {
    const newGoal: Goal = { title: 'New Goal', description: '', color: 'primary' };
    onGoalsChange([...goals, newGoal]);
    setExpandedKey(`goal-New Goal`);
  };
  const deleteGoal = (title: string) => {
    onGoalsChange(goals.filter(g => g.title !== title));
    setStore(prev => { const e = { ...prev.goals }; delete e[title]; return { ...prev, goals: e }; });
    if (expandedKey === `goal-${title}`) setExpandedKey(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-sm text-foreground/80 leading-relaxed">
        Add, edit, or delete Services, Skills, and Goals — including their full popup details. Hit <strong>Save Card Details</strong> to store popup content, then <strong>Save All</strong> (top right) to sync everything to the database.
      </div>

      {/* ── Services ── */}
      <div>
        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4" /> Services
          <span className="ml-auto text-xs text-muted-foreground font-normal normal-case">{services.length} items</span>
        </h3>
        <div className="space-y-2">
          {services.map((svc, idx) => {
            const key = `svc-${svc.title}`;
            const d = store.services[svc.title] ?? { tagline: '', overview: '', tools: [], includes: [], idealFor: '' };
            const open = expandedKey === key;
            return (
              <Card key={`${svc.title}-${idx}`} className="glass border border-border/30">
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggle(key)} className="flex-1 flex items-center justify-between text-left gap-2 min-w-0">
                      <span className="text-sm font-semibold truncate">{svc.title || <span className="text-muted-foreground italic">Untitled Service</span>}</span>
                      {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                    </button>
                    <Button variant="ghost" size="icon" className="flex-shrink-0 h-7 w-7" onClick={() => deleteService(svc.title)} title="Delete service">
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </Button>
                  </div>
                  {open && (
                    <div className="mt-4 space-y-3 border-t border-border/20 pt-4">
                      <div className="p-3 rounded-lg bg-card/40 border border-border/20 space-y-2">
                        <p className="text-[11px] font-bold text-primary uppercase tracking-widest">Card Basics</p>
                        <div>
                          <label className="text-xs text-muted-foreground">Title</label>
                          <Input value={svc.title} onChange={(e) => { const old = svc.title; const updated = [...services]; updated[idx] = { ...svc, title: e.target.value }; onServicesChange(updated); renameServiceKey(old, e.target.value); setExpandedKey(`svc-${e.target.value}`); }} className="bg-background/50 border-border/50 mt-1" placeholder="Service title" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Short Description</label>
                          <Textarea value={svc.description} onChange={(e) => { const updated = [...services]; updated[idx] = { ...svc, description: e.target.value }; onServicesChange(updated); }} rows={2} className="bg-background/50 border-border/50 resize-none mt-1" placeholder="Brief description shown on the card" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Color (e.g. primary, accent, cyan)</label>
                          <Input value={svc.color} onChange={(e) => { const updated = [...services]; updated[idx] = { ...svc, color: e.target.value }; onServicesChange(updated); }} className="bg-background/50 border-border/50 mt-1" placeholder="primary" />
                        </div>
                      </div>
                      <p className="text-[11px] font-bold text-primary uppercase tracking-widest pt-1">Popup Details</p>
                      <div><label className="text-xs text-muted-foreground">Tagline</label><Input value={d.tagline} onChange={(e) => updateService(svc.title, 'tagline', e.target.value)} className="bg-background/50 border-border/50 mt-1" placeholder="One-line summary" /></div>
                      <div><label className="text-xs text-muted-foreground">Overview</label><Textarea value={d.overview} onChange={(e) => updateService(svc.title, 'overview', e.target.value)} rows={4} className="bg-background/50 border-border/50 resize-none mt-1" placeholder="Detailed overview..." /></div>
                      <ArrayField label="Tools & Technologies" values={d.tools} onChange={(v) => updateService(svc.title, 'tools', v)} />
                      <ArrayField label="What's Included" values={d.includes} onChange={(v) => updateService(svc.title, 'includes', v)} />
                      <div><label className="text-xs text-muted-foreground">Ideal For</label><Textarea value={d.idealFor} onChange={(e) => updateService(svc.title, 'idealFor', e.target.value)} rows={2} className="bg-background/50 border-border/50 resize-none mt-1" placeholder="Who this service is best for..." /></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Button variant="outline" onClick={addService} className="w-full mt-2 border-dashed text-primary hover:text-primary">
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </Button>
      </div>

      {/* ── Skills ── */}
      <div>
        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" /> Skills
          <span className="ml-auto text-xs text-muted-foreground font-normal normal-case">{skills.length} items</span>
        </h3>
        <div className="space-y-2">
          {skills.map((sk, idx) => {
            const key = `sk-${sk.name}`;
            const d = store.skills[sk.name] ?? { level: 'Intermediate', summary: '', tools: [], capabilities: [], highlight: '' };
            const open = expandedKey === key;
            return (
              <Card key={`${sk.name}-${idx}`} className="glass border border-border/30">
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggle(key)} className="flex-1 flex items-center justify-between text-left gap-2 min-w-0">
                      <span className="text-sm font-semibold truncate">{sk.name || <span className="text-muted-foreground italic">Untitled Skill</span>}</span>
                      {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                    </button>
                    <Button variant="ghost" size="icon" className="flex-shrink-0 h-7 w-7" onClick={() => deleteSkill(sk.name)} title="Delete skill">
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </Button>
                  </div>
                  {open && (
                    <div className="mt-4 space-y-3 border-t border-border/20 pt-4">
                      <div className="p-3 rounded-lg bg-card/40 border border-border/20 space-y-2">
                        <p className="text-[11px] font-bold text-primary uppercase tracking-widest">Card Basics</p>
                        <div>
                          <label className="text-xs text-muted-foreground">Name</label>
                          <Input value={sk.name} onChange={(e) => { const old = sk.name; const updated = [...skills]; updated[idx] = { ...sk, name: e.target.value }; onSkillsChange(updated); renameSkillKey(old, e.target.value); setExpandedKey(`sk-${e.target.value}`); }} className="bg-background/50 border-border/50 mt-1" placeholder="Skill name" />
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="text-xs text-muted-foreground">Percentage (0–100)</label>
                            <Input type="number" min={0} max={100} value={sk.percentage} onChange={(e) => { const updated = [...skills]; updated[idx] = { ...sk, percentage: parseInt(e.target.value) || 0 }; onSkillsChange(updated); }} className="bg-background/50 border-border/50 mt-1" />
                          </div>
                          <div className="flex-1">
                            <label className="text-xs text-muted-foreground">Color</label>
                            <Input value={sk.color} onChange={(e) => { const updated = [...skills]; updated[idx] = { ...sk, color: e.target.value }; onSkillsChange(updated); }} className="bg-background/50 border-border/50 mt-1" placeholder="primary" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Short Description</label>
                          <Textarea value={sk.description} onChange={(e) => { const updated = [...skills]; updated[idx] = { ...sk, description: e.target.value }; onSkillsChange(updated); }} rows={2} className="bg-background/50 border-border/50 resize-none mt-1" placeholder="Brief description shown on the card" />
                        </div>
                      </div>
                      <p className="text-[11px] font-bold text-primary uppercase tracking-widest pt-1">Popup Details</p>
                      <div>
                        <label className="text-xs text-muted-foreground">Level</label>
                        <select value={d.level} onChange={(e) => updateSkill(sk.name, 'level', e.target.value)} className="w-full h-9 px-3 rounded-md border border-border/50 bg-background/50 text-sm text-foreground mt-1">
                          <option value="Expert">Expert</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Beginner">Beginner</option>
                        </select>
                      </div>
                      <div><label className="text-xs text-muted-foreground">Summary</label><Textarea value={d.summary} onChange={(e) => updateSkill(sk.name, 'summary', e.target.value)} rows={4} className="bg-background/50 border-border/50 resize-none mt-1" placeholder="About this skill..." /></div>
                      <ArrayField label="Tools I Use" values={d.tools} onChange={(v) => updateSkill(sk.name, 'tools', v)} />
                      <ArrayField label="Key Capabilities" values={d.capabilities} onChange={(v) => updateSkill(sk.name, 'capabilities', v)} />
                      <div><label className="text-xs text-muted-foreground">Highlight Quote</label><Textarea value={d.highlight} onChange={(e) => updateSkill(sk.name, 'highlight', e.target.value)} rows={2} className="bg-background/50 border-border/50 resize-none mt-1" placeholder="A memorable quote about this skill..." /></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Button variant="outline" onClick={addSkill} className="w-full mt-2 border-dashed text-primary hover:text-primary">
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>

      {/* ── Goals ── */}
      <div>
        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" /> Goals
          <span className="ml-auto text-xs text-muted-foreground font-normal normal-case">{goals.length} items</span>
        </h3>
        <div className="space-y-2">
          {goals.map((goal, idx) => {
            const key = `goal-${goal.title}`;
            const d = store.goals[goal.title] ?? { overview: '', steps: [], timeline: '', motivation: '' };
            const open = expandedKey === key;
            return (
              <Card key={`${goal.title}-${idx}`} className="glass border border-border/30">
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggle(key)} className="flex-1 flex items-center justify-between text-left gap-2 min-w-0">
                      <span className="text-sm font-semibold truncate">{goal.title || <span className="text-muted-foreground italic">Untitled Goal</span>}</span>
                      {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                    </button>
                    <Button variant="ghost" size="icon" className="flex-shrink-0 h-7 w-7" onClick={() => deleteGoal(goal.title)} title="Delete goal">
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </Button>
                  </div>
                  {open && (
                    <div className="mt-4 space-y-3 border-t border-border/20 pt-4">
                      <div className="p-3 rounded-lg bg-card/40 border border-border/20 space-y-2">
                        <p className="text-[11px] font-bold text-primary uppercase tracking-widest">Card Basics</p>
                        <div>
                          <label className="text-xs text-muted-foreground">Title</label>
                          <Input value={goal.title} onChange={(e) => { const old = goal.title; const updated = [...goals]; updated[idx] = { ...goal, title: e.target.value }; onGoalsChange(updated); renameGoalKey(old, e.target.value); setExpandedKey(`goal-${e.target.value}`); }} className="bg-background/50 border-border/50 mt-1" placeholder="Goal title" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Short Description</label>
                          <Textarea value={goal.description} onChange={(e) => { const updated = [...goals]; updated[idx] = { ...goal, description: e.target.value }; onGoalsChange(updated); }} rows={2} className="bg-background/50 border-border/50 resize-none mt-1" placeholder="Brief description shown on the card" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Color</label>
                          <Input value={goal.color} onChange={(e) => { const updated = [...goals]; updated[idx] = { ...goal, color: e.target.value }; onGoalsChange(updated); }} className="bg-background/50 border-border/50 mt-1" placeholder="primary" />
                        </div>
                      </div>
                      <p className="text-[11px] font-bold text-primary uppercase tracking-widest pt-1">Popup Details</p>
                      <div><label className="text-xs text-muted-foreground">Goal Overview</label><Textarea value={d.overview} onChange={(e) => updateGoal(goal.title, 'overview', e.target.value)} rows={4} className="bg-background/50 border-border/50 resize-none mt-1" placeholder="Describe this goal in detail..." /></div>
                      <ArrayField label="Action Plan Steps" values={d.steps} onChange={(v) => updateGoal(goal.title, 'steps', v)} />
                      <div><label className="text-xs text-muted-foreground">Timeline</label><Input value={d.timeline} onChange={(e) => updateGoal(goal.title, 'timeline', e.target.value)} className="bg-background/50 border-border/50 mt-1" placeholder="2025 – 2026" /></div>
                      <div><label className="text-xs text-muted-foreground">Motivation</label><Textarea value={d.motivation} onChange={(e) => updateGoal(goal.title, 'motivation', e.target.value)} rows={2} className="bg-background/50 border-border/50 resize-none mt-1" placeholder="Why this goal matters to you..." /></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Button variant="outline" onClick={addGoal} className="w-full mt-2 border-dashed text-primary hover:text-primary">
          <Plus className="w-4 h-4 mr-2" /> Add Goal
        </Button>
      </div>

      <div className="sticky bottom-0 bg-background/90 backdrop-blur-sm border-t border-border/30 -mx-6 px-6 py-4 mt-4">
        <div className="flex items-center gap-3">
          <Button onClick={saveAll} className="flex-1">
            <Save className="w-4 h-4 mr-2" /> Save Card Details
          </Button>
          {saved && <span className="text-sm text-emerald-400 font-medium">✓ Saved!</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-2">Save Card Details stores popup content instantly. Use "Save All" (top right) to also sync titles, descriptions & new items to the database.</p>
      </div>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'disconnected' | 'no-config'>('checking');

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function loadData() {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (!supabaseUrl) {
          setDbStatus('no-config');
          return;
        }

        const [profileRes, skillsRes, projectsRes, servicesRes, educationRes, goalsRes, socialRes] = await Promise.all([
          supabase.from('profiles').select('*').limit(1).single(),
          supabase.from('skills').select('*'),
          supabase.from('projects').select('*'),
          supabase.from('services').select('*'),
          supabase.from('education').select('*'),
          supabase.from('goals').select('*'),
          supabase.from('social_links').select('*'),
        ]);

        const hasErrors = [profileRes, skillsRes, projectsRes, servicesRes, educationRes, goalsRes, socialRes]
          .some(res => res.error && res.error.code !== 'PGRST116');

        if (hasErrors) {
          setDbStatus('disconnected');
        } else {
          setDbStatus('connected');
        }

        if (profileRes.data) setProfile(profileRes.data);
        if (skillsRes.data && skillsRes.data.length > 0) setSkills(skillsRes.data);
        if (projectsRes.data && projectsRes.data.length > 0) setProjects(projectsRes.data);
        if (servicesRes.data && servicesRes.data.length > 0) setServices(servicesRes.data);
        if (educationRes.data && educationRes.data.length > 0) setEducation(educationRes.data);
        if (goalsRes.data && goalsRes.data.length > 0) setGoals(goalsRes.data);
        if (socialRes.data && socialRes.data.length > 0) setSocialLinks(socialRes.data);
      } catch {
        setDbStatus('disconnected');
      }
    }

    loadData();
  }, [isAuthenticated]);

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');
    const errors: string[] = [];
    const saved: string[] = [];

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        setSaveMessage('Supabase not configured.');
        setSaving(false);
        return;
      }

      const profileFields: Record<string, unknown> = {
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        email: profile.email,
        location: profile.location,
        available_status: profile.available_status,
      };

      let profileId: string | number | null = profile.id || null;

      const { data: existingProfile } = await supabase.from('profiles').select('id').limit(1).single();

      if (existingProfile?.id) {
        profileId = existingProfile.id;
        const { error: updateErr } = await supabase
          .from('profiles')
          .update({
            name: profile.name,
            title: profile.title,
            bio: profile.bio,
            email: profile.email,
            location: profile.location,
            available_status: profile.available_status,
          })
          .eq('id', profileId);
        if (updateErr) {
          console.error('Profile update error:', updateErr);
          errors.push(`Profile: ${updateErr.message}`);
        } else {
          saved.push('Profile');
        }
      } else {
        const { data: newProfile, error: insertErr } = await supabase.from('profiles').insert(profileFields).select('id').single();
        if (insertErr) {
          if (insertErr.code === '42P01') {
            errors.push('Profile table missing');
          } else {
            errors.push(`Profile: ${insertErr.message}`);
          }
        } else {
          profileId = newProfile?.id || null;
          saved.push('Profile');
        }
      }

      if (!profileId) {
        setSaveMessage(`Profile save failed: ${errors.join('; ')}. Other sections were not saved to prevent data loss.`);
        setSaving(false);
        return;
      }

      const sections = [
        { name: 'Skills', table: 'skills', data: skills },
        { name: 'Projects', table: 'projects', data: projects },
        { name: 'Services', table: 'services', data: services },
        { name: 'Education', table: 'education', data: education },
        { name: 'Goals', table: 'goals', data: goals },
        { name: 'Social Links', table: 'social_links', data: socialLinks },
      ];

      for (const section of sections) {
        try {
          await supabase.from(section.table).delete().eq('profile_id', profileId);

          if (section.data.length > 0) {
            const cleanData = section.data.map((item: any) => {
              const { id: _id, ...rest } = item;
              return { ...rest, profile_id: profileId };
            });
            const { error: insertError } = await supabase.from(section.table).insert(cleanData);
            if (insertError) {
              errors.push(`${section.name}: ${insertError.message}`);
            } else {
              saved.push(section.name);
            }
          } else {
            saved.push(section.name);
          }
        } catch (sectionErr) {
          errors.push(`${section.name}: ${sectionErr instanceof Error ? sectionErr.message : 'Failed'}`);
        }
      }

      if (errors.length === 0) {
        setSaveMessage('All changes saved successfully!');
        localStorage.setItem('portfolio_data_updated', Date.now().toString());
      } else if (saved.length > 0) {
        setSaveMessage(`Saved: ${saved.join(', ')}. Errors: ${errors.join('; ')}`);
        localStorage.setItem('portfolio_data_updated', Date.now().toString());
      } else {
        setSaveMessage(`Error saving: ${errors.join('; ')}`);
      }
    } catch (err) {
      setSaveMessage(`Error: ${err instanceof Error ? err.message : 'Something went wrong'}`);
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass border-b border-border/30 px-3 sm:px-4 py-2 sm:py-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} data-testid="button-back-portfolio">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-base sm:text-lg font-bold gradient-text truncate" data-testid="text-admin-header">Admin Panel</h1>
              <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border whitespace-nowrap ${
                dbStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                dbStatus === 'disconnected' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                dbStatus === 'no-config' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                'bg-muted text-muted-foreground border-border/30'
              }`} data-testid="text-db-status">
                {dbStatus === 'connected' ? 'DB Connected' :
                 dbStatus === 'disconnected' ? 'DB Error' :
                 dbStatus === 'no-config' ? 'No DB' :
                 'Checking...'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <Button onClick={handleSave} disabled={saving} data-testid="button-save" size="sm">
                <Save className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save All'}</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {saveMessage && (
            <div className={`mt-2 text-xs sm:text-sm px-2 py-1.5 rounded-md ${
              saveMessage.includes('Error') || saveMessage.includes('Errors')
                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`} data-testid="text-save-message">
              {saveMessage}
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto p-3 sm:p-4">
        <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 flex-wrap">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`tab-${tab.id}`}
              size="sm"
              className="flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm"
            >
              <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        <Card className="glass border border-border/30">
          <CardHeader className="px-3 sm:px-6 py-3 sm:py-4">
            <CardTitle className="text-lg sm:text-xl" data-testid="text-section-title">
              {tabs.find((t) => t.id === activeTab)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            {activeTab === 'profile' && <ProfileEditor profile={profile} onChange={setProfile} />}
            {activeTab === 'skills' && <SkillsEditor skills={skills} onChange={setSkills} />}
            {activeTab === 'projects' && <ProjectsEditor projects={projects} onChange={setProjects} />}
            {activeTab === 'services' && <ServicesEditor services={services} onChange={setServices} />}
            {activeTab === 'education' && <EducationEditor education={education} onChange={setEducation} />}
            {activeTab === 'goals' && <GoalsEditor goals={goals} onChange={setGoals} />}
            {activeTab === 'socialLinks' && <SocialLinksEditor links={socialLinks} onChange={setSocialLinks} />}
            {activeTab === 'cardDetails' && <DetailsEditor services={services} skills={skills} goals={goals} onServicesChange={setServices} onSkillsChange={setSkills} onGoalsChange={setGoals} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
