
//Random number function
function randomNumber() {
  let number = Math.random();
  return number
}

//Hat selector
let hat = document.querySelector(".hat")

//Timer
let time = document.getElementById("time")
let timeLength = 20;
let reactionSeconds = timeLength;
let reactionInterval = null;
time.innerHTML = "00:" + reactionSeconds;

function reactionTimer() {
  if (started === true) {
    reactionSeconds--
  }

  let hrs = Math.floor(reactionSeconds / 3600);
  let min = Math.floor((reactionSeconds - hrs * 3600) / 60);
  let sec = reactionSeconds % 60;

  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (hrs < 10) {
    hrs = "0" + hrs;
  }
  time.innerHTML = `${min}:${sec}`

  if (reactionSeconds === 0){
    clearInterval(reactionInterval);
    reactionInterval = null;
    gameEnd();
  }
}

function startStopwatch() {
  if (reactionInterval) {
    return
  }
  reactionInterval = setInterval(reactionTimer, 1000);
  console.log(reactionSeconds);
}

function stopStopwatch() {
  clearInterval(reactionInterval);
  reactionInterval = null;
}

function resetStopwatch() {
  stopStopwatch();
  reactionSeconds = timeLength;
  time.innerHTML = "00:" + reactionSeconds;
}

function updateDisplay() {
  reactionTimer();
}

//Custom Ball Color
document.querySelector("#ball-color").addEventListener("change", () => {

  let colorChange = document.querySelector(".target");
  colorChange.style.backgroundColor = document.querySelector("#ball-color").value;
})


// Real Hat Toggle
document.querySelector("#hat-toggle").addEventListener("click", () => {
  hat.classList.toggle("hidden");
  document.querySelector("#hat-toggle").classList.toggle("btn-selected");
});


//Fake Payment Hat Toggle 
// let paymentProcessed = false; //Checks to see if the hat payment has already gone through

// document.querySelector("#hat-toggle").addEventListener("click", () => {
//   if (paymentProcessed == true) {
//     hat.classList.toggle("hidden"); //Toggles the hat on and off once payment has been processed
//     document.querySelector("#hat-toggle").classList.toggle("btn-selected"); //Toggles the button on and off once payment has been processed
//   } else if (paymentProcessed == false) {
//     let hatPayment = prompt("Hat cost $0.99 - Please enter Credit Card to Unlock Hat"); //Prompts user to enter credit card (any 16 digits works)
//     console.log(hatPayment);
//     if (hatPayment == null || hatPayment == "") {
//       null
//     } else if (hatPayment.length == 16) { //Checks to make sure the credit card length is correct (maybe add first 4 digits match)
//       hat.classList.toggle("hidden"); //Toggles the hat on
//       document.querySelector("#hat-toggle").classList.toggle("btn-selected"); //Toggles the button on
//       paymentProcessed = true;  //Once payment is processed then it wont ask again for payment
//     }
//   }
// })

//Dark Mode Light Mode Switch (work on this making it look better / have animation)

document.querySelector(".light-dark-switch").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".click-region").classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("header-dark");
  document.querySelector(".light-dark-switch").classList.toggle("light-mode");
  document.querySelector("#dot").classList.toggle("dot-light");
  document.querySelector("#dot").classList.toggle("dot-dark");
})


let hitTarget = document.querySelector(".target");

//Adjustable screen size
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

//Default state of game
let started = false;
let round = 0;
let playerHighscore = round;
let widthX = screenHeight - 200; //- 181;
let heightY = screenWidth - 300; //- 287;

//Accuracy of clicks
let userClick = 1;
let highscore = document.querySelector(".user-highscore")

// document.querySelector(".click-region").addEventListener("click", function () {
//   userClick++
// })

function gameStart() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  widthX = screenWidth - 200;
  heightY = screenHeight - 300;
  document.querySelector(".target").classList.remove("hidden") //unhides the target
  let randomStartX = Math.floor(randomNumber() * widthX); //Randomly selects the X position
  let randomStartY = Math.floor(randomNumber() * heightY); //Randomly selects the Y position
  hitTarget.style.left = randomStartX + "px" //Moves the target into the position
  hitTarget.style.top = randomStartY + "px" //Moves the target into the position
  document.querySelector(".difficulty").classList.add("hidden") //Hides the start text
  document.querySelector(".reset").classList.remove("hidden") //Unhides the reset button
  started = true; //Assigns the value of true to the game started value so the space button does nothing again.
  round = round - 1;
  round++
  document.querySelector(".start").innerHTML = "Score " + round;
  userClick = 1;
  console.log("screenheight = " + screenHeight);
  console.log("screenwidth = " + screenWidth);
  startStopwatch();
  // accuracy.innerHTML = "Accuracy: " + userAccuracy + "%";
}

//Start The Game via Space
document.addEventListener("keyup", function (event) {
  if (started == false && reactionSeconds === timeLength) {
    if (event.code === "Space") { //Starts the game based on the Space Bar being hit
      gameStart();
    }
  }
})

