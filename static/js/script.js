/* Global Variables */
let score = 0;
let question = 1;
let playerName;

/* Element Selectors */
const gameWindow = document.querySelector(".game-panel");


/* Functions */
function showGameIntroModal() {
    const gameIntroModal = document.querySelector(".game-intro-modal");
    gameIntroModal.classList.remove("hidden");
    const startGameBtn = document.querySelector(".start-game")
    startGameBtn.addEventListener("click", startGame)
    
}

function hideGameIntroModal() {
    const gameIntroModal = document.querySelector(".game-intro-modal");
    gameIntroModal.classList.add("hidden");
}

function startGame() {
    hideGameIntroModal()
}

function initialiseGame() {
    showGameIntroModal();
}


/* Event Listeners */
if (gameWindow) {
    window.addEventListener("load", initialiseGame)
}