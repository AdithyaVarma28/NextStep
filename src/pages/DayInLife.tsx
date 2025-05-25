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

// --- HARDCODE YOUR API KEY HERE ---
const GROQ_API_KEY = "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"; // <-- Replace with your actual key

const analyzeWithGroq = async (
  apiKey: string,
  prompt: string,
  userInput: string
): Promise<FeedbackSection[]> => {
  const groq = new Groq({
    apiKey,
    dangerouslyAllowBrowser: true, // For client-side use; use a backend for production!
  });

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: userInput },
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

const promptText = `
You are an expert career advisor.
Analyze the following career day schedule and respond ONLY with a JSON object that contains a single key "review", whose value is an array of objects.
Each object in the array must have these unique keys:
- title (string)
- score (integer 0-100)
- status (string: "excellent" | "good" | "needs-improvement")
- feedback (array of strings)
- suggestions (array of strings)

One of the objects in the array MUST be titled "Daily Routine" and should provide a breakdown of a typical day for this career, including key activities and time allocations.

Each section must be a separate object in the array.
Do NOT repeat keys in a single object.
Do NOT concatenate multiple sections into one object.
Do NOT include any trailing commas in the JSON output.
Do NOT include any text outside the JSON object.

Example:
{
  "review": [
    {
      "title": "Career Day Schedule Layout",
      "score": 80,
      "status": "good",
      "feedback": ["The layout could be improved for better readability."],
      "suggestions": ["Use headings and clear section separation."]
    },
    {
      "title": "Daily Routine",
      "score": 92,
      "status": "excellent",
      "feedback": [
        "Typically starts with a 9:00 AM review of ongoing projects and priorities.",
        "Spend the next 2-3 hours on focused AI engineering work, including coding and testing.",
        "Take a 30-minute lunch break at 12:30 PM.",
        "Afternoon is dedicated to meeting with the data science team, discussing project progress, and addressing any questions or concerns.",
        "The day concludes with a 15-minute wrap-up session to summarize accomplishments and plan for the next day."
      ],
      "suggestions": [
        "Consider allocating time for knowledge sharing and mentoring.",
        "Prioritize personal development and stay updated on the latest AI engineering trends and tools."
      ]
    }
  ]
}
`;

const DayInLifeWithGroq = () => {
  const [careerText, setCareerText] = useState(""); // Paste or generate the career schedule as text
  const [feedback, setFeedback] = useState<FeedbackSection[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setError(null);
    setFeedback(null);
    if (!careerText.trim()) {
      setError("Please paste the schedule or career data to analyze.");
      return;
    }
    setIsAnalyzing(true);
    try {
      const results = await analyzeWithGroq(GROQ_API_KEY, promptText, careerText.trim());
      setFeedback(results);
    } catch (err: any) {
      setError(err.message || "Analysis failed. Please try again.");
    }
    setIsAnalyzing(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 32 }}>
      <h2>AI Career Day Feedback (Groq API)</h2>
      <textarea
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", marginBottom: 16 }}
        placeholder="Paste the career schedule or data here..."
        value={careerText}
        onChange={(e) => setCareerText(e.target.value)}
        disabled={isAnalyzing}
      />
      <br />
      <button onClick={handleAnalyze} disabled={isAnalyzing}>
        {isAnalyzing ? "Analyzing..." : "Analyze"}
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

export default DayInLifeWithGroq;
