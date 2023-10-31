import sqlite3
import os


# Step 1: Data Acquisition - Assuming you have the CMU dictionary as 'cmudict.txt'

# Step 2: Data Parsing
def parse_cmu_data(filename):
    with open(filename, 'r') as file:
        for line in file:
            if not line.startswith(';'):  # Skip comment lines
                # split words and phonemes
                parts = line.split(' ', 1)  # maxsplit once
                yield (parts[0], parts[1])  # word, phonemes


# Step 3 & 4: Database Design & Schema
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

# Step 5: Data Insertion
def insert_data(filename, conn):
    c = conn.cursor()
    c.executemany('INSERT INTO words (word, phonemes) VALUES (?, ?)', parse_cmu_data(filename))
    conn.commit()

# Step 6: Fast Lookup
def search_word_by_phonemes(phoneme_list, conn):
    phoneme_str = ' '.join(phoneme_list)
    c = conn.cursor()
    c.execute('SELECT word FROM words WHERE phonemes=?', (phoneme_str,))
    return c.fetchall()

if __name__ == "__main__":
    conn = setup_database()
    # Uncomment the next line to populate the database (only once)
    insert_data('../cleandict.txt', conn)
    
    phoneme_input = ['R', 'IH0', 'K', 'ER0', 'D']
    result = search_word_by_phonemes(phoneme_input, conn)
    for word in result:
        print(word[0])