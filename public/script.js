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


document.addEventListener('keydown', (event) => {
   let output = document.getElementById('keypress');
   let allPresses = document.getElementById('allpresses');
   let allPairs = document.getElementById('allpairs');
   let button = keyMaps[event.key];
   
   // get button press, output button presses
   let currButton = button ? button : 'INVALID';
   output.textContent = currButton;
   allPresses.textContent = allPresses.textContent + ' ' + currButton;

   // second input: just add button as second value
   if (currButton != 'INVALID'){
      if (prefixes.has(currButton)){
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
               // *just for printing
               currButtonPair.forEach(function(button) {
                  allPairs.textContent = allPairs.textContent + ' ' + button;
               });
               allPairs.textContent = allPairs.textContent + ' / ';
            }
            // empty the array
            currButtonPair = [];
         }
         // add to pair
         currButtonPair.push(currButton); // add curr
      }
   }
});

/**
 * build the table of combinations (translate each combination to corresponding phoneme)
 * Second, figure out how to look up these phonemes in a table
 * Third, translate the phoneme combinations into words using some kind of dictionary
 */

/**
 * Build the table of combinations
 * https://www.geeksforgeeks.org/python-program-to-get-all-unique-combinations-of-two-lists/
 */

//  import { permutations } from 'itertools';
  

//  console.log(firstInput);
  
//  // create empty (variable) list to store the combinations
//  var unique_combinations = [];
  
//  // Getting all permutations of list_1
// // with length of list_2
//  var permut = itertools.permutations(firstInput, len(secondInput));
  
//  // zip() is called to pair each permutation
//  // and shorter list element into combination
//  for (comb in permut){
//     zipped = zip(comb, list_2);
//     unique_combinations.push(list(zipped));
//  }
     
  
//  console.log(unique_combinations);
