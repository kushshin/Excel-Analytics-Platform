// routes/chartSummary.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/generate-summary', async (req, res) => {
    console.log({chart:req.body})
  const { chartType, xLabel, yLabels, data } = req.body;

  if (!chartType || !xLabel || !yLabels || !data) {
    return res.status(400).json({ error: 'Missing chart data in request.' });
  }

  const prompt = `
You are a data visualization expert. Please analyze the following chart data and write a short summary.

Chart Type: ${chartType}
X-Axis: ${xLabel}
Y-Axis: ${yLabels.join(', ')}
Data: ${JSON.stringify(data)}

Provide a simple, insightful summary highlighting patterns, trends, or outliers.`;

  try {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 300,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const aiMessage = openaiResponse.data.choices[0].message.content;
    res.json({ summary: aiMessage });
  } catch (err) {
    console.error('OpenAI Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'AI summary generation failed.' });
  }
});

export default router;
