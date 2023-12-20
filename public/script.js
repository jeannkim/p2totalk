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
const secondInputs = new Set(['L1', 'L2', 'R1', 'R2']);
// in strings and not arrays because JS compares arrays by ref
const invalidPairs = new Set([
   'Square,R1', 
   'Circle,L1', 
   'Circle', 
   'Left,R1',
   'Right,L2'
]);

/**
 * Map pairs to phonemes (in ARPABET)
 * Using Table.png
 */
const arpaMaps = {
   'X,R2': 'UW',
   'X,R1': 'EY',
   'X,L2': 'M',
   'X,L1': 'S',
   'X': 'AA', // we'll see
   'Square,R2': 'P',
   'Square,L2': 'N',
   'Square,L1': 'Z',
   'Square': 'AE', // dupe with down
   'Circle,R2': 'T',
   'Circle,R1': 'IY',
   'Circle,L2': 'R',
   'Triangle,R2': 'B',
   'Triangle,R1': 'IH',
   'Triangle,L2': 'L' ,
   'Triangle,L1': 'SH',
   'Triangle': 'A0', // we'll see
   'Left,R2': 'TH',
   'Left,L2': 'AH',
   'Left,L1': 'NG',
   'Left': 'EH', // no e
   'Right,R2': 'DH',
   'Right,R1': 'UH',
   'Right,L1': 'G',
   'Right': 'ER',
   'Up,R2': 'F',
   'Up,R1': 'OW',
   'Up,L2': 'Y',
   'Up,L1': 'JH',
   'Up': 'AY',
   'Down,R2': 'V',
   'Down,L2': 'HH',
   'Down,L1': 'K',
   'Down': 'AE', // dup with square
   'Start,R2': 'D',
   'Start,L2': 'W',
   'Start,L1': 'CH',
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

   // second input: just add button as second value
   if (currButton != 'INVALID'){
      if (secondInputs.has(currButton)){
         // can only add as second input
         if (currButtonPair.length == 1){
            currButtonPair.push(currButton);
         }
      }
      else { // first input
         // if there is anything in the curr pair, flush it
         if (currButtonPair.length > 0){
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
         // add to pair
         currButtonPair.push(currButton); // add curr
      }
   }
});
