# remove all duplicates- pronunciations from cmudict

# read in cleandict.txt
# sort cleandict by phoneme (how)

# maybe read in and flip keys-values

with open("cleandict.txt",'r', encoding="utf8") as a: # first, read txt file into a list
        lines = a.read().splitlines()

flipdict = {}

for line in lines:
    splitline = line.split()
    # key: the phonemes, value: word
    word = splitline[0]
    phonemes = " ".join(splitline[1:])
    prevwords = flipdict.get(phonemes)

    if prevwords:
        flipdict[phonemes] = flipdict[phonemes].append(splitline[0])
    else:
        newarr = []
        newarr.append(splitline[0])
        flipdict[phonemes] = newarr


print(flipdict['AA1 K AH0 N'])