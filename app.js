const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Use the CORS middleware

app.get('/proxy', async (req, res) => {
  const { targetUrl, cookie } = req.query;

  if (!targetUrl) {
    return res.status(400).send('Missing targetUrl parameter');
  }

  try {
    const headers = {};
    if (cookie) {
      headers.Cookie = decodeURIComponent(cookie);
    }

    const response = await axios.get(targetUrl, {
      headers,
      responseType: 'arraybuffer',
    });

    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching video:', error.message);
    res.status(500).send(`Error fetching video: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
