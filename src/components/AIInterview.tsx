import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Textarea,
  VStack,
  useToast,
  Badge,
  Card,
  CardBody,
  useColorModeValue,
  HStack,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { startInterview, submitAnswer } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import styles from '../styles/AIInterview.module.css';

interface Feedback {
  score: number;
  detailed_feedback?: string;
  areas_for_improvement?: string[];
  specific_recommendations?: string[];
  key_strengths?: string[];
  follow_up_suggestions?: string[];
}

interface Question {
  question: string;
  type: string;
  evaluation_criteria: string[];
  follow_up_questions: string[];
  context: string;
}

interface AIInterviewProps {
  resumeText: string;
}

export default function AIInterview({ resumeText }: AIInterviewProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewId, setInterviewId] = useState<string>('');
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleStartInterview = async () => {
    setLoading(true);
    try {
      console.log("Starting interview with resume text:", resumeText?.substring(0, 100) + "...");
      if (!resumeText) {
        throw new Error("No resume text provided");
      }
      
      const response = await startInterview(resumeText);
      console.log("Interview response:", response);
      
      if (!response.questions || response.questions.length === 0) {
        throw new Error("No questions received from server");
      }
      
      setQuestions(response.questions);
      setInterviewId(response.interview_id);
      setInterviewStarted(true);
    } catch (error) {
      console.error("Interview error:", error);
      toast({
        title: 'Failed to start interview',
        description: error instanceof Error ? error.message : 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      toast({
        title: 'Please provide an answer',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await submitAnswer({
        interview_id: interviewId,
        answer: answer,
        question_index: currentQuestion
      });

      // Make sure we have valid feedback data
      const feedbackData: Feedback = {
        score: response.score || 0,
        detailed_feedback: response.detailed_analysis,
        areas_for_improvement: response.critical_feedback || [],
        specific_recommendations: response.improvement_requirements || [],
        key_strengths: response.key_strengths || [],
        follow_up_suggestions: response.follow_up_questions || [],
      };

      setCurrentFeedback(feedbackData);
      setShowFeedback(true);

    } catch (error) {
      console.error('Answer submission error:', error);
      toast({
        title: 'Failed to submit answer',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    setAnswer('');
    setCurrentFeedback(null);
    setShowFeedback(false);
    setCurrentQuestion(prev => prev + 1);
  };

  return (
    <div className={styles.interviewContainer}>
      <VStack spacing={8}>
        {!interviewStarted ? (
          <Box textAlign="center">
            <Heading size="lg" mb={4}>
              Ready to Start Your Interview?
            </Heading>
            <Button
              colorScheme="brand"
              size="lg"
              onClick={handleStartInterview}
              isLoading={loading}
            >
              Start Interview
            </Button>
          </Box>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <VStack spacing={6} width="100%">
                <Card width="100%" bg={bgColor}>
                  <CardBody>
                    <Badge
                      colorScheme={
                        questions[currentQuestion]?.type === 'technical'
                          ? 'blue'
                          : questions[currentQuestion]?.type === 'behavioral'
                          ? 'green'
                          : 'purple'
                      }
                      mb={2}
                    >
                      {questions[currentQuestion]?.type.toUpperCase()}
                    </Badge>
                    <Text fontSize="lg" mb={4}>
                      {questions[currentQuestion]?.question}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Context: {questions[currentQuestion]?.context}
                    </Text>
                  </CardBody>
                </Card>

                {!showFeedback ? (
                  <>
                    <Textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      size="lg"
                      rows={6}
                    />
                    <Button
                      colorScheme="brand"
                      width="100%"
                      onClick={handleSubmitAnswer}
                      isLoading={loading}
                    >
                      Submit Answer
                    </Button>
                  </>
                ) : (
                  <FeedbackCard
                    feedback={currentFeedback!}
                    onNext={handleNextQuestion}
                    isLastQuestion={currentQuestion === questions.length - 1}
                  />
                )}

                <Text color="gray.500">
                  Question {currentQuestion + 1} of {questions.length}
                </Text>
              </VStack>
            </motion.div>
          </AnimatePresence>
        )}

        {loading && <LoadingSpinner text="Processing..." />}
      </VStack>
    </div>
  );
}

// Add this component for feedback display
function FeedbackCard({ feedback, onNext, isLastQuestion }: {
  feedback: Feedback;
  onNext: () => void;
  isLastQuestion: boolean;
}) {
  return (
    <Card width="100%" variant="filled">
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <Heading size="md">Feedback</Heading>
            <Badge colorScheme={feedback.score >= 70 ? "green" : "orange"} fontSize="lg">
              Score: {feedback.score}
            </Badge>
          </HStack>
          
          {feedback.detailed_feedback && (
            <>
              <Text fontWeight="bold">Detailed Feedback:</Text>
              <Text>{feedback.detailed_feedback}</Text>
            </>
          )}

          {feedback.key_strengths && feedback.key_strengths.length > 0 && (
            <>
              <Text fontWeight="bold">Key Strengths:</Text>
              <UnorderedList>
                {feedback.key_strengths.map((strength, i) => (
                  <ListItem key={i}>{strength}</ListItem>
                ))}
              </UnorderedList>
            </>
          )}

          {feedback.areas_for_improvement && feedback.areas_for_improvement.length > 0 && (
            <>
              <Text fontWeight="bold">Areas for Improvement:</Text>
              <UnorderedList>
                {feedback.areas_for_improvement.map((area, i) => (
                  <ListItem key={i}>{area}</ListItem>
                ))}
              </UnorderedList>
            </>
          )}

          {feedback.specific_recommendations && feedback.specific_recommendations.length > 0 && (
            <>
              <Text fontWeight="bold">Recommendations:</Text>
              <UnorderedList>
                {feedback.specific_recommendations.map((rec, i) => (
                  <ListItem key={i}>{rec}</ListItem>
                ))}
              </UnorderedList>
            </>
          )}

          <Button
            colorScheme="brand"
            onClick={onNext}
            mt={4}
          >
            {isLastQuestion ? 'Complete Interview' : 'Next Question'}
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
} 