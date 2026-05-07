import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ResumeData, Template, templatesList, defaultResumeData, demoResumeData } from '../types/resume';

const templates: Template[] = templatesList;

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  previewData: ResumeData;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  templates: Template[];
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Merge user data with demo data for preview (show demo where user hasn't filled)
function mergeWithDemo(userData: ResumeData): ResumeData {
  const hasPersonal = userData.personalInfo.fullName.trim() !== '';
  return {
    personalInfo: hasPersonal ? userData.personalInfo : demoResumeData.personalInfo,
    experiences: userData.experiences.length > 0 ? userData.experiences : demoResumeData.experiences,
    education: userData.education.length > 0 ? userData.education : demoResumeData.education,
    skills: userData.skills.length > 0 ? userData.skills : demoResumeData.skills,
    projects: userData.projects.length > 0 ? userData.projects : demoResumeData.projects,
    certifications: userData.certifications.length > 0 ? userData.certifications : demoResumeData.certifications,
  };
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const previewData = useMemo(() => mergeWithDemo(resumeData), [resumeData]);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, previewData, selectedTemplate, setSelectedTemplate, templates }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
}
