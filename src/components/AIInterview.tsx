import React, { useState, useEffect } from 'react';
import {
  VStack,
  Heading,
  Text,
  Button,
  Input,
  Box,
  useToast,
  Spinner,
  Badge,
  Flex,
} from '@chakra-ui/react';

// Define types for the question, result, and props
interface Question {
  question: string;
  difficulty: string; // e.g., "Moderate", "Hard"
  category?: string;  // e.g., "Technical", "Project-based" (optional as it might be 'type' in some cases)
  type?: string;      // Alternative to category (from Flask-style questions)
  expected_answer: string;
}

interface Result {
  question: string;
  answer: string;
  score: number;
  feedback: string;
}

interface InterviewResults {
  scores: Result[];
  total_score: number;
}

interface AIInterviewProps {
  resumeText: string;
}

const AIInterview: React.FC<AIInterviewProps> = ({ resumeText }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [results, setResults] = useState<InterviewResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/interview', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      console.log("data in interview: ",data)
      if (data.error) {
        toast({
          title: 'Error',
          description: data.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else if (data.completed) {
        fetchResults();
      } else {
        setQuestions(data.questions); // Now an array of objects
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch questions',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide an answer',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/submit_answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ answer }),
      });
      const data = await response.json();
      console.log("response in submit_anwer: ",data)
      if (data.success) {
        if (data.message === 'Interview completed') {
          fetchResults();
        } else {
          setCurrentQuestion(currentQuestion + 1);
          setAnswer('');
        }
      } else {
        toast({
          title: 'Submission Failed',
          description: 'Something went wrong while submitting your answer',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit answer',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch('http://localhost:8000/results', {
        credentials: 'include',
      });
      const data = await response.json();
      console.log("results: ",data)
      setResults(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch results',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" color="brand.500" thickness="4px" speed="0.65s" />
      </Flex>
    );
  }

  if (results) {
    return (
      <VStack spacing={6} color="white" p={4}>
        <Heading size="lg" color="brand.500">Interview Results</Heading>
        {results.scores.map((result: Result, index: number) => (
          <Box
            key={index}
            p={4}
            bg="dark.300"
            borderRadius="md"
            w="full"
            borderWidth="1px"
            borderColor="gray.600"
            _hover={{ borderColor: 'brand.500' }}
          >
            <Text fontSize="md" fontWeight="bold" color="gray.200">
              Question: {result.question}
            </Text>
            <Text mt={2} color="gray.300">
              <strong>Answer:</strong> {result.answer}
            </Text>
            <Text mt={2} color="gray.300">
              <strong>Score:</strong>{' '}
              <Badge colorScheme={result.score >= 70 ? 'green' : result.score >= 50 ? 'yellow' : 'red'}>
                {result.score}
              </Badge>
            </Text>
            <Text mt={2} color="gray.300">
              <strong>Feedback:</strong> {result.feedback}
            </Text>
          </Box>
        ))}
        <Text fontSize="xl" fontWeight="bold" color="gray.100">
          <strong>Total Score:</strong>{' '}
          <Badge colorScheme={results.total_score >= 70 ? 'green' : results.total_score >= 50 ? 'yellow' : 'red'}>
            {results.total_score.toFixed(2)}
          </Badge>
        </Text>
      </VStack>
    );
  }

  if (!questions.length) {
    return (
      <Text color="gray.400" fontSize="lg" textAlign="center">
        No questions available
      </Text>
    );
  }

  const currentQ = questions[currentQuestion];
  const displayQuestion = currentQ.question; // Access the 'question' field
  const difficulty = currentQ.difficulty || 'Unknown'; // Default if missing
  const category = currentQ.category || currentQ.type || 'General'; // Handle both 'category' and 'type'

  return (
    <VStack spacing={6} color="white" p={4} maxW="800px" mx="auto">
      <Heading size="lg" color="brand.500">AI Interview</Heading>
      <Box w="full">
        <Text fontSize="xl" fontWeight="bold" color="gray.100">
          Question {currentQuestion + 1} of {questions.length}
        </Text>
        <Text fontSize="lg" mt={2} color="gray.200">
          {displayQuestion}
        </Text>
        <Flex mt={2} gap={4}>
          <Badge colorScheme={difficulty === 'Hard' ? 'red' : 'blue'}>
            {difficulty}
          </Badge>
          <Badge colorScheme="purple">{category}</Badge>
        </Flex>
      </Box>
      <Input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here"
        size="lg"
        bg="dark.300"
        borderColor="gray.600"
        color="white"
        _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px brand.500' }}
        _placeholder={{ color: 'gray.500' }}
      />
      <Button
        colorScheme="brand"
        size="lg"
        onClick={submitAnswer}
        isDisabled={loading}
        isLoading={loading}
        loadingText="Submitting"
      >
        Submit Answer
      </Button>
    </VStack>
  );
};

export default AIInterview;