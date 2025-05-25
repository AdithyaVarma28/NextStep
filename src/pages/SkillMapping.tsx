import { useState } from 'react';

const SkillGapAnalyzer = () => {
  const [selectedCareer, setSelectedCareer] = useState('');
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(false);

  const GROQ_API_KEY = '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'; // Manual key

  const handleAnalyze = async () => {
    if (!selectedCareer) {
      alert('Please enter a career title.');
      return;
    }

    setLoading(true);

    const prompt = `
You are a career coach AI. Given the career title "${selectedCareer}", 
please provide an array of key skills with the following details for each skill:
- skill: the skill name
- required: a percentage (0-100) indicating how important the skill is for this career
- current: assume the user has 50% proficiency in all skills (for demo)
- gap: difference between required and current

Respond ONLY with a JSON array of objects like this:

[
  { "skill": "JavaScript", "required": 90, "current": 50, "gap": 40 },
  ...
]

Do not add any explanation or extra text.
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
          temperature: 0.5,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content;

      const jsonStart = aiReply.indexOf('[');
      const jsonEnd = aiReply.lastIndexOf(']');
      const parsed = JSON.parse(aiReply.slice(jsonStart, jsonEnd + 1));

      setAnalysis(parsed);
    } catch (err) {
      alert('Error analyzing skills. Try again.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Skill Gap Analyzer</h2>

      <input
        type="text"
        placeholder="Enter career title"
        value={selectedCareer}
        onChange={(e) => setSelectedCareer(e.target.value)}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Skills'}
      </button>

      <div style={{ marginTop: 20 }}>
        {analysis.length > 0 &&
          analysis.map((item, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
              <h4>{item.skill}</h4>
              <p><strong>Required:</strong> {item.required}%</p>
              <p><strong>Current:</strong> {item.current}%</p>
              <p><strong>Gap:</strong> {item.gap}%</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
