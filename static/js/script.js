/* Global Variables */
let score;
let question;
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

function selectStories(collection) {
    let selected = []
    for (let i = 0; i < 10; i++) {
        random = Math.floor(Math.random() * 5)
        selected.push(collection[random])
    }
}

function startGame() {
    hideGameIntroModal()
    
    fetch("../../headlines.json")
        .then(response => response.json())
        .then(data => selectStories(data));


}

function initialiseGame() {
    showGameIntroModal();
    score = 0;
    question = 1;
}


/* Event Listeners */
if (gameWindow) {
    window.addEventListener("load", initialiseGame)
}