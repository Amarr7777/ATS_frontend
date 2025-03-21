import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Button,
  Icon,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FiArrowLeft, FiCheckCircle, FiUpload } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import FadeInSection from '../components/FadeInSection';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const analysisData = state?.analysisData || {};
  const hasData = Object.keys(analysisData).length > 0; // Check if analysisData is not empty
  const {
    ats_score = 0,
    keyword_match_rate = 0,
    format_score = 0,
    content_quality = 0,
    education_metrics = 0,
    qualification_score = 0,
    career_progress = 0,
    analysis = 'No analysis available.',
    suggestions = [],
  } = analysisData;

  const handleBack = () => {
    navigate('/upload');
  };

  const barData = {
    labels: [
      'ATS Score',
      'Keyword Match',
      'Format',
      'Content Quality',
      'Education',
      'Qualifications',
      'Career Progress',
    ],
    datasets: [
      {
        label: 'Score (%)',
        data: [
          ats_score,
          keyword_match_rate,
          format_score,
          content_quality,
          education_metrics,
          qualification_score,
          career_progress,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#A0AEC0' } },
      title: { display: true, text: 'Resume Metrics Overview', color: '#A0AEC0' },
    },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { color: '#A0AEC0' }, grid: { color: '#4A5568' } },
      x: { ticks: { color: '#A0AEC0' }, grid: { display: false } },
    },
  };

  const radarData = {
    labels: ['Keyword Match', 'Format', 'Content Quality', 'Education', 'Qualifications', 'Career Progress'],
    datasets: [
      {
        label: 'Resume Performance',
        data: [keyword_match_rate, format_score, content_quality, education_metrics, qualification_score, career_progress],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#A0AEC0' } },
      title: { display: true, text: 'Detailed Performance Breakdown', color: '#A0AEC0' },
    },
    scales: {
      r: {
        angleLines: { color: '#4A5568' },
        grid: { color: '#4A5568' },
        pointLabels: { color: '#A0AEC0' },
        ticks: { backdropColor: 'transparent', color: '#A0AEC0' },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  if (!hasData) {
    return (
      <Container maxW="container.md" py={10}>
        <VStack spacing={6} bg="gray.900" p={8} borderRadius="xl" borderWidth="1px" borderColor="gray.600">
          <Heading size="lg" color="blue.400">
            No Resume Analysis Available
          </Heading>
          <Alert status="warning" bg="gray.800" borderColor="yellow.400" color="yellow.300">
            <AlertIcon />
            <Text>No resume data found. Please upload a resume to see your analysis.</Text>
          </Alert>
          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={handleBack}
            leftIcon={<Icon as={FiUpload} />}
          >
            Upload Resume
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} bg="gray.900" p={8} borderRadius="xl" borderWidth="1px" borderColor="gray.600">
        <Heading size="lg" color="blue.400">
          Resume Analysis Results
        </Heading>
        <Text color="gray.400" textAlign="center">
          Here’s how your resume matches the job description, with suggestions to improve it.
        </Text>

        {/* Charts Section */}
        <FadeInSection delay={0.2}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
            <Box bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700" h="300px">
              <Bar data={barData} options={barOptions} />
            </Box>
            <Box bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700" h="300px">
              <Radar data={radarData} options={radarOptions} />
            </Box>
          </SimpleGrid>
        </FadeInSection>

        {/* Stats Section */}
        <FadeInSection delay={0.4}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
            <Stat bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700">
              <StatLabel color="gray.400">Overall ATS Score</StatLabel>
              <StatNumber color="blue.400">{ats_score}%</StatNumber>
              <StatHelpText color="gray.500">Weighted average</StatHelpText>
            </Stat>
            <Stat bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700">
              <StatLabel color="gray.400">Keyword Match Rate</StatLabel>
              <StatNumber color="blue.400">{keyword_match_rate}%</StatNumber>
              <StatHelpText color="gray.500">Job relevance</StatHelpText>
            </Stat>
            <Stat bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700">
              <StatLabel color="gray.400">Format Score</StatLabel>
              <StatNumber color="blue.400">{format_score}%</StatNumber>
              <StatHelpText color="gray.500">Structure</StatHelpText>
            </Stat>
            <Stat bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700">
              <StatLabel color="gray.400">Content Quality</StatLabel>
              <StatNumber color="blue.400">{content_quality}%</StatNumber>
              <StatHelpText color="gray.500">Clarity</StatHelpText>
            </Stat>
            <Stat bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700">
              <StatLabel color="gray.400">Education Metrics</StatLabel>
              <StatNumber color="blue.400">{education_metrics}%</StatNumber>
              <StatHelpText color="gray.500">Education</StatHelpText>
            </Stat>
            <Stat bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700">
              <StatLabel color="gray.400">Qualification Score</StatLabel>
              <StatNumber color="blue.400">{qualification_score}%</StatNumber>
              <StatHelpText color="gray.500">Skills</StatHelpText>
            </Stat>
            <Stat bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700">
              <StatLabel color="gray.400">Career Progress</StatLabel>
              <StatNumber color="blue.400">{career_progress}%</StatNumber>
              <StatHelpText color="gray.500">Experience</StatHelpText>
            </Stat>
          </SimpleGrid>
        </FadeInSection>

        {/* Suggestions Section */}
        <FadeInSection delay={0.6}>
          <Box w="full" bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700">
            <Text fontWeight="bold" color="blue.400" mb={2}>
              Improvement Suggestions
            </Text>
            <List spacing={3}>
              {suggestions.length > 0 ? (
                suggestions.map((suggestion:any, index:any) => (
                  <ListItem key={index} color="gray.300">
                    <ListIcon as={FiCheckCircle} color="blue.400" />
                    {suggestion}
                  </ListItem>
                ))
              ) : (
                <Text color="gray.500">No specific suggestions available.</Text>
              )}
            </List>
          </Box>
        </FadeInSection>

        {/* Detailed Analysis */}
        <FadeInSection delay={0.8}>
          <Box w="full" bg="gray.800" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.700">
            <Text fontWeight="bold" color="blue.400" mb={2}>
              Detailed Analysis
            </Text>
            <Text color="gray.300" whiteSpace="pre-wrap">
              {analysis}
            </Text>
          </Box>
        </FadeInSection>

        <Divider borderColor="gray.600" />

        {/* Back Button */}
        <FadeInSection delay={1.0}>
          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={handleBack}
            leftIcon={<Icon as={FiArrowLeft} />}
          >
            Back to Upload
          </Button>
        </FadeInSection>
      </VStack>
    </Container>
  );
}