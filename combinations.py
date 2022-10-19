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

firstInput = faceButtons + dPad + start

shoulderButtons = ["R2", "R1", "L2", "L1"]
 
secondInput = shoulderButtons + [""] # no input = empty string ??


combos = list(itertools.product(firstInput, secondInput))

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

arpaipa = {"ɑ": "AA", "æ":"AE", "ə": "AH0", 
    "ʌ": "AH", "ɔ": "AW", "aɪ": "AY", "ɛ": "EH", 
    "ɚ": "ER", "eɪ": "EY", "ɪ": "IH", "i": "IY", 
    "oʊ": "OW", "ɔɪ": "OY", "ʊ": "UH", "u": "UW",
    "b": "B", "tʃ": "CH", "d": "D", "ð": "DH",
    "f": "F", "g": "G", "h": "HH", "dʒ": "JH",
    "k": "K", "l": "L", "m": "M", "n": "N",
    "ŋ": "NG", "p": "P", "r": "R", "s": "S",
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
    # split string (by " ") into arr of inputs
    inps = inputString.split()
    
    # iterate through individual inputs
    for i in range(len(inps)):

        #print(inps[i])     # current input 
    
        # input is a first input; phoneme found
        if (inps[i] in firstInput):            
            pair = []  # pair of inputs to convert

            # if inp is last element or the element after it is firstInput
            if (i == (len(inps)-1)) or (inps[i+1] in firstInput):
                # lone first input found
                pair = [inps[i], ""]
            
            else:
                # first and second input found
                pair = [inps[i], inps[i+1]]
            
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
            decodedStr += biggerDict.get(tup) + " "
        
        # secondInput
        else:
            # first input cannot be a secondInput
            if (i == 0):
                print(ERR_MSG)
                return
            # two second inputs cannot be consecutive
            if (i < len(inps)-1):
                if (inps[i+1] not in firstInput):
                    print(ERR_MSG)
                    return
            continue     
    
    print(decodedStr)
    return


# talk = input("Enter string of inputs, spaces in between: ")
# getPhonemes(talk)



# ======== PHONEMES TO WORDS =========

# file stuff: copy cmudict, get rid of stress markers

with open("cmudict.dict",'r', encoding="utf8") as a: # first, read txt file into a list
    cmudict = a.read().splitlines()

dictClean = []

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

    dictClean.append(newline)

            
with open("cleandict.txt",'w', encoding="utf8") as w: # first, read txt file into a list
    for line in dictClean:
        w.write(f"{line}\n")


