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

# test this shit

# FUN TIME: do the map from CL
# first and second inputs stored inside map
#(first, second) = map(str, input("Enter 2 inputs with space: ").split())

#print(bigDict.get((first,second)))

#there has to be a nicer way to structure this but whatever


# parsing it as it happens
# want input: LEFT LEFT L2 -> e ʌ

talk = input("Enter string of inputs, spaces in between: ")
queue = []
decodedStr = ""

for i in range(len(talk.split())):
    neme = talk.split()[i]

    if neme in firstInput:
        # if the key is a first input, empty the queue
        # and decode whatever was in it to output
        match len(queue):
            case 0:
                queue.append(neme)
                continue
            case 1:
                queue.append("")    # append the empty string
            
        # convert the tuple to output
        tup = tuple(queue)

        print(tup)
        decodedStr += bigDict.get(tup)

        queue = []
    

        
    queue.append(neme)

    # this queue should never have more than two elems at a time

print(decodedStr)