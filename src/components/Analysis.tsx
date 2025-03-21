import React, { useEffect, useState } from 'react';
import styles from '../styles/Analysis.module.css';
import { useResumeContext } from '../context/ResumeContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface AnalysisResponse {
    success: boolean;
    local_analysis: {
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
    combined_score: number;
}

const Analysis: React.FC = () => {
    const { analysisData } = useResumeContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            // Debug log for analysisData
            console.log('Current analysisData:', analysisData);

            if (!analysisData) {
                console.log('No analysis data available');
                return;
            }

            let resumeText = '';
            if (typeof analysisData === 'string') {
                resumeText = analysisData;
            } else if (analysisData.text) {
                resumeText = analysisData.text;
            } else {
                console.error('Invalid analysis data format:', analysisData);
                setError('Invalid resume data format');
                return;
            }

            if (!resumeText.trim()) {
                console.log('No resume text available');
                return;
            }
            
            setLoading(true);
            setError(null);
            
            try {
                console.log('Sending resume text for analysis:', resumeText.substring(0, 100) + '...');
                
                // Debug log for request
                console.log('Making request to:', 'http://localhost:8000/analyze');
                
                const response = await fetch('http://localhost:8000/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        resume_text: resumeText 
                    }),
                });

                // Debug logs
                console.log('Response status:', response.status);
                console.log('Response headers:', Object.fromEntries(response.headers.entries()));

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Server error response:', errorText);
                    throw new Error(`Server error: ${response.status} - ${errorText || response.statusText}`);
                }

                const data = await response.json();
                console.log('Analysis Response:', data);

                if (!data.local_analysis) {
                    console.error('Invalid response format:', data);
                    throw new Error('Invalid response format from server');
                }

                setAnalysis(data);
            } catch (err) {
                console.error('Analysis error:', err);
                setError(err instanceof Error ? err.message : 'Failed to analyze resume');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [analysisData]);

    // Debug log for component state
    console.log('Component State:', { loading, error, analysis });

    if (loading) {
        return (
            <div className={styles.container}>
                <h2>Analyzing your resume...</h2>
                <div className={styles.loadingSpinner}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <h2>Analysis Error</h2>
                <p className={styles.error}>{error}</p>
                <p className={styles.error}>Please try uploading your resume again</p>
            </div>
        );
    }

    if (!analysis || !analysis.local_analysis) {
        return (
            <div className={styles.container}>
                <h2>Upload your resume to see the analysis</h2>
            </div>
        );
    }

    const { local_analysis, combined_score } = analysis;

    const formatScore = (score: number | undefined | null): number => {
        if (score === null || score === undefined || isNaN(Number(score))) {
            console.log('Invalid score value:', score);
            return 0;
        }
        return Math.round(Number(score));
    };

    const atsScore = formatScore(local_analysis.ats_score);
    const keywordScore = formatScore(local_analysis.keyword_match_rate);
    const formatScore_val = formatScore(local_analysis.format_score);
    const contentScore = formatScore(local_analysis.content_quality);

    // Debug log for scores
    console.log('Calculated Scores:', {
        atsScore,
        keywordScore,
        formatScore: formatScore_val,
        contentScore
    });

    const getScoreColor = (score: number): string => {
        if (score >= 80) return '#48cae4';
        if (score >= 60) return '#3498db';
        if (score >= 40) return '#f39c12';
        return '#e74c3c';
    };

    return (
        <div className={styles.container}>
            <div className={styles.scoreSection}>
                <h2>Resume Analysis Results</h2>
                <p className={styles.subtitle}>Here's how your resume performs against ATS systems</p>
                
                <div className={styles.scoreContainer}>
                    <div className={styles.scoreCircle}>
                        <CircularProgressbar
                            value={atsScore}
                            text={`${atsScore}%`}
                            styles={buildStyles({
                                pathColor: getScoreColor(atsScore),
                                textColor: getScoreColor(atsScore),
                                trailColor: '#2d3748',
                                strokeLinecap: 'round',
                                textSize: '16px',
                                pathTransitionDuration: 0.5
                            })}
                        />
                        <h3>ATS Score</h3>
                    </div>

                    <div className={styles.scoreDetails}>
                        <div className={styles.scoreItem}>
                            <h4>Keyword Match</h4>
                            <p style={{ color: getScoreColor(keywordScore) }}>{keywordScore}%</p>
                        </div>
                        <div className={styles.scoreItem}>
                            <h4>Format Score</h4>
                            <p style={{ color: getScoreColor(formatScore_val) }}>{formatScore_val}%</p>
                        </div>
                        <div className={styles.scoreItem}>
                            <h4>Content Quality</h4>
                            <p style={{ color: getScoreColor(contentScore) }}>{contentScore}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {local_analysis.skills && local_analysis.skills.length > 0 && (
                <div className={styles.skillsSection}>
                    <h3>Skills Analysis</h3>
                    <div className={styles.skillsList}>
                        {local_analysis.skills.map((skill, index) => (
                            <div key={index} className={styles.skillItem}>
                                <span className={styles.skillName}>{skill.name}</span>
                                <div className={styles.skillBar}>
                                    <div 
                                        className={styles.skillProgress}
                                        style={{ 
                                            width: `${skill.relevance}%`,
                                            backgroundColor: getScoreColor(skill.relevance)
                                        }}
                                    />
                                </div>
                                <span className={styles.skillScore}>{skill.relevance}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {local_analysis.education && local_analysis.education.length > 0 && (
                <div className={styles.educationSection}>
                    <h3>Education Analysis</h3>
                    <div className={styles.educationList}>
                        {local_analysis.education.map((edu, index) => (
                            <div key={index} className={styles.educationItem}>
                                <h4>{edu.degree} in {edu.field}</h4>
                                <div className={styles.educationScore}>
                                    <CircularProgressbar
                                        value={edu.score}
                                        text={`${edu.score}%`}
                                        styles={buildStyles({
                                            pathColor: getScoreColor(edu.score),
                                            textColor: getScoreColor(edu.score),
                                            trailColor: '#2d3748',
                                            strokeLinecap: 'round',
                                            textSize: '16px'
                                        })}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {local_analysis.strengths && local_analysis.strengths.length > 0 && (
                <div className={styles.analysisSection}>
                    <div className={styles.column}>
                        <h3>Strengths</h3>
                        <ul className={styles.list}>
                            {local_analysis.strengths.map((strength, index) => (
                                <li key={index} className={styles.strengthItem}>{strength}</li>
                            ))}
                        </ul>
                    </div>

                    {local_analysis.improvement_areas && local_analysis.improvement_areas.length > 0 && (
                        <div className={styles.column}>
                            <h3>Areas for Improvement</h3>
                            <ul className={styles.list}>
                                {local_analysis.improvement_areas.map((area, index) => (
                                    <li key={index} className={styles.improvementItem}>{area}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {local_analysis.suggestions && local_analysis.suggestions.length > 0 && (
                <div className={styles.suggestionsSection}>
                    <h3>Detailed Suggestions</h3>
                    <ul className={styles.suggestionsList}>
                        {local_analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className={styles.suggestionItem}>{suggestion}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Analysis; 