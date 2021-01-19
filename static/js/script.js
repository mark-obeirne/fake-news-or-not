/* Global Variables */
let score;
let round;
let playerName;
let selectedStories = []

/* Element Selectors */
const gameWindow = document.querySelector(".game-panel");
const answerBtns = document.querySelectorAll(".answer-btn")


/* Functions */
// Show Intro Modal When Game Page Loads
function showGameIntroModal() {
    const gameIntroModal = document.querySelector(".game-intro-modal");
    gameIntroModal.classList.remove("hidden");
    const startGameBtn = document.querySelector(".start-game");
    startGameBtn.addEventListener("click", startGame);
    
}

// Hide Intro Modal
function hideGameIntroModal() {
    const gameIntroModal = document.querySelector(".game-intro-modal");
    gameIntroModal.classList.add("hidden");
}

// Update Score & Displayed User Score
function updateScore() {
    const scoreDisplay = document.querySelector(".user-score")
    score += 1;
    scoreDisplay.textContent = score.toString();
}

// Update Round Number & Displayed Round Number
function updateRound() {
    const gameRound = document.querySelector(".game-round")
    round += 1;
    gameRound.textContent = round.toString();
}

// Check Round Number & Handle Functions Or End Game
function newRound() {
    if (round < 10) {
        selectedStories.shift();
        updateRound();
        hideFeedbackModal();
        startRound();
    } else {
        console.log("Game ends")
    }
}

// Display Modal After Player Answers & Update Content
function showFeedbackModal(answersMatch, headline) {
    const feedbackModal = document.querySelector(".feedback-modal");
    feedbackModal.classList.remove("hidden");
    const feedbackModalHeading = document.querySelector(".feedback-modal h2");
    const feedbackModalContent = document.querySelector(".article-summary p");
    const feedbackModalLink = document.querySelector(".article-link");
    const nextButton = document.querySelector(".next-headline");
    feedbackModalContent.textContent = headline["articleExcerpt"];
    feedbackModalLink.setAttribute("href", headline["articleLink"]);

    if (answersMatch) {
        // Update Text of Modal
        
        feedbackModalHeading.innerHTML = '<i class="far fa-check-circle"></i> Correct!';
        feedbackModalHeading.classList.add("correct");
        
        nextButton.addEventListener("click", newRound)
    } else {

        feedbackModalHeading.innerHTML = '<i class="far fa-check-circle"></i> Incorrect!';
        feedbackModalHeading.classList.add("incorrect");

    }
}

// Hide Modal
function hideFeedbackModal() {
    const feedbackModalHeading = document.querySelector(".feedback-modal h2");
    const feedbackModal = document.querySelector(".feedback-modal");
    feedbackModalHeading.classList.remove("correct");
    feedbackModalHeading.classList.remove("incorrect");
    feedbackModal.classList.add("hidden");
}

// Check User Answer Against Headline Category
function checkAnswer() {
    const userAnswer = this.firstElementChild.textContent;
    const correctAnswer = startRound()
    
    if (userAnswer.trim().toLowerCase() === correctAnswer["category"].trim().toLowerCase()) {
        updateScore();
        showFeedbackModal(true, correctAnswer)
    } else {
        showFeedbackModal(false, correctAnswer)
    }
}

// Start New Round And Choose Headline
function startRound() {
    const roundQuestion = selectedStories[0]
    const headline = document.querySelector(".headline-text")
    headline.textContent = roundQuestion["headline"]
    return roundQuestion;
}
    

// Select Stories To Be Used This Game
function selectStories(collection) {
    for (let i = 0; i < 10; i++) {
        random = Math.floor(Math.random() * 3);
        selectedStories.push(collection[random]);
    }
    startRound();
}

// Get Stories From JSON File
function startGame() {
    hideGameIntroModal()
    fetch("../../headlines.json")
        .then(response => response.json())
        .then(data => selectStories(data));
}

// Show Intro Modal & Set Initial Variable Values
function initialiseGame() {
    showGameIntroModal();
    score = 0;
    round = 1;
}


/* Event Listeners */
if (gameWindow) {
    window.addEventListener("load", initialiseGame);
    answerBtns.forEach(answer => answer.addEventListener("click", checkAnswer));
}