//Start the game via click 
document.querySelector(".click-region").addEventListener("click", function () {
  if (started == false && reactionSeconds === timeLength) {
    gameStart();
  } 
}
)



function nextTarget() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  widthX = screenWidth - 200;
  heightY = screenHeight - 300;
  let randomX = Math.floor(randomNumber() * widthX); //Randomly selects the X position
  let randomY = Math.floor(randomNumber() * heightY); //Randomly selects the Y position
  hitTarget.classList.add("pressed"); //changes the color of the target when "hit"
  setTimeout(function () {
    hitTarget.classList.remove("pressed"); //reverts the color after 1ms
  }, 100);
  hitTarget.style.left = randomX + "px" //Moves the target into the next position
  hitTarget.style.top = randomY + "px" //Moves the target into the next position
  round++
  console.log("User Round = " + round);
  document.querySelector(".start").innerHTML = "Score " + round;
  console.log("screenheight = " + screenHeight);
  console.log("screenwidth = " + screenWidth);
}
 


//Cycles to the next positon for the target
hitTarget.addEventListener("click", function () {
  if (reactionSeconds === 0) {
    return
  } else {
    nextTarget();

  }
})

//Resets the Game
function resetGame() {
  hitTarget.classList.add("hidden") //Hides Target
  document.querySelector(".reset").classList.add("hidden") //Hides Reset Button
  document.querySelector(".start").innerHTML = "Press Space or Click in Square to Start " //Makes Start Visible Again
  document.querySelector(".difficulty").classList.remove("hidden") //Hides the start text
  started = false;
  round = 0;
  userClick = 1;
  resetStopwatch();

}

//Reset Button
document.querySelector(".reset").addEventListener("click", function () {
  resetGame();
  resetStopwatch();
})


//Difficulty buttons
document.querySelector(".easy").addEventListener("click", function () {
  hitTarget.classList.add("easy-target");
  hitTarget.classList.remove("medium-target", "hard-target");
  hat.classList.add("hat-easy");
  hat.classList.remove("hat-medium", "hat-hard");
  document.querySelector(".easy").classList.add("btn-selected");
  document.querySelector(".medium").classList.remove("btn-selected");
  document.querySelector(".hard").classList.remove("btn-selected");
  // timeLength = 11;
  // updateDisplay();

})
document.querySelector(".medium").addEventListener("click", function () {
  hitTarget.classList.remove("easy-target", "hard-target");
  hitTarget.classList.add("medium-target");
  hat.classList.add("hat-medium");
  hat.classList.remove("hat-easy", "hat-hard");
  document.querySelector(".medium").classList.add("btn-selected");
  document.querySelector(".easy").classList.remove("btn-selected");
  document.querySelector(".hard").classList.remove("btn-selected");
  // timeLength = 31;
  // updateDisplay();
})
document.querySelector(".hard").addEventListener("click", function () {
  hitTarget.classList.remove("easy-target", "medium-target");
  hitTarget.classList.add("hard-target");
  hat.classList.add("hat-hard");
  hat.classList.remove("hat-easy", "hat-medium");
  document.querySelector(".hard").classList.add("btn-selected");
  document.querySelector(".medium").classList.remove("btn-selected");
  document.querySelector(".easy").classList.remove("btn-selected");
  // timeLength = 61;
  // updateDisplay();
})

function gameEnd() {
  stopStopwatch();
  hitTarget.classList.add("hidden") //Hides Target
  // highscore.innerText = "High Score: " + round;
  highscore.innerText = "High Score: coming soon..."
  document.querySelector(".start").innerHTML = "Press Space or Click in Square to Start " //Makes Start Visible Again
  time.innerHTML = "Final Score is: " + round;
}





// let offset = 0;

// let paused = true;

// render();

// function startStopwatch() {
//   if (paused) {
//     paused = false;
//     offset -= Date.now();
//     render();
//   }
// }

// function stopStopwatch() {
//   if (!paused) {
//     paused = true;
//     offset += Date.now();
//   }
// }

// function resetStopwatch() {
//   if (paused) {
//     offset = 0;
//     render();
//   } else {
//     offset = -Date.now();
//   }
// }

// function format(value, scale, modulo, padding) {
//   value = Math.floor(value / scale) % modulo;
//   return value.toString().padStart(padding, 0);
// }

// function render() {
//   let value = paused ? offset : Date.now() + offset;

//   document.querySelector('#ms').textContent = format(value, 1, 1000, 3);
//   document.querySelector('#sec').textContent = format(value, 1000, 60, 2);
//   document.querySelector('#min').textContent = format(value, 60000, 60, 2);

//   if (!paused) {
//     requestAnimationFrame(render);
//   }
// }




/* 
To do:
Add timer (rework it to my own code)
Store timer and display
FIX ACCURACY!!!
Change ending screen to have to press start to restart the game (remove the alert bc those are annoying)
Add custom rounds = 10 - 20 - 30 rounds
*/