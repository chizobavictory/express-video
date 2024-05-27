const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/proxy', async (req, res) => {
  try {
    const targetUrl = req.headers['target-url'];
    const cookie = req.headers['cookie'];

    const response = await axios.get(targetUrl, {
      headers: {
        Cookie: cookie,
      },
      responseType: 'stream',
    });

    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
