import sqlite3
import os

DB_NAME = 'unique_phonemes_words'

# NOTE: use escape characters in the text files for now

# text file with words to delete
# each word in separate line
DELETERS = './todelete.txt'

# text file with words to replace (same phoneme)
# each line: [phoneme] - [word]
REPLACERS = './toreplace.txt'

# text file with words and phonese to add
# each line: [phoneme] - [word]
ADDERS = './toadd.txt'


# param: filename, yield: string line
def parse(filename):
    with open(filename, 'r') as file:
        for line in file:
            if not line.startswith('#'):  # Skip comment lines
                yield str(line)

# return list of stripped lines
def parseAsList(filename):
    list = []
    for line in parse(filename):
        list.append(line.strip())
    return list

# return dict of "key - word" (each line)
def parseAsDict(filename):
    dic = {}
    for line in parse(filename):
        split = line.strip().split(' - ')
        dic[split[0]] = split[1]
    return dic

# remove words from db
# param: list, conn
def removeWords(words, conn):
    c = conn.cursor()
    for word in words:
        c.execute('DELETE FROM ' +  DB_NAME + ' WHERE word=\'' + word + '\'')
        print(word + " deleted")
        conn.commit()

# edit/replace the Words
# param: dict (phoneme -> word), conn
def replaceWords(dict, conn):
    c = conn.cursor()
    for phon in dict.keys():
        c.execute('UPDATE ' +  DB_NAME + ' SET word=\'' + dict[phon] + '\'' + ' WHERE phonemes=\'' + phon + '\'')
        print(phon + ' set to ' + dict[phon])
        conn.commit()

# add word phoneme pairs
# param: dict (phoneme -> word), conn
def addWords(dict, conn):
    c = conn.cursor()
    for phon in dict.keys():
        c.execute('INSERT INTO ' +  DB_NAME + ' (phonemes, word) VALUES (\'' + phon + '\', \'' + dict[phon] + '\')')
        print(phon + ' - ' + dict[phon] + ' added')
        conn.commit()


if __name__ == "__main__":


    conn = sqlite3.connect('./phonemes.sqlite')
    c = conn.cursor()

    # # DELETE ALL WORDS IN DELETERS
    # deleters = parseAsList(DELETERS)
    # removeWords(deleters, conn)

    # # REPLACE ALL WORDS IN REPLACERS
    # replacers = parseAsDict(REPLACERS)
    # replaceWords(replacers, conn)

    # ADD ALL WORDS IN ADDERS
    # WARNING: dont abuse this, can be dupes
    adders = parseAsDict(ADDERS)
    addWords(adders, conn)

    conn.close()

