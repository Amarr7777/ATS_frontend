import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, VStack, Heading, Text, Button, useToast, Box } from '@chakra-ui/react';
import AIInterview from '../components/AIInterview';

export default function InterviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [resumeText, setResumeText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stateResumeText = localStorage.getItem('resumeText');
    if (stateResumeText) {
      setResumeText(stateResumeText);
    } else {
      setError('No resume found. Please upload your resume first.');
      toast({
        title: 'No Resume Found',
        description: 'Please upload your resume first',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      // Optionally fetch /interview to check session
      fetch('http://localhost:8000/interview', {
        method: 'POST',
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            navigate('/upload');
          }
        });
    }
  }, [navigate, toast]);

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