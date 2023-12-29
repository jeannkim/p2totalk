const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.json()); // This line is crucial
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/phonemes.sqlite'); // . is @ server.js


// Promise: allows await
const getWord = async (input) => {
    phonemes = input.phonemes;
    console.log(phonemes);
    return new Promise((resolve, reject) => {
        db.all('SELECT word FROM unique_phonemes_words WHERE phonemes = ?', [phonemes], (err, rows) => {
            if (err) {
                reject(err);
            } else if (rows.length === 0) {
                resolve('Not In Table');
            } else {
                resolve(rows[0].word);
            }
        });
    });
};


// Serve static files (CSS, client-side JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse the body of the request as URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Endpoint to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/get-word', async (req, res) => {
    console.log("SERVER RECEIVED: ", req.body); // Add this line to log the request body
    try {
        const translation = await getWord(req.body);
        res.json({ translation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 2017;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});