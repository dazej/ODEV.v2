import express from "express";
import { getRecommendations } from "./aiService.js";

const router = express.Router();

router.post("/recommendations", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await getRecommendations(prompt);
    res.json({ recommendations: JSON.parse(result) });
  } catch (err) {
    res.status(500).send({ error: "AI recommendation failed" });
  }
});

export default router;