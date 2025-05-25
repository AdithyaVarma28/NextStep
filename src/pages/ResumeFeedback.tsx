// ResumeFeedback.tsx
import { useState } from "react";
import Groq from "groq-sdk";

// --- Types for feedback sections ---
interface FeedbackSection {
  title: string;
  score: number;
  status: "excellent" | "good" | "needs-improvement";
  feedback: string[];
  suggestions: string[];
}

// --- MANUALLY SET YOUR API KEY HERE ---
const GROQ_API_KEY = "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"; // <-- Replace with your actual key

// --- Initialize Groq client ---
const groq = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // For client-side use; use a backend for production!
});

// --- Resume analysis function with JSON mode and strict prompt ---
const analyzeResumeWithGroq = async (resume: string): Promise<FeedbackSection[]> => {
  const prompt = `
You are an expert resume reviewer.
Analyze the following resume and respond ONLY with a JSON object that contains a single key "review", whose value is an array of objects.
Each object in the array must have these unique keys:
- title (string)
- score (integer 0-100)
- status (string: "excellent" | "good" | "needs-improvement")
- feedback (array of strings)
- suggestions (array of strings)

Each section must be a separate object in the array.
Do NOT repeat keys in a single object.
Do NOT concatenate multiple sections into one object.
Do NOT include any text outside the JSON object.

Example:
{
  "review": [
    {
      "title": "Overall Resume",
      "score": 82,
      "status": "good",
      "feedback": ["The resume provides a clear overview of the candidate's background and skills."],
      "suggestions": ["Consider adding a professional summary section to provide a brief overview of the candidate's experience and skills."]
    },
    {
      "title": "Summary and Objective section",
      "score": 65,
      "status": "needs-improvement",
      "feedback": ["The summary section is somewhat generic and does not clearly convey the candidate's unique strengths and qualifications."],
      "suggestions": ["Consider rewriting the summary to highlight the candidate's unique strengths and qualifications."]
    }
  ]
}
`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: resume },
      ],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    let parsed;
    try {
      parsed = JSON.parse(content || "[]");
      if (Array.isArray(parsed)) return parsed;
      if (parsed.review && Array.isArray(parsed.review)) return parsed.review;
      if (parsed.data && Array.isArray(parsed.data)) return parsed.data;
      if (parsed.sections && Array.isArray(parsed.sections)) return parsed.sections;
      throw new Error("Unexpected JSON structure from Groq API.");
    } catch (e) {
      throw new Error("Groq API or JSON error: " + (e as Error).message + "\nRaw output: " + content);
    }
  } catch (error: any) {
    throw new Error("Groq API or JSON error: " + (error?.message || error));
  }
};

const ResumeFeedback: React.FC = () => {
  const [resumeText, setResumeText] = useState("");
  const [feedback, setFeedback] = useState<FeedbackSection[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeResume = async () => {
    setError(null);
    setFeedback(null);
    if (!resumeText.trim()) {
      setError("Please paste your resume to begin analysis.");
      return;
    }
    setIsAnalyzing(true);
    try {
      const results = await analyzeResumeWithGroq(resumeText.trim());
      setFeedback(results);
    } catch (err: any) {
      setError(err.message || "Analysis failed. Please try again.");
    }
    setIsAnalyzing(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 32 }}>
      <h2>AI Resume Feedback (Groq API)</h2>
      <textarea
        rows={12}
        style={{ width: "100%", fontFamily: "monospace", marginBottom: 16 }}
        placeholder="Paste your resume here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        disabled={isAnalyzing}
      />
      <br />
      <button onClick={handleAnalyzeResume} disabled={isAnalyzing}>
        {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
      </button>
      {error && <div style={{ color: "red", marginTop: 16, whiteSpace: "pre-wrap" }}>{error}</div>}
      {feedback && (
        <div style={{ marginTop: 32 }}>
          <h3>Feedback:</h3>
          {feedback.map((section, idx) => (
            <div key={idx} style={{ marginBottom: 24, border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
              <h4>
                {section.title} ({section.score}/100 - {section.status})
              </h4>
              <strong>Positives:</strong>
              <ul>
                {section.feedback.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <strong>Suggestions:</strong>
              <ul>
                {section.suggestions.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeFeedback;
