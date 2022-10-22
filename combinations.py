# doing the logic
#coding:utf8

# import itertools package
import itertools
from itertools import permutations

import re

 
# ---------- INPUTS TO PHONEMES -----------

# initialize lists

faceButtons = ["CROSS", "SQUARE", "CIRCLE", "TRIANGLE"]
dPad = ["LEFT", "RIGHT", "UP", "DOWN"]
start = ["START"]

# "root" inputs; can be lone
roots = faceButtons + dPad + start

shoulderButtons = ["R2", "R1", "L2", "L1"]
 
# "prefix" inputs; come before roots, optional
prefixes = shoulderButtons + [""]   # can have no prefix


wrongcombos = list(itertools.product(roots, prefixes))

combos = list()

# bruh just swap them
# i dont want to reorder everything
for wrcom in wrongcombos:
    combos.append((wrcom[1], wrcom[0]))


# printing unique_combination list
#print(combos)

# map these combinations to phonemes???



# all from the Table
phonemes = ["u", "eɪ", "m", "s", "ɑ",
    "p", "", "n", "z", "æ",
    "t", "i", "r", "", "",
    "b", "ɪ", "l", "ʃ", "ɔ",
    "θ", "", "ʌ", "ŋ", "ɛ",
    "ð", "ʊ", "", "g", "ɚ",
    "f", "oʊ", "j", "dʒ", "aɪ",
    "v", "", "h", "k", "æ",
    "d", "", "w", "tʃ", "ə"]


# should correspond one to one with the combos up there

bigDict = {}

# fill the dict. key is combo, value is phoneme
for i in range(len(combos)):
    bigDict[combos[i]] = phonemes[i]

#print(bigDict)


# cmudict.dict
#   [Word] [Pronunciation]
#   pronunciation in ARPABET (not IPA)
#   includes stressed syllable tags "AH0"

# mfw i need to translate IPA into ARPA

# what the HELL ARPABET?
# AH0 and AH are different things
# but 0, 1, and 2 also annotate stresses

arpaipa = {"ɑ": "AA", "æ":"AE", "ʌ": "AH", "ə": "AH0", 
    "ɔ": "AO", "aʊ": "AW", "ə": "AX", "ɚ": "ER", 
    "aɪ": "AY", "ɛ": "EH", "ɝ": "ER", "eɪ": "EY", "ɪ": "IH", 
    "ɨ": "IX", "i": "IY", "oʊ": "OW", "ɔɪ": "OY", 
    "ʊ": "UH", "u": "UW", "ʉ": "UX",
    "b": "B", "tʃ": "CH", "d": "D", "ð": "DH", "ɾ": "DX",
    "l̩": "EL", "m̩": "EM", "n̩": "EN",
    "f": "F", "g": "G", "h": "HH", "dʒ": "JH",
    "k": "K", "l": "L", "m": "M", "n": "N",
    "ŋ": "NG", "ɾ̃": "NX", "p": "P", "ʔ": "Q", "r": "R", "s": "S",
    "ʃ": "SH", "t": "T", "θ": "TH", "v": "V",
    "w": "W", "j": "Y", "z": "Z", "ʒ": "ZH"}

arpaphonemes = []

for phoneme in phonemes:
    if (phoneme == ""):
        arpaphonemes.append("")
    else:
        if (arpaipa.get(phoneme) == None):
            print("WEIRD: ", phoneme)
        arpaphonemes.append(arpaipa.get(phoneme))

#print(arpaphonemes)
#print(len(phonemes), "  ", len(arpaphonemes))

# should correspond one to one with the combos up there

biggerDict = {}

# fill the dict. key is combo, value is phoneme
for i in range(len(combos)):
    biggerDict[combos[i]] = arpaphonemes[i]

#print(biggerDict)

# FUN TIME: do the map from CL
# first and second inputs stored inside map
#(first, second) = map(str, input("Enter 2 inputs with space: ").split())

#print(bigDict.get((first,second)))

# parsing it as it happens
# want input: LEFT LEFT L2 -> e ʌ

ERR_MSG = "NOT IN TABLE"

## param: string of inputs; "LEFT LEFT L2"
## return: string of corresponding phonemes; "e ʌ"
def getPhonemes(inputString):
    decodedStr = ""     # final string to return
    thePhonemes = []       # final array of phonemes to return
    # split string (by " ") into arr of inputs
    inps = inputString.split()
    
    # iterate through individual inputs
    for i in range(len(inps)):

        #print(inps[i])     # current input 
    
        # current input is a root; phoneme found
        if (inps[i] in roots):            
            pair = []  # pair of inputs to convert

            # if inp is the first input or the element before it is root
            if (i == 0) or (inps[i-1] in roots):
                # lone root input found
                pair = ["", inps[i]]
            
            else:
                # pair found; input preceding should be prefix
                if (inps[i-1] not in prefixes):
                    print(ERR_MSG, " INVALID PREFIX")
                    return
                # add pair
                pair = [inps[i-1], inps[i]]
            
            # convert the tuple to output
            tup = tuple(pair)      # (first, second) or (first, "")

            #print(tup)

            # convert to the phoneme!
            
            try:
                phoneme = biggerDict.get(tup)
            except:
                print(ERR_MSG)
                return
        
            # corresponding phoneme is "" in table
            if len(phoneme) < 1:
                print(ERR_MSG)
                return
            
            # add phoneme to printed string
            # and final array

            decodedStr += phoneme + " "
            thePhonemes.append(phoneme)
        
        # current input is a prefix
        else:
            # two prefixes cannot be consecutive
            if (i < len(inps)-1):
                # if the next input isn't a root
                if (inps[i+1] not in roots):
                    print(ERR_MSG)
                    return
            continue     
    
    #print(decodedStr)
    return thePhonemes


talk = input("Enter string of inputs delimited by spaces: ")
phonemeTest = getPhonemes(talk)
print(phonemeTest)


# ======== PHONEMES TO WORDS =========

# file stuff: copy cmudict, get rid of stress markers

with open("cmudict.dict",'r', encoding="utf8") as a: # first, read txt file into a list
    cmudict = a.read().splitlines()

cmuclean = []

for line in cmudict:
    newline = ""
    things = line.split()
    for i in range(len(things)):
        if (i == 0):
            newline += things[i] + " "
            continue
        
        if (things[i] != "AH0"):
            newline += re.sub(r'\d+', "", things[i])
        else:
            newline += things[i]

        if (i != len(things)-1):
            newline += " "

    cmuclean.append(newline)

            
with open("cleandict.txt",'w', encoding="utf8") as w: # first, read txt file into a list
    for line in cmuclean:
        w.write(f"{line}\n")


# shall we get matching now?

# "read" this file into a dictionary

dictClean = {}


for line in cmuclean:
    splitline = line.split()
    # key: the phonemes, value: word
    dictClean[" ".join(splitline[1:])] = splitline[0]

ERR_WORD = "WORD NOT IN TABLE"
# param: list of phonemes (in strings)
# return: word if match found, WORD NOT IN TABLE if not
def getWordFromPhonemes(phonemes):
    phonemeStr = " ".join(phonemes)
    try:
        word = dictClean.get(phonemeStr)
    except:
        print(ERR_WORD)
        return
    return word.capitalize()

print(">> " + getWordFromPhonemes(phonemeTest))

