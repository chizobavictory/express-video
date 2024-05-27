const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  const cookies = req.headers['cookie'] || '';

  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'Cookie': cookies,
      },
      responseType: 'stream',
    });

    res.set(response.headers);
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send(`Error fetching video: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
