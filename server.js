const express = require('express');
const axios = require('axios');
const path = require('path'); // Add this line
const app = express();
const port = process.env.PORT || 8080;

require('dotenv').config();

// Get the API key from environment variable
const openaiApiKey = process.env.OPENAI_API_KEY;

app.use(express.json());
app.use(express.static("assets"));

// Add this block of code
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'chatbot-widget.html'));
});

app.post('/api/chatbot', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        ...req.body,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Error calling OpenAI API' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


