import { useState } from "react";
import { getAIRecommendations } from "../services/aiService";

export default function AIChat() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const askAI = async () => {
    const { recommendations } = await getAIRecommendations(input);
    setResults(recommendations);
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What outfit do you want?"
      />
      <button onClick={askAI}>Recommend</button>

      <div>
        {results.map((id) => (
          <p key={id}>Product ID: {id}</p>
        ))}
      </div>
    </div>
  );
}