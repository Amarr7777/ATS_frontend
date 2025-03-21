import { createContext, useContext, useState, ReactNode } from 'react';

interface SectionsAnalysis {
  summary: number;
  experience: number;
  education: number;
  skills: number;
  projects: number;
}

interface Analysis {
  ats_score: number;
  format_score: number;
  content_score: number;
  keyword_score: number;
  impact_score: number;
  detected_skills: string[];
  missing_keywords: string[];
  format_issues: string[];
  content_issues: string[];
  sections_analysis: SectionsAnalysis;
  interview_id: string;
  resume_text: string;
}

interface ResumeContextType {
  resumeData: Analysis | null;
  setResumeData: (data: Analysis | null) => void;
  clearResumeData: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<Analysis | null>(null);

  const clearResumeData = () => {
    setResumeData(null);
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, clearResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
} 