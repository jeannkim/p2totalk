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
                reject(new Error('No word found for the given phonemes'));
            } else {
                resolve(rows[0].word);
            }
        });
    });
};

// // example:
// getWord(['EY', 'T'], (words) => {
//     words.forEach((row) => {
//         console.log(row.word);
//     });
// });

module.exports = getWord;