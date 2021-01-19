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
    const startGameBtn = document.querySelector(".start-game");
    startGameBtn.addEventListener("click", startGame);
    
}

function hideGameIntroModal() {
    const gameIntroModal = document.querySelector(".game-intro-modal");
    gameIntroModal.classList.add("hidden");
}



function showHeadline(listOfStories) {
    const feedbackModal = document.querySelector(".feedback-modal");
    console.log(listOfStories);
    const headline = document.querySelector(".headline-text")
    const answerBtns = document.querySelectorAll(".answer-btn")
    roundQuestion = listOfStories[0]
    headline.textContent = roundQuestion["headline"]
    
    // Possibly under a different function - new round
    listOfStories.shift();

        // Check user answer against headline's answer
    answerBtns.forEach(answer => answer.addEventListener("click", function() {
        if (answer.textContent.trim().toLowerCase() === roundQuestion["category"].trim().toLowerCase()) {
            console.log("Success!");
            score += 1;
            console.log("Score: " + score);
            // Show Modal
            const feedbackModal = document.querySelector(".feedback-modal");
            feedbackModal.classList.remove("hidden");
            // Update Text of Modal
            const feedbackModalHeading = document.querySelector(".feedback-modal h2");
            const feedbackModalContent = document.querySelector(".article-summary p");
            const feedbackModalLink = document.querySelector(".article-link");
            const nextButton = document.querySelector(".next-headline")
            feedbackModalHeading.innerHTML = '<i class="far fa-check-circle"></i> Correct!';
            feedbackModalHeading.classList.add("correct");
            feedbackModalContent.textContent = roundQuestion["articleExcerpt"];
            feedbackModalLink.setAttribute("href", roundQuestion["articleLink"]);

            // Need to check question number
            // Start new round - update question/round number, update score, hide feedback modal
            // Generate new headline - i.e. run showHeadline function again
            // Keeping it within this function is causing issues where function fires multiple times
            /*  
            nextButton.addEventListener("click", function() {
                feedbackModal.classList.add("hidden");
                showHeadline(listOfStories);

            }) */
            
            /* if (question < 10) {
                nextButton.addEventListener("click", showHeadline(listOfStories));
            } */
        } else {
            console.log("Ooops!")
            // Show Modal
        }
    }))

} 

function selectStories(collection) {
    let selected = [];
    for (let i = 0; i < 10; i++) {
        random = Math.floor(Math.random() * 3);
        selected.push(collection[random]);
    }
    showHeadline(selected);
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
    window.addEventListener("load", initialiseGame);
}