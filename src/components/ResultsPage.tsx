import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from '../styles/Results.module.css';
import AnalyticsCharts from './AnalyticsCharts';

interface Education {
  degree: string;
  field: string;
  score: number;
  level: number;
  qualifications: string[];
  year?: number;
}

interface AnalysisData {
  success: boolean;
  local_analysis: {
    ats_score: number;
    keyword_match_rate: number;
    format_score: number;
    content_quality: number;
    strengths: string[];
    improvement_areas: string[];
    suggestions: string[];
    education: Education[];
    skills: Array<{
      name: string;
      relevance: number;
    }>;
    field: string;
    education_metrics: {
      [key: string]: number;
    };
    qualification_score: {
      [key: string]: number;
    };
    career_progress: {
      [key: string]: number;
    };
  };
  combined_score: number;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Location state:', location.state);
    if (!location.state || !location.state.analysisData) {
      setError('No analysis data found. Please upload a resume first.');
      setLoading(false);
      return;
    }

    try {
      const data = location.state.analysisData as AnalysisData;
      console.log('Analysis data:', data);
      setAnalysisData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error processing analysis data:', err);
      setError('Error processing analysis data');
      setLoading(false);
    }
  }, [location.state]);

  if (loading) {
    return <div className={styles.loading}>Loading analysis results...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!analysisData) {
    return <div className={styles.error}>No analysis data available</div>;
  }

  const { local_analysis, combined_score } = analysisData;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FFA726';
    return '#F44336';
  };

  const EducationSection: React.FC<{ education: Education[] }> = ({ education }) => {
    if (!education || education.length === 0) {
      return (
        <div className={styles.educationSection}>
          <h3>Education & Qualifications</h3>
          <div className={styles.noData}>No education information found</div>
        </div>
      );
    }

    return (
      <div className={styles.educationSection}>
        <h3>Education & Qualifications</h3>
        <div className={styles.educationGrid}>
          {education.map((edu, index) => (
            <div key={index} className={styles.educationCard}>
              <div className={styles.scoreCircle}>
                <CircularProgressbar
                  value={edu.score || 0}
                  text={`${edu.score || 0}%`}
                  styles={buildStyles({
                    pathColor: getScoreColor(edu.score || 0),
                    textColor: '#333',
                    trailColor: '#d6d6d6',
                    strokeLinecap: 'round',
                    pathTransitionDuration: 0.5,
                  })}
                />
              </div>
              <div className={styles.educationDetails}>
                <h4>{edu.degree || 'Degree Not Specified'}</h4>
                <p className={styles.field}>{edu.field || 'Field Not Specified'}</p>
                {edu.year && <p className={styles.year}>Year: {edu.year}</p>}
                {edu.qualifications && edu.qualifications.length > 0 && (
                  <div className={styles.qualifications}>
                    <p>Achievements:</p>
                    <ul>
                      {edu.qualifications.map((qual, idx) => (
                        <li key={idx}>{qual}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAnalyticsCharts = () => {
    if (!analysisData?.local_analysis) return null;

    return (
      <div className={styles.analyticsSection}>
        <h2>Detailed Analytics</h2>
        <AnalyticsCharts
          atsScore={analysisData.local_analysis.ats_score}
          educationMetrics={analysisData.local_analysis.education_metrics || {}}
          qualificationScore={analysisData.local_analysis.qualification_score || {}}
          careerProgress={analysisData.local_analysis.career_progress || {}}
        />
      </div>
    );
  };

  return (
    <div className={styles.resultsContainer}>
      <h1>Resume Analysis Results</h1>
      
      <div className={styles.scoreSection}>
        <div className={styles.scoreCard}>
          <h2>Overall Score</h2>
          <div style={{ width: 200, height: 200, margin: '0 auto' }}>
            <CircularProgressbar
              value={combined_score}
              text={`${combined_score}%`}
              styles={buildStyles({
                pathColor: getScoreColor(combined_score),
                textColor: getScoreColor(combined_score),
              })}
            />
          </div>
        </div>

        <div className={styles.scoreDetails}>
          <h3>Score Breakdown</h3>
          <div className={styles.scoreGrid}>
            <div className={styles.scoreItem}>
              <h4>ATS Score</h4>
              <CircularProgressbar
                value={local_analysis.ats_score}
                text={`${local_analysis.ats_score}%`}
                styles={buildStyles({
                  pathColor: getScoreColor(local_analysis.ats_score),
                })}
              />
            </div>
            <div className={styles.scoreItem}>
              <h4>Keyword Match</h4>
              <CircularProgressbar
                value={local_analysis.keyword_match_rate}
                text={`${local_analysis.keyword_match_rate}%`}
                styles={buildStyles({
                  pathColor: getScoreColor(local_analysis.keyword_match_rate),
                })}
              />
            </div>
            <div className={styles.scoreItem}>
              <h4>Format Score</h4>
              <CircularProgressbar
                value={local_analysis.format_score}
                text={`${local_analysis.format_score}%`}
                styles={buildStyles({
                  pathColor: getScoreColor(local_analysis.format_score),
                })}
              />
            </div>
            <div className={styles.scoreItem}>
              <h4>Content Quality</h4>
              <CircularProgressbar
                value={local_analysis.content_quality}
                text={`${local_analysis.content_quality}%`}
                styles={buildStyles({
                  pathColor: getScoreColor(local_analysis.content_quality),
                })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.skillsSection}>
        <h2>Skills Analysis</h2>
        <div className={styles.skillsGrid}>
          {local_analysis.skills.map((skill, index) => (
            <div key={index} className={styles.skillItem}>
              <h4>{skill.name}</h4>
              <CircularProgressbar
                value={skill.relevance}
                text={`${skill.relevance}%`}
                styles={buildStyles({
                  pathColor: getScoreColor(skill.relevance),
                })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      {analysisData?.local_analysis?.education && (
        <EducationSection education={analysisData.local_analysis.education} />
      )}

      {/* Add Analytics Charts */}
      {renderAnalyticsCharts()}

      <div className={styles.analysisSection}>
        <div className={styles.strengthsSection}>
          <h2>Strengths</h2>
          <ul>
            {local_analysis.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>

        <div className={styles.improvementSection}>
          <h2>Areas for Improvement</h2>
          <ul>
            {local_analysis.improvement_areas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>

        <div className={styles.suggestionsSection}>
          <h2>Detailed Suggestions</h2>
          <ul>
            {local_analysis.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button
          className={styles.startInterviewButton}
          onClick={() => navigate('/interview', {
            state: {
              resumeText: location.state?.resumeText,
              analysisData: analysisData
            }
          })}
        >
          Start Interview Practice
        </button>
      </div>
    </div>
  );
};

export default ResultsPage; 