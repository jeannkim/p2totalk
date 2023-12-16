import sqlite3
import os
CLEANDICT_PATH = '../dict_processing/cleandict.txt'

def parse_cmu_data(filename):
    with open(filename, 'r') as file:
        for line in file:
            if not line.startswith(';'):  # Skip comment lines
                # split words and phonemes
                parts = line.strip().split(' ', 1) # maxsplit once
                yield (parts[0], parts[1])  # word, phonemes


def setup_database():
    conn = sqlite3.connect('phoneme_db.sqlite')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS words (
            word_id INTEGER PRIMARY KEY,
            word TEXT NOT NULL,
            phonemes TEXT NOT NULL
        )
    ''')
    c.execute('CREATE INDEX IF NOT EXISTS idx_phonemes ON words (phonemes)')
    conn.commit()
    return conn

def insert_data(filename, conn):
    c = conn.cursor()
    # call parsedata, insert data in tuple
    c.executemany('INSERT INTO words (word, phonemes) VALUES (?, ?)', parse_cmu_data(filename))
    conn.commit()

def search_word_by_phonemes(phoneme_list, conn):
    phoneme_str = ' '.join(phoneme_list)
    c = conn.cursor()
    c.execute('SELECT word FROM words WHERE phonemes=?', (phoneme_str,))
    return c.fetchall()

if __name__ == "__main__":
    conn = setup_database()
    # Uncomment the next line to populate the database (only once)
    insert_data(CLEANDICT_PATH, conn)
    c = conn.cursor()
    phoneme_input = ['N', 'IH', 'F', 'T', 'IY']
    result = search_word_by_phonemes(phoneme_input, conn)
    for word in result:
        print(word[0])