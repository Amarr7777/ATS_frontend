import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadResume = async (file: File,jobDesc: string) => {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await api.post('/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.resume_text) {
      localStorage.setItem('resumeText', response.data.resume_text);
    }

    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const startInterview = async (resumeText: string) => {
  try {
    const response = await api.post('/start-interview', {
      resume_text: resumeText
    });
    return response.data;
  } catch (error) {
    console.error('Interview start error:', error);
    throw error;
  }
};

export const submitAnswer = async (data: { 
  interview_id: string; 
  answer: string;
  question_index: number;
}) => {
  try {
    const response = await api.post('/evaluate-answer', data);
    return response.data;
  } catch (error) {
    console.error('Answer submission error:', error);
    throw error;
  }
}; 