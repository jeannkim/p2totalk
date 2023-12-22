const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.json()); // This line is crucial

const getWord = require('./src/translate');


// Serve static files (CSS, client-side JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse the body of the request as URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Endpoint to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Endpoint to handle the form submission
app.post('/submit-text', (req, res) => {
    //console.log('Text received:', req.body.textInput);
    res.send(req.body.textInput);
  });


app.post('/get-word', async (req, res) => {
    console.log("SERVER RECEIVED: ", req.body); // Add this line to log the request body
    try {
        const feedback = await getWord(req.body);
        res.json({ feedback });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 2017;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});