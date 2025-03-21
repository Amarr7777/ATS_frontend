import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  useToast,
  Box,
} from '@chakra-ui/react';
import AIInterview from '../components/AIInterview';

export default function InterviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [resumeText, setResumeText] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      // Try to get resume text from location state
      const stateResumeText = location.state?.resumeText;
      
      if (stateResumeText) {
        setResumeText(stateResumeText);
        // Store in localStorage for persistence
        localStorage.setItem('resumeText', stateResumeText);
      } else {
        // If not in state, try localStorage
        const storedResumeText = localStorage.getItem('resumeText');
        
        if (storedResumeText) {
          setResumeText(storedResumeText);
        } else {
          setError('No resume found. Please upload your resume first.');
          toast({
            title: 'No Resume Found',
            description: 'Please upload your resume first',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    } catch (err) {
      console.error('Error loading resume:', err);
      setError('Error loading resume data');
    }
  }, [location.state, toast]);

  if (error || !resumeText) {
    return (
      <Container maxW="container.md" py={10}>
        <VStack spacing={8}>
          <Heading size="lg" color="brand.500">No Resume Found</Heading>
          <Text color="gray.400">{error || 'Please upload your resume first'}</Text>
          <Button 
            colorScheme="brand"
            size="lg"
            onClick={() => navigate('/upload')}
          >
            Upload Resume
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg="dark.400" minH="100vh" py={8}>
      <Container maxW="container.lg">
        <AIInterview resumeText={resumeText} />
      </Container>
    </Box>
  );
} 