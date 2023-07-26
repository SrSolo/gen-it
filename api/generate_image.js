const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/generate_image', async (req, res) => {
  try {
    const { apiKey, textPrompt } = req.body;

    if (!apiKey || !textPrompt) {
      res.status(400).json({ error: 'Please provide both the API key and the text prompt.' });
      return;
    }

    console.log('Received API Key:', apiKey);
    console.log('Received Text Prompt:', textPrompt);

    const configuration = new Configuration({
      apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createImage({
      prompt: textPrompt,
      n: 1,
      size: "1024x1024",
    });

    console.log('OpenAI API Response:', response.data);

    res.status(200).json(response.data); // Send the full response data as-is
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while generating the image.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
