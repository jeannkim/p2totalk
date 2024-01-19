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
   'v': 'R2',
}

const disabledKeys = new Set([
   'Enter', 
   'ArrowUp', 
   'ArrowLeft',
   'ArrowDown',
   'ArrowRight',
]);

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
   'L2,Right',
   'R1,Down',
   'R1,Start',
   ''
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

// sounds
const soundPath = 'assets/sounds/';
var connectSound = new Audio(soundPath + 'Connect.mp3');


// parse the array of (valid) inputs
// param: array of inputs
// return: array of equivalent phonemes OR empty array (error; Not In Table)
function inputsToPhonemes(inputs) {
   
   // how does this damn thing look like
   // ex. 'R2' -> []
   // ex. ['R2,' 'Square'] -> ['P'] 
   // ex. ['R1', 'Square'] -> []
   // ex. ['R2', 'Square', 'R1', 'Circle'] -> ['P','IY']

   // if it is in prefixes, you must look for another thing after. 
   // if there is no next thing, if the next thing is a prefix, or if the pair is invalid, []
   
   // if not a prefix, move on

   var thePhonemes = [];

   if (inputs.length < 1) {
      console.log("empty inputs submitted");
      return [];
   }
   
   var inputHandled = false;   // if current input has been translated already 

   for (let i = 0; i < inputs.length; i++) {

      if (inputHandled){
         inputHandled = false;   // reset; lol this is like a lock
         continue;   // skip to next iteration
      }

      let currInput = inputs[i];

      // this is prefix
      if (prefixes.has(currInput)){
         // invalid; prefix is last input
         if (i == inputs.length-1){
            console.log("last input was prefix");
            return [];
         }
         let nextInput = inputs[i+1];
         let currPair = currInput + ',' + nextInput;
         // invalid; two prefixes or invalid pair
         if (prefixes.has(nextInput) || invalidPairs.has(currPair)){
            console.log("prefix after prefix or invalid pair");
            return [];
         }
         // valid pair
         // translate it to phoneme, push to return
         thePhonemes.push(arpaMaps[currPair]);
         inputHandled = true;    // skip next input
      }
      else {  // this is a lone root
         if (invalidPairs.has(currInput)){
            console.log("invalid lone root");
            return [];
         }
         // valid lone root
         // translate it to phoneme, push to return
         thePhonemes.push(arpaMaps[currInput]);
      }
   }
   return thePhonemes;  // successful translation
}

// how does this damn thing look like
// ex. 'R2' -> []
// ex. ['R2,' 'Square'] -> ['P'] 
// ex. ['R1', 'Square'] -> []
// ex. ['R2', 'Square', 'R1', 'Circle'] -> ['P','IY']

console.log(inputsToPhonemes(['R2','Square'])); // ['P']
console.log(inputsToPhonemes(['R2','Square','R1','Circle'])); // ['P','IY']
console.log(inputsToPhonemes(['Square','R2','Square'])); // AE P
console.log(inputsToPhonemes(['Square','R2','Square','Triangle'])); // AE P A0
console.log(inputsToPhonemes(['Square','Triangle','R2','Square'])); // AE A0 P

// errors
console.log(inputsToPhonemes(['R2']));
console.log(inputsToPhonemes(['R1','Square']));
console.log(inputsToPhonemes(['Circle']));
console.log(inputsToPhonemes(['Square','R1','Circle','R1']));



document.addEventListener('keydown', (event) => {

   let output = document.getElementById('keypress');
   let allPresses = document.getElementById('allpresses');
   let allPairs = document.getElementById('allpairs');
   let phonemes = document.getElementById('phonemes');
   
   let wordDisplay = document.getElementById('word');
   let buttonDisplay = document.getElementById('buttons');

   if (event.key == ' ') { // submit phonemes
      console.log('currButtonPair: ', currButtonPair);
      event.preventDefault(); // prevent scrolling

      // play sound
      var talkSound = new Audio(soundPath + 'Talk-Player.mp3');
      talkSound.play();

      // flush current buffer if there is anything
      if (currButtonPair.length != 0 &&!invalidPairs.has(currButtonPair.toString())){
         // // save previous pair
         allButtonPairs.push(currButtonPair);
         // *below: just for printing
         currButtonPair.forEach(function(button) {
            allPairs.textContent = allPairs.textContent + ' ' + button;
         });
         allPhonemes.push(arpaMaps[currButtonPair]);
         allPairs.textContent = allPairs.textContent + ' / ';
         phonemes.textContent = phonemes.textContent + ' ' + arpaMaps[currButtonPair];         
      }
      currButtonPair = [];
      console.log('allPhonemes: ', allPhonemes);
      // translate the phonemes
      fetch('/get-word', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             phonemes: allPhonemes.join(' ')
         })
      })
      .then(response => response.json())
      .then(data => {   // word got; or "Not In Table"
            console.log(data);
            let formattedWord = data.translation.charAt(0).toUpperCase() 
               + data.translation.slice(1);
            // fade in
            wordDisplay.classList.remove('fade');
            wordDisplay.textContent = formattedWord;
            // fade out after 3 secs
            setTimeout(() => {
               wordDisplay.classList.add('fade');
           }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch(error => {
            console.error('Error:', error);
      });
      // flush allPhonemes
      allPhonemes = [];
      // clear buttons
      buttonDisplay.innerHTML = '';
   }
   else {
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
         // play sound
         var buttonSound = new Audio(soundPath + 'Button.mp3');
         buttonSound.play();

         // display current button
         let currButtonSpritePath = 'assets/sprites/PS-'+ currButton + '.png';
         console.log(currButtonSpritePath);

         // disable default if key that scrolls
         if (disabledKeys.has(event.key)){
            event.preventDefault(); // prevent scrolling
         }

         buttonDisplay.innerHTML = buttonDisplay.innerHTML + 
            '<img src=\"' + currButtonSpritePath + '\" class=\"buttonSprite\">';

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
   }
   
});


