import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Profile, Skill, Project, Service, Education, Goal, SocialLink } from '@/lib/types';
import {
  defaultProfile,
  defaultSkills,
  defaultProjects,
  defaultServices,
  defaultEducation,
  defaultGoals,
  defaultSocialLinks,
} from '@/lib/defaultData';

export function usePortfolioData() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (showLoading = false) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        setLoading(false);
        return;
      }

      if (showLoading) setLoading(true);

      if (!supabase) {
        setLoading(false);
        return;
      }

      const [
        profileRes,
        skillsRes,
        projectsRes,
        servicesRes,
        educationRes,
        goalsRes,
        socialLinksRes,
      ] = await Promise.all([
        supabase.from('profiles').select('*').limit(1).single(),
        supabase.from('skills').select('*'),
        supabase.from('projects').select('*'),
        supabase.from('services').select('*'),
        supabase.from('education').select('*'),
        supabase.from('goals').select('*'),
        supabase.from('social_links').select('*'),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (skillsRes.data && skillsRes.data.length > 0) setSkills(skillsRes.data);
      if (projectsRes.data && projectsRes.data.length > 0) setProjects(projectsRes.data);
      if (servicesRes.data && servicesRes.data.length > 0) setServices(servicesRes.data);
      if (educationRes.data && educationRes.data.length > 0) setEducation(educationRes.data);
      if (goalsRes.data && goalsRes.data.length > 0) setGoals(goalsRes.data);
      if (socialLinksRes.data && socialLinksRes.data.length > 0) setSocialLinks(socialLinksRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

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
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchData();
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'portfolio_data_updated') {
        fetchData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchData]);

  return { profile, skills, projects, services, education, goals, socialLinks, loading, error, refetch: fetchData };
}
