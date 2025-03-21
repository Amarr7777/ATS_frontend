import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Icon,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FiUpload, FiFile } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import FadeInSection from '../components/FadeInSection';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile);
  };

  const handleFileSelection = (selectedFile: File | null) => {
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
        setError('Please upload a PDF file');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileSelection(selectedFile);
  };

  const handleJobDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDesc(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      if (!file) throw new Error('Please select a PDF file');
      if (!jobDesc.trim()) throw new Error('Job description is required');
  
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('job_description', jobDesc);
  
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("response: ",response.data)
      navigate('/results', {
        state: {
          analysisData: response.data,
          resumeText: response.data?.resumeText || ''
        }
      });
    } catch (err: any) {
      // If `detail` is an array of objects, format it
      let errorMessage = 'Failed to analyze resume';
      const detail = err.response?.data?.detail;
  
      if (Array.isArray(detail)) {
        errorMessage = detail.map((d: any) => `${d.msg} (${d.loc.join(' → ')})`).join(', ');
      } else if (typeof detail === 'string') {
        errorMessage = detail;
      } else if (typeof err.message === 'string') {
        errorMessage = err.message;
      }
  
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} bg="gray.900" p={8} borderRadius="xl" borderWidth="1px" borderColor="gray.600">
        <Heading size="lg" color="blue.400">Upload Your Resume</Heading>
        <Text color="gray.400" textAlign="center">
          Upload your resume and enter the job description to get detailed analysis and interview preparation.
        </Text>

        {/* File Upload Box */}
        <Box
          w="full"
          h="200px"
          borderWidth="2px"
          borderStyle="dashed"
          borderColor={isDragging ? "blue.400" : "gray.600"}
          borderRadius="xl"
          bg="gray.800"
          _hover={{
            borderColor: "blue.400",
          }}
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          cursor="pointer"
        >
          <Input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            hidden
          />
          <VStack spacing={4}>
            <Icon
              as={file ? FiFile : FiUpload}
              w={10}
              h={10}
              color={file ? "blue.400" : "gray.400"}
              animation={file ? `${pulse} 2s infinite` : undefined}
            />
            <Text color="gray.400" textAlign="center">
              {isDragging
                ? "Drop the PDF here"
                : "Drag & drop a PDF file here, or click to select"}
            </Text>
            {file && (
              <Text color="blue.300" fontWeight="medium">
                Selected: {file.name}
              </Text>
            )}
          </VStack>
        </Box>

        {/* Job Description Input */}
        <Textarea
          placeholder="Enter the job description here..."
          value={jobDesc}
          onChange={handleJobDescChange}
          size="md"
          resize="vertical"
          bg="gray.800"
          color="white"
          borderColor="gray.600"
          _focus={{
            borderColor: 'blue.400',
            boxShadow: '0 0 0 1px blue.400',
          }}
        />

        {/* Error Message */}
        {error && (
          <Alert status="error" bg="gray.800" borderColor="red.400" color="red.300">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Submit Button */}
        <FadeInSection delay={0.4}>
          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Analyzing..."
            leftIcon={<FiUpload />}
            isDisabled={!file || !jobDesc.trim()}
          >
            Analyze Resume
          </Button>
        </FadeInSection>

        {loading && <LoadingSpinner text="Analyzing your resume..." />}
      </VStack>
    </Container>
  );
}