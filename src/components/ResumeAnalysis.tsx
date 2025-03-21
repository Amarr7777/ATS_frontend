import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  VStack,
  CircularProgress,
  CircularProgressLabel,
  Tag,
  Wrap,
  WrapItem,
  Button,
} from '@chakra-ui/react';

interface ResumeAnalysisProps {
  atsScore: number;
  keywords: string[];
  suggestions?: string[];
  resumeText: string;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({
  atsScore,
  keywords,
  suggestions = [],
  resumeText,
}: ResumeAnalysisProps) => {
  const navigate = useNavigate();

  const handleStartInterview = () => {
    navigate('/interview', { 
      state: { resumeText }
    });
  };

  return (
    <Box p={6} borderWidth={1} borderRadius="lg" width="100%" bg="dark.300">
      <VStack spacing={4} align="stretch">
        <Box textAlign="center">
          <CircularProgress
            value={atsScore}
            color={atsScore >= 70 ? "green.400" : "orange.400"}
            size="120px"
          >
            <CircularProgressLabel>{atsScore}%</CircularProgressLabel>
          </CircularProgress>
          <Text mt={2} fontWeight="bold">
            ATS Compatibility Score
          </Text>
        </Box>

        <Box>
          <Text fontWeight="bold" mb={2}>
            Keywords Found
          </Text>
          <Wrap>
            {keywords.map((keyword, index) => (
              <WrapItem key={index}>
                <Tag colorScheme="blue" size="md">
                  {keyword}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        {suggestions.length > 0 && (
          <Box>
            <Text fontWeight="bold" mb={2}>
              Suggestions
            </Text>
            <VStack align="stretch" spacing={2}>
              {suggestions.map((suggestion, index) => (
                <Text key={index}>• {suggestion}</Text>
              ))}
            </VStack>
          </Box>
        )}

        <Button
          colorScheme="brand"
          size="lg"
          onClick={handleStartInterview}
          mt={4}
        >
          Start AI Interview
        </Button>
      </VStack>
    </Box>
  );
};

export default ResumeAnalysis; 