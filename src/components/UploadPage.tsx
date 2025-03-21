import React, { useState } from 'react';
import { Box, Button, Container, Text, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ResumeAnalysis from './ResumeAnalysis';
import LoadingSpinner from './LoadingSpinner';
import { uploadResume } from '../services/api';
import AIInterview from './AIInterview';

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<{
    ats_score: number;
    keywords: string[];
    suggestions: string[];
    resume_text: string;
  } | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setAnalysisData(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const data = await uploadResume(file);
      setAnalysisData({
        ats_score: data.ats_score,
        suggestions: data.suggestions,
        keywords: data.keywords,
        resume_text: data.resume_text,
      });

      // Store resume text in localStorage
      localStorage.setItem('resumeText', data.resume_text);

      toast({
        title: 'Resume analyzed successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Analysis failed',
        description: 'Please try again with a valid PDF file.',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterview = () => {
    if (analysisData?.resume_text) {
      navigate('/interview', { 
        state: { resumeText: analysisData.resume_text }
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">Resume Analyzer</Text>
        <Box p={6} borderWidth={1} borderRadius="lg" width="100%" bg="dark.300">
          <VStack spacing={4}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ width: '100%' }}
            />
            <Button
              colorScheme="brand"
              onClick={handleUpload}
              isLoading={loading}
              width="100%"
            >
              Analyze Resume
            </Button>
          </VStack>
        </Box>

        {loading && <LoadingSpinner />}
        
        {analysisData && (
          <ResumeAnalysis
            atsScore={analysisData.ats_score}
            keywords={analysisData.keywords}
            suggestions={analysisData.suggestions}
            resumeText={analysisData.resume_text}
          />
        )}
      </VStack>
    </Container>
  );
};

export default UploadPage; 