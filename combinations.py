# import itertools package
import itertools
from itertools import permutations
 
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
phonemes = ["u", "eɪ", "m", "s", "ɒ",
    "p", "", "n", "z", "æ",
    "t", "i", "r", "", "",
    "b", "I", "l", "ʃ", "ɔ",
    "θ", "", "ʌ", "ŋ", "e",
    "ð", "ʊ", "", "g", "ɚ",
    "f", "əʊ", "j", "dʒ", "aɪ",
    "v", "", "h", "k", "a",
    "d", "", "w", "ʈʃ", "ə"]

# should correspond one to one with the combos up there

bigDict = {}

# fill the dict. key is combo, value is phoneme
for i in range(len(combos)):
    bigDict[combos[i]] = phonemes[i]

#print(bigDict)


# FUN TIME: do the map from CL
# first and second inputs stored inside map
#(first, second) = map(str, input("Enter 2 inputs with space: ").split())

#print(bigDict.get((first,second)))

# parsing it as it happens
# want input: LEFT LEFT L2 -> e ʌ

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
                phoneme = bigDict.get(tup)
            except:
                print("NOT IN TABLE")
                return
        
            # corresponding phoneme is "" in table
            if len(phoneme) < 1:
                print("NOT IN TABLE")
                return
            
            # add phoneme to printed string
            decodedStr += bigDict.get(tup)
        
        # secondInput
        else:
            # first input cannot be a secondInput
            if (i == 0):
                print("NOT IN TABLE")
                return
            # two second inputs cannot be consecutive
            if (i < len(inps)-1):
                if (inps[i+1] not in firstInput):
                    print("NOT IN TABLE")
                    return
            continue     
    
    print(decodedStr)
    return


talk = input("Enter string of inputs, spaces in between: ")
getPhonemes(talk)
