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
import { keyframes } from '@emotion/react';
import { FiArrowLeft, FiCheckCircle, FiUpload } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import FadeInSection from '../components/FadeInSection';
import { Bar, Radar, Pie } from 'react-chartjs-2';
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
  ArcElement,
  ChartOptions,
} from 'chart.js';
import TagCloud from 'react-tag-cloud';

// Define types for react-tag-cloud
interface Tag {
  text: string;
  value: number;
}

interface TagCloudStyle {
  fontFamily: string;
  fontSize: (tag: Tag) => number;
  color: () => string;
  padding: number;
  width: string;
  height: string;
}

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
  Filler,
  ArcElement
);

const bounce = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); }
`;

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const analysisData = state?.analysisData || {};
  const hasData = Object.keys(analysisData).length > 0;
  const {
    ats_score = 49.95,
    keyword_match_rate = 13.21,
    format_score = 100,
    content_quality = 25.45,
    education_metrics = 100,
    qualification_score = 30.34,
    career_progress = 10,
    action_verb_strength = 84.21,
    achievement_density = 10.28,
    section_completeness = { Experience: 0, Education: 0, Skills: 0 },
    specificity_score = 50,
    readability_complexity = 40,
    analysis = 'No analysis available.',
    suggestions = [] as string[],
    keywords = [] as string[],
  } = analysisData;

  const handleBack = () => navigate('/upload');

  const chartColors = {
    pie: ['rgba(75, 94, 170, 0.2)', 'rgba(107, 114, 128, 0.2)', 'rgba(49, 130, 206, 0.2)'],
    pieBorders: ['#647ACB', '#A0AEC0', '#63B3ED'],
    primary: 'rgba(49, 130, 206, 0.8)',
    primaryBorder: '#63B3ED',
    accent: 'rgba(49, 130, 206, 0.2)',
    accentBorder: '#3182CE',
  };

  // Bar Chart
  const barData = {
    labels: [
      'ATS Score',
      'Keyword Match',
      'Format',
      'Content Quality',
      'Education',
      'Qualifications',
      'Career Progress',
      'Action Verbs',
      'Achievement Density',
      'Specificity',
      'Readability',
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
          action_verb_strength,
          achievement_density,
          specificity_score,
          readability_complexity,
        ],
        backgroundColor: chartColors.primary,
        borderColor: chartColors.primaryBorder,
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Metrics Overview', color: '#E2E8F0', font: { size: 18, weight: 'bold' } },
      tooltip: { backgroundColor: '#1A202C', titleColor: '#E2E8F0', bodyColor: '#E2E8F0', borderColor: '#4A5568', borderWidth: 1 },
    },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(74, 85, 104, 0.3)' } },
      x: { ticks: { color: '#A0AEC0' }, grid: { display: false } },
    },
  };

  // Radar Chart
  const radarData = {
    labels: ['Keyword Match', 'Format', 'Content Quality', 'Education', 'Qualifications', 'Career Progress'],
    datasets: [
      {
        label: 'Performance',
        data: [keyword_match_rate, format_score, content_quality, education_metrics, qualification_score, career_progress],
        backgroundColor: chartColors.accent,
        borderColor: chartColors.accentBorder,
        pointBackgroundColor: chartColors.accentBorder,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: chartColors.accentBorder,
      },
    ],
  };

  const radarOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: 'easeInOutQuad' },
    plugins: {
      legend: { labels: { color: '#A0AEC0' }, position: 'top' },
      title: { display: true, text: 'Performance Breakdown', color: '#E2E8F0', font: { size: 18, weight: 'bold' } },
      tooltip: { backgroundColor: '#1A202C', titleColor: '#E2E8F0', bodyColor: '#E2E8F0', borderColor: '#4A5568', borderWidth: 1 },
    },
    scales: {
      r: {
        angleLines: { color: 'rgba(160, 174, 192, 0.2)' },
        grid: { color: 'rgba(160, 174, 192, 0.2)' },
        pointLabels: { color: '#A0AEC0', font: { size: 12 } },
        ticks: { backdropColor: 'transparent', color: '#A0AEC0', stepSize: 20 },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  // Pie Chart
  const pieData = {
    labels: Object.keys(section_completeness),
    datasets: [
      {
        label: 'Section Completeness',
        data: Object.values(section_completeness),
        backgroundColor: chartColors.pie,
        borderColor: chartColors.pieBorders,
        borderWidth: 2,
      },
    ],
  };

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1500,
      easing: 'easeOutBounce',
    },
    plugins: {
      legend: { position: 'right', labels: { color: '#A0AEC0', font: { size: 12 } } },
      title: { display: true, text: 'Section Completeness', color: '#E2E8F0', font: { size: 18, weight: 'bold' } },
      tooltip: { backgroundColor: '#1A202C', titleColor: '#E2E8F0', bodyColor: '#E2E8F0', borderColor: '#4A5568', borderWidth: 1 },
    },
  };

  // Tag Cloud for Keywords
  const tagCloudData: Tag[] = keywords.map((keyword: string) => ({
    text: keyword,
    value: 30, // Static value for size; adjust if frequency data available
  }));

  if (!hasData) {
    return (
      <Container maxW="container.md" py={12}>
        <VStack spacing={8} bg="black" p={10} borderRadius="2xl" borderWidth="1px" borderColor="gray.800" shadow="2xl">
          <Heading size="lg" color="blue.400">
            No Resume Analysis Available
          </Heading>
          <Alert status="warning" bg="black" borderRadius="lg" color="yellow.300" borderWidth="1px" borderColor="yellow.600">
            <AlertIcon />
            <Text>No resume data found. Upload a resume to get started.</Text>
          </Alert>
          <Button
            colorScheme="blue"
            size="lg"
            w="full"
            onClick={handleBack}
            leftIcon={<Icon as={FiUpload} />}
            _hover={{ bg: 'blue.500', transform: 'scale(1.05)' }}
            transition="all 0.3s"
          >
            Upload Resume
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={12} bg="black" p={10} borderRadius="3xl" borderWidth="1px" borderColor="gray.800" shadow="2xl">
        <FadeInSection delay={0.1}>
          <Heading size="xl" color="blue.400" textAlign="center" textShadow="0 2px 4px rgba(0, 0, 0, 0.3)">
            Resume Analysis Dashboard
          </Heading>
          <Text color="gray.300" fontSize="lg" textAlign="center" maxW="900px" mt={2}>
            Explore your resume’s strengths and opportunities with advanced metrics and actionable insights.
          </Text>
        </FadeInSection>

        {/* Charts Section */}
        <FadeInSection delay={0.3}>
          <Box w="1080px">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Box
                bg="black"
                p={6}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.700"
                h="450px"
                w="520px"
                shadow="lg"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
              >
                <Bar data={barData} options={barOptions} />
              </Box>
              <Box
                bg="black"
                p={6}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.700"
                h="450px"
                w="520px"
                shadow="lg"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
              >
                <Radar data={radarData} options={radarOptions} />
              </Box>
            </SimpleGrid>
          </Box>
        </FadeInSection>

        {/* Pie Chart */}
        <FadeInSection delay={0.5}>
          <Box
            bg="black"
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.700"
            h="450px"
            w="520px"
            mx="auto"
            shadow="lg"
            animation={`${bounce} 1.5s ease-out`}
            transition="all 0.3s"
            _hover={{ 
              shadow: 'xl', 
              transform: 'scale(1.02) translateY(-4px)', 
              borderColor: 'blue.400', 
              borderWidth: '1px' 
            }}
          >
            <Pie data={pieData} options={pieOptions} />
          </Box>
        </FadeInSection>

        {/* Stats Section */}
        <FadeInSection delay={0.7}>
          <Box w="1080px">
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Overall ATS Score</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">49.95%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Weighted average</StatHelpText>
              </Stat>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Keyword Match Rate</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">13.21%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Job relevance</StatHelpText>
              </Stat>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Format Score</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">100%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Structure</StatHelpText>
              </Stat>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Content Quality</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">25.45%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Clarity</StatHelpText>
              </Stat>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Education Metrics</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">100%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Education</StatHelpText>
              </Stat>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Qualification Score</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">30.34%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Skills</StatHelpText>
              </Stat>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Career Progress</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">10%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Experience</StatHelpText>
              </Stat>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Action Verb Strength</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">84.21%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Verb Impact</StatHelpText>
              </Stat>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Achievement Density</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">10.28%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Results Focus</StatHelpText>
              </Stat>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Specificity Score</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">50%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Job Tailoring</StatHelpText>
              </Stat>
              <Stat
                bg="black"
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                shadow="md"
                transition="all 0.3s"
                _hover={{ shadow: 'xl', transform: 'scale(1.03)', bg: 'gray.900' }}
              >
                <StatLabel color="gray.300" fontWeight="medium" fontSize="md">Readability Complexity</StatLabel>
                <StatNumber color="blue.400" fontSize="3xl" fontWeight="bold">40%</StatNumber>
                <StatHelpText color="gray.400" fontSize="sm">Text Balance</StatHelpText>
              </Stat>
            </SimpleGrid>
          </Box>
        </FadeInSection>

        {/* Suggestions Section */}
        <FadeInSection delay={0.9}>
          <Box w="1080px" bg="black" p={6} borderRadius="xl" borderWidth="1px" borderColor="gray.700" shadow="md" transition="all 0.3s" _hover={{ shadow: 'xl', bg: 'gray.900' }}>
            <Text fontWeight="bold" color="blue.400" mb={4} fontSize="xl">
              Improvement Suggestions
            </Text>
            <List spacing={4}>
              {suggestions.length > 0 ? (
                suggestions.map((suggestion: string, index: number) => (
                  <ListItem key={index} color="gray.200" fontSize="sm">
                    <ListIcon as={FiCheckCircle} color="blue.400" />
                    {suggestion}
                  </ListItem>
                ))
              ) : (
                <Text color="gray.400" fontSize="sm">Your resume is optimized—great work!</Text>
              )}
            </List>
          </Box>
        </FadeInSection>

        {/* Keyword Density Analysis Section (Tag Cloud) */}
        <FadeInSection delay={1.1}>
          <Box
            w="1080px"
            bg="black"
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.700"
            shadow="md"
            transition="all 0.3s"
            _hover={{ shadow: 'xl', bg: 'gray.900' }}
          >
            <Text fontWeight="bold" color="blue.400" mb={4} fontSize="xl">
              Detected Keywords
            </Text>
            {keywords.length > 0 ? (
              <Box h="450px" w="full">
                <TagCloud
                  style={{
                    fontFamily: 'Arial',
                    fontSize: (tag: Tag) => tag.value, // Explicitly typed
                    color: () => chartColors.pie[Math.floor(Math.random() * chartColors.pie.length)], // Random blue shade
                    padding: 2,
                    width: '100%',
                    height: '100%',
                  } as TagCloudStyle}
                >
                  {tagCloudData.map((tag: Tag, index: number) => (
                    <div key={index}>{tag.text}</div>
                  ))}
                </TagCloud>
              </Box>
            ) : (
              <Text color="gray.200" fontSize="sm" fontStyle="italic">
                No keywords detected.
              </Text>
            )}
          </Box>
        </FadeInSection>

        {/* Detailed Analysis
        <FadeInSection delay={1.2}>
          <Box w="full" bg="black" p={6} borderRadius="xl" borderWidth="1px" borderColor="gray.700" shadow="md" transition="all 0.3s" _hover={{ shadow: 'xl', bg: 'gray.900' }}>
            <Text fontWeight="bold" color="blue.400" mb={4} fontSize="xl">
              Detailed Analysis
            </Text>
            <Text color="gray.200" fontSize="sm" whiteSpace="pre-wrap">
              {analysis}
            </Text>
          </Box>
        </FadeInSection>

        <Divider borderColor="gray.700" my={8} /> */}

        {/* Back Button */}
        <FadeInSection delay={1.4}>
          <Button
            colorScheme="blue"
            size="lg"
            w={{ base: 'full', md: 'auto' }}
            px={10}
            py={6}
            onClick={handleBack}
            leftIcon={<Icon as={FiArrowLeft} />}
            _hover={{ bg: 'blue.500', transform: 'scale(1.05)', shadow: 'lg' }}
            transition="all 0.3s"
            borderRadius="full"
          >
            Back to Upload
          </Button>
        </FadeInSection>
      </VStack>
    </Container>
  );
}