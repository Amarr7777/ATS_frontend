import { useState, useCallback } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import styles from '../styles/Upload.module.css';

const Upload = () => {
  const { setAnalysisData } = useResumeContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = useCallback(async (file: File) => {
    try {
      setLoading(true);
      setError('');
      setShowAnalysis(false);
      setUploadProgress(0);

      if (!file) {
        throw new Error('Please select a file');
      }

      if (file.type !== 'application/pdf') {
        throw new Error('Please upload a PDF file');
      }

      // First, extract text from PDF
      const formData = new FormData();
      formData.append('resume', file);
      
      console.log('Starting upload for:', file.name);
      setUploadProgress(25);

      // Get text from PDF
      const textResponse = await fetch('http://localhost:8000/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (!textResponse.ok) {
        throw new Error('Failed to extract text from PDF');
      }

      const { text: resumeText } = await textResponse.json();
      setUploadProgress(50);

      // Send for analysis
      console.log('Sending for analysis...');
      const analysisResponse = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resume_text: resumeText }),
      });

      if (!analysisResponse.ok) {
        throw new Error('Failed to analyze resume');
      }

      const analysisData = await analysisResponse.json();
      setUploadProgress(100);

      console.log('Analysis complete:', analysisData);
      setAnalysisData({
        ...analysisData,
        text: resumeText
      });
      setShowAnalysis(true);
    } catch (error: unknown) {
      console.error('Upload Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setShowAnalysis(false);
    } finally {
      setLoading(false);
    }
  }, [setAnalysisData]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }, [handleUpload]);

  return (
    <div className={styles.uploadContainer}>
      <h1>Resume Analysis</h1>
      
      <div className={styles.uploadSection}>
        <label className={styles.uploadLabel}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className={styles.fileInput}
            disabled={loading}
          />
          <span className={styles.uploadButton}>
            {loading ? 'Analyzing...' : 'Choose PDF Resume'}
          </span>
        </label>

        {loading && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className={styles.loading}>
              {uploadProgress < 50 ? 'Extracting text...' :
               uploadProgress < 75 ? 'Analyzing resume...' :
               uploadProgress < 100 ? 'Generating insights...' :
               'Analysis complete!'}
            </div>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>Error: {error}</p>
            <button 
              onClick={() => setError('')}
              className={styles.dismissError}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {showAnalysis && <div className={styles.analysisSection}>Analysis complete!</div>}
    </div>
  );
};

export default Upload; 