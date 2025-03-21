import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from 'chart.js';
import { Bar, Radar, Doughnut } from 'react-chartjs-2';
import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import theme from '../theme';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

interface AnalyticsChartsProps {
  atsScore: number;
  educationMetrics: {
    [metric: string]: number;
  };
  qualificationScore: {
    [metric: string]: number;
  };
  careerProgress: {
    [metric: string]: number;
  };
}

const MotionBox = motion(Box);

const defaultKeywordMatches = {
  'Technical Skills': ['python', 'javascript'],
  'Soft Skills': ['communication'],
  'Experience': ['project management']
};

const defaultContentMetrics = {
  'Clarity': 75,
  'Relevance': 80,
  'Completeness': 85,
  'Formatting': 90,
  'Keywords': 70
};

export default function AnalyticsCharts({
  atsScore,
  educationMetrics,
  qualificationScore,
  careerProgress
}: AnalyticsChartsProps) {
  const textColor = theme.colors.brand[700];

  // Check if data is empty
  const hasKeywordData = Object.values(defaultKeywordMatches).some(arr => arr.length > 0);
  const hasMetricsData = Object.values(defaultContentMetrics).some(value => value > 0);

  if (!hasKeywordData && !hasMetricsData && atsScore === 0) {
    return (
      <VStack spacing={4} p={6} textAlign="center" bg="dark.400" borderRadius="xl">
        <Heading size="md">No Analytics Data Available</Heading>
        <Text color={theme.colors.brand[500]}>Upload a resume to see detailed analytics</Text>
      </VStack>
    );
  }

  // ATS Score Doughnut Chart
  const atsScoreData = {
    labels: ['ATS Score', 'Room for Improvement'],
    datasets: [{
      data: [atsScore, 100 - atsScore],
      backgroundColor: [
        theme.colors.brand[500],
        theme.colors.dark[300],
      ],
      borderWidth: 0
    }]
  };

  // Education & Qualifications Radar Chart
  const educationData = {
    labels: Object.keys(educationMetrics),
    datasets: [{
      label: 'Education Profile',
      data: Object.values(educationMetrics),
      backgroundColor: theme.colors.accent[500] + '33',
      borderColor: theme.colors.accent[500],
      borderWidth: 2,
    }]
  };

  // Career Progress Bar Chart
  const careerData = {
    labels: Object.keys(careerProgress),
    datasets: [{
      label: 'Career Progress',
      data: Object.values(careerProgress),
      backgroundColor: theme.colors.brand[500] + '80',
      borderColor: theme.colors.brand[500],
      borderWidth: 2,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: theme.colors.dark[400],
    plugins: theme.components.chartOptions.plugins,
    scales: theme.components.chartOptions.scales,
  };

  const radarOptions = {
    ...chartOptions,
    scales: {
      r: theme.components.chartOptions.scales.r,
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme.colors.brand[700],
        },
        grid: {
          color: theme.colors.dark[300],
          borderColor: theme.colors.dark[300],
        },
      },
      x: {
        ticks: {
          color: theme.colors.brand[700],
        },
        grid: {
          color: theme.colors.dark[300],
          borderColor: theme.colors.dark[300],
        },
      },
    },
  };

  const doughnutOptions = {
    ...chartOptions,
    cutout: '70%',
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: false,
      },
    },
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
      <MotionBox
        p={6}
        bg="dark.400"
        borderRadius="xl"
        height="400px"
        borderWidth="1px"
        borderColor="dark.300"
      >
        <Heading size="md" mb={4}>ATS Compatibility Score</Heading>
        <Box height="calc(100% - 32px)" position="relative">
          <Doughnut data={atsScoreData} options={doughnutOptions} />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
          >
            <Text fontSize="3xl" fontWeight="bold" color={theme.colors.brand[700]}>
              {atsScore}%
            </Text>
            <Text fontSize="sm" color={theme.colors.brand[500]}>
              ATS Score
            </Text>
          </Box>
        </Box>
      </MotionBox>

      <MotionBox
        p={6}
        bg="dark.400"
        borderRadius="xl"
        height="400px"
        borderWidth="1px"
        borderColor="dark.300"
      >
        <Heading size="md" mb={4}>Education & Qualifications</Heading>
        <Box height="calc(100% - 32px)">
          <Radar data={educationData} options={radarOptions} />
        </Box>
      </MotionBox>

      <MotionBox
        p={6}
        bg="dark.400"
        borderRadius="xl"
        gridColumn={{ base: "1", md: "span 2" }}
        height="300px"
        borderWidth="1px"
        borderColor="dark.300"
      >
        <Heading size="md" mb={4}>Career Progress Indicators</Heading>
        <Box height="calc(100% - 32px)">
          <Bar data={careerData} options={barOptions} />
        </Box>
      </MotionBox>
    </Grid>
  );
} 