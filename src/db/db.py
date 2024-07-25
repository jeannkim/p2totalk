import sqlite3
import os
import pandas as pd

CLEANDICT_PATH = '../dict_processing/cleandict.txt'     # phonemes --> words
FREQS_PATH = '../dict_processing/en_full.txt'   # words --> usage freq (# of times used in a corpus)

def parse(filename):
    with open(filename, 'r') as file:
        for line in file:
            if not line.startswith(';'):  # Skip comment lines
                # split words and phonemes
                parts = line.strip().split(' ', 1) # maxsplit once
                yield (parts[0], parts[1])  # word, phonemes


def init_setup():
    conn = sqlite3.connect('phonemes.sqlite')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS phonemes_words (
            word_id INTEGER PRIMARY KEY,
            word TEXT NOT NULL,
            phonemes TEXT NOT NULL
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS freqs (
        word_id INTEGER PRIMARY KEY,
        word TEXT NOT NULL,
        freq INTEGER NOT NULL
        )
    ''')
    c.execute('CREATE INDEX IF NOT EXISTS idx_phonemes ON phonemes_words (phonemes)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_freqs ON freqs (freq)')

    conn.commit()
    return conn


def insert_data(dictfile, freqfile, conn):
    c = conn.cursor()
    # call parsedata, insert data in tuple
    c.executemany('INSERT INTO phonemes_words (word, phonemes) VALUES (?, ?)', parse(dictfile))
    c.executemany('INSERT INTO freqs (word, freq) VALUES (?, ?)', parse(freqfile))
    conn.commit()

def search_word_by_phonemes(phoneme_list, conn):
    phoneme_str = ' '.join(phoneme_list)
    c = conn.cursor()
    c.execute('SELECT word FROM unique_phonemes_words WHERE phonemes=?', (phoneme_str,))
    return c.fetchall()

def setup(conn):
 # create words, freqs tables
    insert_data(CLEANDICT_PATH, FREQS_PATH, conn)

    # Getting rid of duplicate phonemes (homophones):
    # for >1 words pronounced with the same phonemes,
    # choose the word that is used most frequently
    # output: db of unique phoneme sequence --> word 

    # read in the two tables as df's
    query_phonemes = "SELECT * FROM phonemes_words"
    df_phonemes = pd.read_sql_query(query_phonemes, conn)
    query_freqs = "SELECT * FROM freqs"
    df_freqs = pd.read_sql_query(query_freqs, conn)

    # join on 'word'
    combined_data = pd.merge(df_phonemes, df_freqs, on='word')

    # group by 'phoneme' and select the word with the highest frequency
    result = combined_data.loc[combined_data.groupby('phonemes')['freq'].idxmax()]

    # use relevant columns to make final db
    final_data = result[['phonemes', 'word']]
    final_data.to_sql('unique_phonemes_words', conn, if_exists='replace', index=False)




if __name__ == "__main__":

    conn = init_setup()
    #setup(conn)

    # test phoneme lookup
    c = conn.cursor()
    phoneme_input = ['EY', 'T']
    result = search_word_by_phonemes(phoneme_input, conn)
    for word in result:
        print(word[0])

    conn.close()


