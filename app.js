


//Gameplay Mechanics

const target = document.getElementById("target");

//px width of target to avoid collision (CHANGES UPON CHALLENGE)
let targetSize = target.offsetHeight;
let targetBuffer = targetSize + (targetSize * 0.1);

const clickRegion = document.getElementById("click-region");
const playerScoreDisplay = document.getElementById("user-score")
const instructionMobile = document.getElementById("mobile-instructions");
const instructionDesktop = document.getElementById("desktop-instructions");


//Calculate the bounds of play
function areaCalculation() {

    let playArea = clickRegion.getBoundingClientRect();
    let playAreaHeight = playArea.height - targetBuffer;
    let playAreaWidth = playArea.width - targetBuffer;

    return [playAreaHeight, playAreaWidth];
}

//Default State of Game

let gameStarted = false;
let playerScore = 0;
let playerHighscore = null; //FIX LATER!!!

//Game timer

const gameTimerDisplay = document.getElementById("time");
let timeLength = 15; //Seconds
let gameSeconds = timeLength;
let gameInterval = null;
time.innerHTML = gameSeconds;



function gameTimer() {

    if (gameStarted === true) {
        gameSeconds--
    }

    let sec = gameSeconds % 60;

    if (sec < 10) {
        sec = sec;
    }


    time.innerHTML = `${sec}`

    if (sec == 0 && gameSeconds > 0) {
        time.innerHTML = "6" + `${sec}`
    }

    if (gameSeconds === 0) {
        clearInterval(gameInterval);
        gameInterval = null;
        gameOver();
    }
}

//Timer Controls

function startTimer() {
    if (gameInterval) {
        return
    }
    gameInterval = setInterval(gameTimer, 1000);
}

function stopTimer() {
    clearInterval(gameInterval);
    gameInterval = null;
}

function resetTimer() {
    stopTimer();
    gameSeconds = timeLength;
    time.innerHTML = gameSeconds;
}

function updateDisplay() {
    if (timeLength === 60) {
        time.innerHTML = "60"
    }
    gameTimer();
}

//Play, Stop, and Reset game

function startGame() {

    gameStarted = true;

    let playAreaStart = areaCalculation();
    let randomStartingHeight = Math.floor(Math.random() * playAreaStart[0]);
    let randomStartingWidth = Math.floor(Math.random() * playAreaStart[1]);


    instructionMobile.classList.add("hidden");
    instructionDesktop.classList.add("hidden");

    target.classList.remove("target-hide");
    target.style.top = randomStartingHeight + "px";
    target.style.left = randomStartingWidth + "px";

    easyMode.classList.add("hidden");
    mediumMode.classList.add("hidden");
    hardMode.classList.add("hidden");
    resetButton.classList.remove("hidden");


    playerScore = playerScore - 1;
    playerScore++
    playerScoreDisplay.innerHTML = "Score: " + playerScore;

    startTimer();
}


function nextTarget() {
    if (audioOn === true) {
        targetSound.play();
    }
    let playAreaNext = areaCalculation();
    let randomNextHeight = Math.floor(Math.random() * playAreaNext[0]);
    let randomNextWidth = Math.floor(Math.random() * playAreaNext[1]);

    target.style.top = randomNextHeight + "px";
    target.style.left = randomNextWidth + "px";

    playerScore++
    playerScoreDisplay.innerText = "Score: " + playerScore;
}



function resetGame() {

    instructionMobile.classList.remove("hidden");
    instructionDesktop.classList.remove("hidden");
    target.classList.add("target-hide");

    easyMode.classList.remove("hidden");
    mediumMode.classList.remove("hidden");
    hardMode.classList.remove("hidden");
    resetButton.classList.add("hidden");

    gameStarted = false;
    playerScore = 0;

    resetTimer();
}

function gameOver() {
    stopTimer();

    target.classList.add("target-hide");

}

//Game Controllers
//Starts the game via Space Bar (PC only)
document.addEventListener("keyup", function (event) {
    if (gameStarted == false && gameSeconds === timeLength) {
        if (event.code === "Space") {
            startGame();
        }
    }
})
//Starts the game via mouse click WITHIN clickRegion (Mobile & PC)
clickRegion.addEventListener("click", function () {
    if (gameStarted == false && gameSeconds === timeLength) {
        startGame();
    }
})

//Cycles the game to the next target
target.addEventListener("click", function () {
    if (gameSeconds === 0) {
        return
    } else {
        nextTarget();
    }
})

// Difficulty Buttons

const easyMode = document.getElementById("easy");
const mediumMode = document.getElementById("medium");
const hardMode = document.getElementById("hard");
const resetButton = document.getElementById("reset")

easyMode.addEventListener("click", function () {
    target.style.width = "50px"
    target.style.height = "50px"
    easyMode.classList.add("btn-selected");
    mediumMode.classList.remove("btn-selected");
    hardMode.classList.remove("btn-selected");
    timeLength = timeLength * 0;
    timeLength = timeLength + 15;
    gameSeconds = timeLength;
    updateDisplay();
});

mediumMode.addEventListener("click", function () {
    target.style.width = "35px"
    target.style.height = "35px"
    easyMode.classList.remove("btn-selected");
    mediumMode.classList.add("btn-selected");
    hardMode.classList.remove("btn-selected");
    timeLength = timeLength * 0;
    timeLength = timeLength + 30;
    gameSeconds = timeLength;
    updateDisplay();
});

hardMode.addEventListener("click", function () {
    target.style.width = "20px"
    target.style.height = "20px"
    easyMode.classList.remove("btn-selected");
    mediumMode.classList.remove("btn-selected");
    hardMode.classList.add("btn-selected");
    timeLength = timeLength * 0;
    timeLength = timeLength + 60;
    gameSeconds = timeLength;

    updateDisplay();
});

resetButton.addEventListener("click", function () {
    resetGame();
})

// Top-Bar-Settings

//Ball Color
const targetColor = document.getElementById("target-color")

targetColor.addEventListener("change", function () {

    target.style.backgroundColor = targetColor.value;
})

//Dark Mode (WIP)
// const darkModeToggle = document.getElementById("light-dark-switch")

// darkModeToggle.addEventListener("click", function () {
//     document.querySelector("body").classList.toggle("dark-mode-body");
//     document.querySelector(".top-nav").classList.toggle("dark-mode-header")

// })


//Audio
let audioOn = true;
const audioButton = document.getElementById("volume")
const audioIcon = document.getElementById("volume-icon")
const targetSound = new Audio("Beep.wav")

function audioToggle() {
    if (audioOn !== false) {
        audioOn = false;
        audioIcon.src = "images/volume-off.svg"
    } else {
        audioOn = true;
        audioIcon.src = "images/volume-high.svg"
    }
}

audioButton.addEventListener("click", audioToggle)



