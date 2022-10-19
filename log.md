10/16/22
> i am in turmoil. may Petscop anchor me to the earth

rough process:
- translate keypresses to Button presses (webstuff; later)
- translate button press combinations into phonemes 
- translate phoneme combinations into words

**step 2: the button presses to the phonemes**

define variables for different button presses
- booleans? can edit later
- [keydown](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
- [more keydown with js](https://www.youtube.com/watch?v=InKP-eRx6ts)


- i should just make a file on my local computer that deals with this


How do I map two-ish inputs to an equivalent phoneme?


rethink this logic here

LEFT LEFT L2
- so if you have LEFT LEFT LEFT it's three things
- if you reach a firstinput then the previous thig




end this logical mess

This implementation: some weird 2 queue thing
- too many weird cases (first and last element)

LEFT LEFT L2
^
1. first thing; store in queue [LEFT]
    - can ignore the firstInput case because there'll be nothing in the queue anyway

LEFT LEFT L2
     ^
2. see firstInput
    - return queue process
        > if theres only one thing in the queue, add ""
        > there shouldn't be nothing in the queue
        > there should be either 1 or 2 things
        > convert to thing
    - add the thing to the queue

LEFT LEFT L2
          ^
3. 


could just do a hilarious meme i+1 thing

LEFT LEFT 
LEFT L2
LEFT LEFT L2
LEFT L2 LEFT L2

for loop from first - last element
if i is a firstInput:
    if i is the last element OR i+1 is firstInput, return (i, "")
    else, return (i, i+1)
else:
    skip

> god if this works i will convert to judaism
> i am converting to judaism

- NOT IN TABLE does not work lmao
.....
logic

NOT IN TABLE
- second input cannot be the first neme
- two second inputs cannot follow each other
- there are some combinations of first + seconds that are literally not in the table
    - will return ""

done.

**step 3: phonemes to words**

Using [CMU pronouncing dictionary](https://en.wikipedia.org/wiki/CMU_Pronouncing_Dictionary)!

