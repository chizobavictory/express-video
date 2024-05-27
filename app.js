const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Proxy endpoint
app.get('/proxy', async (req, res) => {
  const { targetUrl, cookie } = req.query;

  console.log(`Proxying request to: ${targetUrl}`);
  console.log(`With cookie: ${cookie}`);

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        Cookie: cookie, // Attach the cookie to headers
      },
      responseType: 'arraybuffer',
    });

    res.set('Content-Type', 'application/octet-stream');
    res.set('Access-Control-Allow-Origin', '*');
    res.send(response.data);
  } catch (error) {
    console.error(`Error fetching video: ${error.message}`);
    res.status(error.response?.status || 500).send(error.message);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
