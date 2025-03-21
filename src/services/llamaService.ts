interface LlamaAnalysisResponse {
  ats_score: number;
  format_score: number;
  content_score: number;
  keyword_score: number;
  impact_score: number;
  detected_skills: string[];
  missing_keywords: string[];
  format_issues: string[];
  content_issues: string[];
  sections_analysis: {
    summary: number;
    experience: number;
    education: number;
    skills: number;
    projects: number;
  };
}

const GROK_API_ENDPOINT = 'http://localhost:8000/grok'; // Update this with your actual Grok endpoint

export async function analyzePDFWithLlama(pdfText: string): Promise<LlamaAnalysisResponse> {
  try {
    const prompt = `Analyze this resume and provide detailed feedback:
    1. Calculate scores (0-100) for:
       - Format quality
       - Content effectiveness
       - Keyword relevance
       - Achievement impact
    2. Identify key skills
    3. Suggest missing important keywords
    4. List format issues
    5. List content improvement suggestions
    6. Score each section (0-100):
       - Professional Summary
       - Work Experience
       - Education
       - Skills
       - Projects

    Resume text:
    ${pdfText}`;

    const response = await fetch(GROK_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze resume with Llama');
    }

    const rawResponse = await response.json();
    
    // Parse Llama's response and structure it according to our interface
    return parseLlamaResponse(rawResponse.text);
  } catch (error) {
    console.error('Error analyzing resume with Llama:', error);
    throw error;
  }
}

export async function conductAIInterview(resumeText: string): Promise<string> {
  try {
    const prompt = `Based on this resume, generate 5 relevant technical interview questions:
    ${resumeText}`;

    const response = await fetch(GROK_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate interview questions');
    }

    const result = await response.json();
    return result.text;
  } catch (error) {
    console.error('Error generating interview questions:', error);
    throw error;
  }
}

function parseLlamaResponse(text: string): LlamaAnalysisResponse {
  // This is a simplified parser. You might need to adjust it based on actual Llama output format
  try {
    // Extract scores using regex
    const scores = {
      format_score: extractScore(text, 'format quality') || 0,
      content_score: extractScore(text, 'content effectiveness') || 0,
      keyword_score: extractScore(text, 'keyword relevance') || 0,
      impact_score: extractScore(text, 'achievement impact') || 0,
    };

    // Calculate ATS score
    const ats_score = Math.round(
      (scores.format_score + scores.content_score + scores.keyword_score + scores.impact_score) / 4
    );

    // Extract skills (assuming they're listed after "Key skills:" or similar)
    const detected_skills = extractListItems(text, 'Key skills');
    const missing_keywords = extractListItems(text, 'Missing keywords');
    const format_issues = extractListItems(text, 'Format issues');
    const content_issues = extractListItems(text, 'Content improvement');

    // Extract section scores
    const sections_analysis = {
      summary: extractScore(text, 'Professional Summary') || 0,
      experience: extractScore(text, 'Work Experience') || 0,
      education: extractScore(text, 'Education') || 0,
      skills: extractScore(text, 'Skills') || 0,
      projects: extractScore(text, 'Projects') || 0,
    };

    return {
      ats_score,
      ...scores,
      detected_skills,
      missing_keywords,
      format_issues,
      content_issues,
      sections_analysis,
    };
  } catch (error) {
    console.error('Error parsing Llama response:', error);
    throw new Error('Failed to parse Llama analysis response');
  }
}

function extractScore(text: string, category: string): number {
  const regex = new RegExp(`${category}[^0-9]*([0-9]+)`, 'i');
  const match = text.match(regex);
  return match ? Math.min(100, Math.max(0, parseInt(match[1]))) : 0;
}

function extractListItems(text: string, section: string): string[] {
  const regex = new RegExp(`${section}:?\\s*([\\s\\S]*?)(?=\\n\\n|$)`, 'i');
  const match = text.match(regex);
  if (!match) return [];
  
  return match[1]
    .split('\n')
    .map(item => item.trim())
    .filter(item => item && !item.startsWith('-'))
    .map(item => item.replace(/^[•-]\s*/, ''));
} 