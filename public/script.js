/**
 * Keypresses to buttons
 *
 * Keybinds: same as Giftscop
 * 
 * Buttons:
 * 
 * First input: 
 * 
 * Triangle (Up)
 * Square (Left)
 * X (Down)
 * Circle (Right)
 * 
 * Up (W)
 * Left (A)
 * Down (S)
 * Right (D)
 * 
 * Start (Enter)
 * 
 * Second input (optional): 
 * 
 * L2 (Z)
 * L1 (X)
 * R1 (C)
 * R2 (v)
 * 
 */

const keyMaps = {
   'Enter': 'Start',
   'ArrowUp': 'Triangle',
   'ArrowLeft': 'Square',
   'ArrowDown': 'X',
   'ArrowRight': 'Circle',
   'w': 'Up',
   'a': 'Left',
   's': 'Down',
   'd': 'Right',
   'z': 'L2',
   'x': 'L1',
   'c': 'R1',
   'v': 'R2'
}


/**
 * Split by button press combinations
 * First inputs: everything but L-R buttons
 * Second inputs: L1, L2, R1, R2, or nothing
 * Ex. (Triangle L1) (Square) (Circle R2)
 * 
 * currButtonPair: phoneme button input (length 1 or 2)
 * allButtonPairs: list of all phoneme combinations
 * secondInputs: const set of all second inputs
 * invalidPairs: pairs there are no phonemes for
 * 
*/
var currButtonPair = [];
var allButtonPairs = [];
const prefixes = new Set(['L1', 'L2', 'R1', 'R2']);
// in strings and not arrays because JS compares arrays by ref
const invalidPairs = new Set([
   'R1,Square', 
   'L1,Circle', 
   'Circle', 
   'R1,Left',
   'L2,Right'
]);

/**
 * Map pairs to phonemes (in ARPABET)
 * Using Table.png
 */
const arpaMaps = {
   'R2,X': 'UW',
   'R1,X': 'EY',
   'L2,X': 'M',
   'L1,X': 'S',
   'X': 'AA', // we'll see
   'R2,Square': 'P',
   'L2,Square': 'N',
   'L1,Square': 'Z',
   'Square': 'AE', // dupe with down
   'R2,Circle': 'T',
   'R1,Circle': 'IY',
   'L2,Circle': 'R',
   'R2,Triangle': 'B',
   'R1,Triangle': 'IH',
   'L2,Triangle': 'L' ,
   'L1,Triangle': 'SH',
   'Triangle': 'A0', // we'll see
   'R2,Left': 'TH',
   'L2,Left': 'AH',
   'L1,Left': 'NG',
   'Left': 'EH', // no e
   'R2,Right': 'DH',
   'R1,Right': 'UH',
   'L1,Right': 'G',
   'Right': 'ER',
   'R2,Up': 'F',
   'R1,Up': 'OW',
   'L2,Up': 'Y',
   'L1,Up': 'JH',
   'Up': 'AY',
   'R2,Down': 'V',
   'L2,Down': 'HH',
   'L1,Down': 'K',
   'Down': 'AE', // dup with square
   'R2,Start': 'D',
   'L2,Start': 'W',
   'L1,Start': 'CH',
   'Start': 'AH0' // what was the funny about this? AX0?
}
// store all phonemes inputted
var allPhonemes = [];


document.addEventListener('keydown', (event) => {
   let output = document.getElementById('keypress');
   let allPresses = document.getElementById('allpresses');
   let allPairs = document.getElementById('allpairs');
   let phonemes = document.getElementById('phonemes');

   let button = keyMaps[event.key];
   
   // get button press, output button presses
   let currButton = button ? button : 'INVALID';
   output.textContent = currButton;
   allPresses.textContent = allPresses.textContent + ' ' + currButton;

   // prefix: add as first value of cBP
   // root: if cBP empty add it and that is over

   //    check how many things cBP has in it
   //    if nothing, add current press
   //    if 1, check if cBP[0] is in prefixes
   //          if it's a prefix, only add roots. for another prefix, flush
   //          if it's a root, flush
   //    if 2, flush

   if (currButton != 'INVALID'){
      if (currButtonPair.length == 0){
         currButtonPair.push(currButton);
      }
      else {
         // flush the buffer
         // flush case (make sure pair is valid):
         //    1 thing in pair, thing is root
         //    2 things in pair
         if ((currButtonPair.length == 1 && !prefixes.has(currButtonPair[0])
         || currButtonPair.length > 1) && !invalidPairs.has(currButtonPair)){
            // check if the curr pair is valid
            console.log(currButtonPair.toString());
            console.log(!invalidPairs.has(currButtonPair.toString()));
            if (!invalidPairs.has(currButtonPair.toString())){
               // save previous pair
               allButtonPairs.push(currButtonPair);
               // *below: just for printing
               currButtonPair.forEach(function(button) {
                  allPairs.textContent = allPairs.textContent + ' ' + button;
               });
               allPhonemes.push(arpaMaps[currButtonPair]);
               allPairs.textContent = allPairs.textContent + ' / ';
               phonemes.textContent = phonemes.textContent + ' ' + arpaMaps[currButtonPair];
            }
            // empty the array
            currButtonPair = [];
         }
         // adding to pair
         // don't add a prefix if there is currently a prefix 
         if (!(currButtonPair.length == 1 && prefixes.has(currButton))){
            currButtonPair.push(currButton); // add curr
         }
      }
   }
   
});
