// just working out the logic

/**
 * Keypresses to symbols
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

document.addEventListener('keydown', (event) => {
   const output = document.getElementById('output');
   const button = keyMaps[event.key];
   output.textContent = button ? button : 'Not valid button';
});

/**
 * First input is paired with (or not with) the second input
 * Second input can be nonexistent
 * Produces a phoneme.
 * 
*/

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
  
//  // initialize lists
//  const faceButtons = ["TRIANGLE", "SQUARE", "X", "CIRCLE"];
//  const dPad = ["UP", "LEFT", "DOWN", "RIGHT"];
//  const start = ["START"];

//  const firstInput = faceButtons + dPad + start;
 
//  const shoulderButtons = ["L2", "L1", "R1", "R2"];
 
//  const secondInput = shoulderButtons + ""; // no input = empty string???

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
