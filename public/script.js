

function addMessage(message) {
   var chatbox = document.getElementById("chatbox");
   var newMessage = document.createElement("div");

   // Apply moveUp class to each existing message
   var existingMessages = chatbox.getElementsByClassName("message");
   for (var i = 0; i < existingMessages.length; i++) {
       existingMessages[i].classList.add("moveUp");
       existingMessages[i].style.transform = `translateY(-${newMessage.offsetHeight}px)`;
   }

   newMessage.classList.add("message");
   newMessage.innerText = message;
   chatbox.prepend(newMessage); // Adds the new message at the top

   // Remove the moveUp class after the animation
   setTimeout(function() {
       for (var i = 0; i < existingMessages.length; i++) {
           existingMessages[i].classList.remove("moveUp");
           existingMessages[i].style.transform = 'translateY(0)';
       }
   }, 500); // 500ms matches the CSS animation duration

   // Fade out the new message after a specific time
   setTimeout(() => {
      newMessage.style.animation = 'fadeOut 3s forwards';

      // Remove the message from the DOM after the fade-out animation
      setTimeout(() => {
          chatbox.removeChild(newMessage);
      }, 3000); // 1 second for the fade-out animation
  }, 1500); 
}



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
var inputs = [];  // button inputs pressed

// sounds
const soundPath = 'assets/sounds/';
var connectSound = new Audio(soundPath + 'Connect.mp3');


// parse the array of  (valid) inputs
// param: array of inputs
// return: array of equivalent phonemes OR empty array (error; Not In Table)
function inputsToPhonemes(inputs) {
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
      // this is a prefix
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



document.addEventListener('keydown', (event) => {


   let keypressDisplay = document.getElementById('keypress');
   let allPressesDisplay = document.getElementById('allpresses');
   let buttonDisplay = document.getElementById('buttons');

   if (event.key == ' ') { // submit phonemes
   
      event.preventDefault(); // prevent scrolling

      if (inputs.length > 0){
         allPressesDisplay.textContent = allPressesDisplay.textContent + ' |';

         // play sound
         var talkSound = new Audio(soundPath + 'Talk-Player.mp3');
         talkSound.play();
   
         // translate the inputs
         let inputPhonemes = inputsToPhonemes(inputs);
         console.log(inputPhonemes);
         
         if (inputPhonemes.length < 1){
            addMessage('Not In Table');
         }
         else {
            // translate the phonemes
            fetch('/get-word', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                  phonemes: inputPhonemes.join(' ')
               })
            })
            .then(response => response.json())
            .then(data => {   // word got; or "Not In Table"
                  console.log(data);
                  let formattedWord = data.translation.charAt(0).toUpperCase() 
                     + data.translation.slice(1);
                  addMessage(formattedWord);
      
            })
            .catch(error => {
                  console.error('Error:', error);
            });
         }
         // clear buttons
         buttonDisplay.innerHTML = '';
         inputs = [];   // reset inputs   
      }

   }
   else {
      let button = keyMaps[event.key];
      // get button press, output button presses
      let currButton = button ? button : 'INVALID';
   
      keypressDisplay.textContent = currButton;
      allPressesDisplay.textContent = allPressesDisplay.textContent + ' ' + currButton;
   
      if (currButton != 'INVALID'){
         // add to inputs
         inputs.push(currButton);

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
      }
   }
   
});


