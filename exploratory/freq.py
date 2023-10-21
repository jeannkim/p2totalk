# word frequencies from https://github.com/hermitdave/FrequencyWords

# @param string word 
# @return int frequency
def getFreq(word):
    
    with open("en_full.txt",'r', encoding="utf8") as a: # first, read txt file into a list
        while True:    
            # Get next line from file
            line = a.readline()
        
            # if line is empty
            # end of file is reached
            if not line:
                break

            if line.split(' ')[0] == word:  # matching word found
                return line.split(' ')[1]   # return freq

        print("word \"", word, "\" not found")
        return

# alternative for above that might take less time lol
# @param string word to search for
# @param int endLineNum - line number to stop searching at
# @return int line it was found on
def getLineNum(word, endLineNum):
    
    with open("en_full.txt",'r', encoding="utf8") as a: # first, read txt file into a list
        linenum = 1         # keep track of line number

        while linenum <= endLineNum:    
            # Get next line from file
            line = a.readline()

            # if line is empty
            # end of file is reached
            if not line:
                break

            if line.split()[0] == word:  # matching word found
                return linenum
            
            linenum += 1    # increment line number

        #print("word \"", word, "\" not found in bounds")

        return -1

# @param string array of words 
# @return string word with the highest freq
def highestFreqWord(words):

    # storing word with highest frequency + its line number
    highestWord = words[0]  
    minLinNum = 50000    # initially 50k

    for word in words:
        word = word.lower()

        curLineNum = getLineNum(word, minLinNum)   # stops searching at min

        # either word not found in txt file
        # or word found later (lesser freq)
        if curLineNum == -1:
            continue        # disregard it
        # otherwise, word was found EARLIER
        # higher freq -> new min and new highest word
        else:
            highestWord = word
            minLinNum = curLineNum

    return highestWord
        



funnies = ["ade", "aid", "cannibalism"]

for fun in funnies:
    print(fun, getFreq(fun))

print(highestFreqWord(funnies))
