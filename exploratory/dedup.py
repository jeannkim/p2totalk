# remove all duplicates- pronunciations from cmudict

# read in cleandict.txt
# sort cleandict by phoneme (how)

# maybe read in and flip keys-values
from collections import defaultdict



with open("cleandict.txt",'r', encoding="utf8") as a: # first, read txt file into a list
        lines = a.read().splitlines()

#flipdict = {}
flipdict = defaultdict(list)

for line in lines:
    splitline = line.split()
    # key: the phonemes, value: word
    word = splitline[0]
    phonemes = " ".join(splitline[1:])
    prevwords = flipdict.get(phonemes)

    # phonemes exist
    if prevwords:
        #flipdict[phonemes] = flipdict[phonemes].append(splitline[0])
        flipdict[phonemes].append(splitline[0])

    # new 
    else:
        # newarr = []
        # newarr.append(splitline[0])
        # flipdict[phonemes] = newarr
        flipdict[phonemes].append(splitline[0])



# print(flipdict['AA1 K AH0 N'])
# print(len(flipdict))
print(flipdict)

# brurhhrhurh