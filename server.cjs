const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

app.get('/proxy', async (req, res) => {
    const url = 'https://news.ycombinator.com/';
    try {
        const response = await fetch(url);
        const html = await response.text();
        res.send(html);
    } catch (err) {
        res.status(500).send('Something went wrong.');
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});