const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/phonemes.sqlite'); // . is @ server.js

function searchWordByPhonemes(phonemes, callback) {
    const phonemeStr = phonemes.join(' ');
    db.all('SELECT word FROM unique_phonemes_words WHERE phonemes = ?', [phonemeStr], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}

// example:
searchWordByPhonemes(['EY', 'T'], (words) => {
    words.forEach((row) => {
        console.log(row.word);
    });
});

db.close();
