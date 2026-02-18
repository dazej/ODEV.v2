export async function getAIRecommendations(prompt) {
  const res = await fetch("/api/ai/recommendations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  return res.json();
}