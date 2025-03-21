import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useResumeContext } from '../../../contexts/ResumeContext';

interface Question {
  question: string;
  context: string;
  type: string;
  evaluation_criteria: string[];
  follow_up_questions: string[];
}

const Interview = () => {
  const router = Router;
  const { resumeData } = useResumeContext();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if we have resume data
    if (!resumeData?.interview_id) {
      router.push('/upload');
      return;
    }

    startInterview();
  }, [resumeData, router]);

  const startInterview = async () => {
    try {
      if (!resumeData?.interview_id) {
        throw new Error('No resume data found');
      }

      setLoading(true);
      setError('');

      const response = await fetch(`/api/interview/${resumeData.interview_id}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          job_title: "Software Engineer",
          experience_level: "mid"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to start interview');
      }

      const data = await response.json();
      console.log('Interview started:', data);
      setQuestions(data.questions || []);
    } catch (error: unknown) {
      console.error('Error starting interview:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading interview questions...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => router.push('/upload')}>
          Return to Upload
        </button>
      </div>
    );
  }

  if (!resumeData?.interview_id) {
    return (
      <div>
        <h1>No Resume Found</h1>
        <p>Please upload your resume first.</p>
        <button onClick={() => router.push('/upload')}>
          Upload Resume
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Technical Interview</h1>
      {questions.length > 0 ? (
        <div>
          <h2>Question {currentQuestion + 1}</h2>
          <div>{questions[currentQuestion].question}</div>
          {/* Add your answer input and submission logic here */}
        </div>
      ) : (
        <div>No questions available</div>
      )}
    </div>
  );
};

export default Interview; 