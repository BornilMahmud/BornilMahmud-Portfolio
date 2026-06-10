import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Profile, Skill, Project, Service, Education, Goal, SocialLink, Certificate } from '@/lib/types';
import {
  defaultProfile,
  defaultSkills,
  defaultProjects,
  defaultServices,
  defaultEducation,
  defaultGoals,
  defaultSocialLinks,
  defaultCertificates,
} from '@/lib/defaultData';

const CACHE_KEY = 'portfolio_data_cache';
const CACHE_EVENT = 'portfolio_cache_updated';

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function applyCache(
  cache: ReturnType<typeof loadCache>,
  setters: {
    setProfile: (v: Profile) => void;
    setSkills: (v: Skill[]) => void;
    setProjects: (v: Project[]) => void;
    setServices: (v: Service[]) => void;
    setEducation: (v: Education[]) => void;
    setGoals: (v: Goal[]) => void;
    setSocialLinks: (v: SocialLink[]) => void;
    setCertificates: (v: Certificate[]) => void;
  }
) {
  if (!cache) return;
  if (cache.profile) setters.setProfile(cache.profile);
  if (cache.skills?.length > 0) setters.setSkills(cache.skills);
  if (cache.projects?.length > 0) setters.setProjects(cache.projects);
  if (cache.services?.length > 0) setters.setServices(cache.services);
  if (cache.education?.length > 0) setters.setEducation(cache.education);
  if (cache.goals?.length > 0) setters.setGoals(cache.goals);
  if (cache.socialLinks?.length > 0) setters.setSocialLinks(cache.socialLinks);
  if (cache.certificates?.length > 0) setters.setCertificates(cache.certificates);
}

export function usePortfolioData() {
  // Start with cache if available, otherwise defaults — zero loading flicker
  const cached = loadCache();

  const [profile, setProfile] = useState<Profile>(cached?.profile ?? defaultProfile);
  const [skills, setSkills] = useState<Skill[]>(cached?.skills?.length ? cached.skills : defaultSkills);
  const [projects, setProjects] = useState<Project[]>(cached?.projects?.length ? cached.projects : defaultProjects);
  const [services, setServices] = useState<Service[]>(cached?.services?.length ? cached.services : defaultServices);
  const [education, setEducation] = useState<Education[]>(cached?.education?.length ? cached.education : defaultEducation);
  const [goals, setGoals] = useState<Goal[]>(cached?.goals?.length ? cached.goals : defaultGoals);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(cached?.socialLinks?.length ? cached.socialLinks : defaultSocialLinks);
  const [certificates, setCertificates] = useState<Certificate[]>(cached?.certificates?.length ? cached.certificates : defaultCertificates);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setters = { setProfile, setSkills, setProjects, setServices, setEducation, setGoals, setSocialLinks, setCertificates };

  const fetchData = useCallback(async (showLoading = false) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        // No Supabase — use localStorage cache (already applied on init)
        setLoading(false);
        return;
      }

      if (showLoading) setLoading(true);
      if (!supabase) { setLoading(false); return; }

      const [
        profileRes, skillsRes, projectsRes,
        servicesRes, educationRes, goalsRes, socialLinksRes, certificatesRes,
      ] = await Promise.all([
        supabase.from('profiles').select('*').limit(1).single(),
        supabase.from('skills').select('*'),
        supabase.from('projects').select('*'),
        supabase.from('services').select('*'),
        supabase.from('education').select('*'),
        supabase.from('goals').select('*'),
        supabase.from('social_links').select('*'),
        supabase.from('certificates').select('*'),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (skillsRes.data && skillsRes.data.length > 0) setSkills(skillsRes.data);
      if (projectsRes.data && projectsRes.data.length > 0) setProjects(projectsRes.data);
      if (servicesRes.data && servicesRes.data.length > 0) setServices(servicesRes.data);
      if (educationRes.data && educationRes.data.length > 0) setEducation(educationRes.data);
      if (goalsRes.data && goalsRes.data.length > 0) setGoals(goalsRes.data);
      if (socialLinksRes.data && socialLinksRes.data.length > 0) setSocialLinks(socialLinksRes.data);
      if (certificatesRes.data && certificatesRes.data.length > 0) setCertificates(certificatesRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Listen for cache updates fired by Admin panel
  useEffect(() => {
    const handler = () => {
      const fresh = loadCache();
      applyCache(fresh, setters);
    };
    window.addEventListener(CACHE_EVENT, handler);
    return () => window.removeEventListener(CACHE_EVENT, handler);
  }, []);

  useEffect(() => { fetchData(true); }, [fetchData]);

  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel('portfolio-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'skills' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'education' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'goals' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'social_links' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'certificates' }, () => fetchData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchData]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') fetchData();
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'portfolio_data_updated') fetchData();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('storage', handleStorage);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('storage', handleStorage);
    };
  }, [fetchData]);

  return { profile, skills, projects, services, education, goals, socialLinks, certificates, loading, error, refetch: fetchData };
}
