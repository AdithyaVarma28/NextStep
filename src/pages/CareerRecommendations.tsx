import { useState } from 'react';

const CareerRecommendations = () => {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const GROQ_API_KEY = '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'; // Hardcoded API key (dangerous!)

  const handleGetRecommendations = async () => {
    setLoading(true);

    const prompt = `
You are a smart AI career coach. Based on the following skills and interests:

Skills: ${skills}
Interests: ${interests}

Suggest the 3 best-fit careers with details like title, match, salary, growth, description, reasons, and skills.
Respond in JSON format.
`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const rawText = data.choices?.[0]?.message?.content;

      // Extract JSON from response
      const jsonStart = rawText.indexOf('[');
      const jsonEnd = rawText.lastIndexOf(']');
      const parsed = JSON.parse(rawText.slice(jsonStart, jsonEnd + 1));

      setRecommendations(parsed);
    } catch (error) {
      alert('Error getting recommendations');
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Career Recommendations</h2>

      <textarea
        rows={4}
        placeholder="Enter your skills, comma separated"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <textarea
        rows={4}
        placeholder="Enter your interests, comma separated"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleGetRecommendations} disabled={loading}>
        {loading ? 'Loading...' : 'Get Recommendations'}
      </button>

      <div style={{ marginTop: 20 }}>
        {recommendations.length > 0 &&
          recommendations.map((rec, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
              <h3>{rec.title} — {rec.match}% Match</h3>
              <p><strong>Salary:</strong> {rec.salary}</p>
              <p><strong>Growth:</strong> {rec.growth}</p>
              <p>{rec.description}</p>
              <p><strong>Reasons:</strong></p>
              <ul>{rec.reasons.map((r, idx) => <li key={idx}>{r}</li>)}</ul>
              <p><strong>Skills:</strong> {rec.skills.join(', ')}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CareerRecommendations;
