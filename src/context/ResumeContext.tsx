import React, { createContext, useContext, useState } from 'react';

interface AnalysisData {
    text?: string;
    success?: boolean;
    local_analysis?: {
        ats_score: number;
        keyword_match_rate: number;
        format_score: number;
        content_quality: number;
        strengths: string[];
        improvement_areas: string[];
        suggestions: string[];
        education: {
            degree: string;
            field: string;
            score: number;
        }[];
        skills: {
            name: string;
            relevance: number;
        }[];
        field: string;
    };
    combined_score?: number;
}

interface ResumeContextType {
    analysisData: AnalysisData | null;
    setAnalysisData: (data: AnalysisData | null) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

    return (
        <ResumeContext.Provider value={{ analysisData, setAnalysisData }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumeContext = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResumeContext must be used within a ResumeProvider');
    }
    return context;
}; 