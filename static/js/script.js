/* Global Variables */
let score;
let round;
let playerName;
let selectedStories = []

/* Element Selectors */
const gameWindow = document.querySelector(".game-panel");
const answerBtns = document.querySelectorAll(".answer-btn")
const todaysDate = document.querySelector(".date");


/* Functions */
// Show Intro Modal When Game Page Loads
function showGameIntroModal() {
    const gameIntroModal = document.querySelector(".game-intro-modal");
    const startGameBtn = document.querySelector(".start-game");
    const usernameField = document.querySelector(".username-field");
    gameIntroModal.classList.remove("hidden");
    usernameField.addEventListener("keyup", enableStartGameBtn);
    startGameBtn.addEventListener("click", startGame);
    
}

// Validate username and enable start game button
function enableStartGameBtn() {
    console.log("changing")
    const startGameBtn = document.querySelector(".start-game");
    const usernameField = document.querySelector(".username-field");
    if (usernameField.value) {
        startGameBtn.classList.remove("disabled");
    } else {
        startGameBtn.classList.add("disabled");
    }
}

// Hide Intro Modal
function hideGameIntroModal() {
    const gameIntroModal = document.querySelector(".game-intro-modal");
    gameIntroModal.classList.add("hidden");
}

// Reset Displayed Score & Round Number
function resetGameStats() {
    const scoreDisplay = document.querySelector(".user-score");
    const gameRound = document.querySelector(".game-round")
    scoreDisplay.textContent = score.toString();
    gameRound.textContent = round.toString();
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
        enableAnswerBtns();
        startRound();
    } else {
        hideFeedbackModal();
        console.log("Game ends")
        showGameSummaryModal()
    }
}


// Update Game Summary Content Based On ${playerName} Score
function updateSummaryModal() {
    const summaryModalHeading = document.querySelector(".summary-modal h2");
    const summaryModalContent = document.querySelector(".game-summary");
    const summaryScore = document.querySelector(".final-score");
    summaryScore.textContent = `Final Score: ${score}/10`;

    if (score >= 8) {
        summaryModalHeading.textContent = `Snopes taps ${playerName} to head up anti-fake-news division`;
        summaryModalContent.textContent = `${playerName} today received an invitation to head up Snopes' anti-fake-news division. 'It's unexpected', said ${playerName}, 'I thought I was just playing a silly game'. Reports from the Kremlin indicate that there is some fear that the internet could become a more trustworthy source of information, but unsurprisingly noone was willing to comment.`
    } else if (score >= 6) {
        summaryModalHeading.textContent = `${playerName} runs more hot than cold`;
        summaryModalContent.textContent = `In the war against fake news, ${playerName} proved that they could be a valuable asset. There is some refinement needed as some stories got past them, but management was pleased to see that they identified the majority of news items that came their way correctly.`
    } else if (score >=4) {
        summaryModalHeading.textContent = `Memers rejoice at pulling the wool over ${playerName}'s eyes`;
        summaryModalContent.textContent = `${playerName} was suckered in by some stories that sounded too good to be true. Memers have been busy churning out images to poke fun at their plight, but they'll move onto the next big thing soon enough.`
    }
    else {
        summaryModalHeading.textContent = `${playerName} banned from internet on April Fool's Day`;
        summaryModalContent.textContent = `${playerName} struggled to identify fact from fiction when news stories arrived on their desk. The elders of the internet have decided that ${playerName} should be kept offline on April Fool's Day for their own safety.`
    }

}

// Show Game Summary
function showGameSummaryModal() {
    const summaryModal = document.querySelector(".summary-modal");
    summaryModal.classList.remove("hidden");
    updateSummaryModal()
    const playAgainBtn = document.querySelector(".play-again")
    playAgainBtn.addEventListener("click", initialiseGame)
}

// Hide Game Summary
function hideGameSummaryModal() {
    const summaryModal = document.querySelector(".summary-modal");
    summaryModal.classList.add("hidden");
}

// Display Modal After ${playerName} Answers & Update Content
function showFeedbackModal(answersMatch, headline) {
    const feedbackModal = document.querySelector(".feedback-modal");
    feedbackModal.classList.remove("hidden");
    const feedbackModalHeading = document.querySelector(".feedback-modal h2");
    const feedbackStoryCategory = document.querySelector(".story-cat");
    const feedbackModalContent = document.querySelector(".article-summary p");
    const feedbackModalLink = document.querySelector(".article-link");
    const nextButton = document.querySelector(".next-headline");
    feedbackModalContent.textContent = headline["articleExcerpt"];
    feedbackStoryCategory.textContent = `This story is ${headline["category"].toUpperCase()}`;
    feedbackModalLink.setAttribute("href", headline["articleLink"]);

    if (answersMatch) {
        // Update Text of Modal
        
        feedbackModalHeading.innerHTML = '<i class="far fa-check-circle"></i> Correct!';
        feedbackModalHeading.classList.add("correct");
        
        nextButton.addEventListener("click", newRound)
    } else {

        feedbackModalHeading.innerHTML = '<i class="far fa-times-circle"></i> Incorrect!';
        feedbackModalHeading.classList.add("incorrect");

        nextButton.addEventListener("click", newRound)
    }
}

// Hide Answer Feedback Modal
function hideFeedbackModal() {
    const feedbackModalHeading = document.querySelector(".feedback-modal h2");
    const feedbackModal = document.querySelector(".feedback-modal");
    feedbackModalHeading.classList.remove("correct");
    feedbackModalHeading.classList.remove("incorrect");
    feedbackModal.classList.add("hidden");
}

// Disable Answer Buttons When User Makes A Choice
function disableAnswerBtns() {
    answerBtns.forEach(btn => btn.disabled = true)
}

function enableAnswerBtns() {
    answerBtns.forEach(btn => btn.disabled = false)
}

// Check User Answer Against Headline Category
function checkAnswer() {
    disableAnswerBtns();
    const userAnswer = this.firstElementChild.innerText;
    const correctAnswer = startRound()
    
    if (userAnswer === correctAnswer["category"]) {
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
    storyArray = collection;
    for (let i = 0; i < 10; i++) {
        random = Math.floor(Math.random() * (storyArray.length - 1));
        selectedStories.push(storyArray[random]);
        storyArray.splice(random, 1)
    }
    console.log(storyArray);
    console.log(selectedStories);
    startRound();
}

// Get Stories From JSON File
function startGame() {
    const usernameField = document.querySelector(".username-field");
    playerName = usernameField.value;
    hideGameIntroModal();
    fetch("../../headlines.json")
        .then(response => response.json())
        .then(data => selectStories(data));
}

// Show Intro Modal & Set Initial Variable Values
function initialiseGame() {
    enableAnswerBtns();
    hideGameSummaryModal();
    showGameIntroModal();
    selectedStories = [];
    score = 0;
    round = 1;
    resetGameStats();
}

// Set Todays Date on Newspaper
function setTodaysDate() {
    const d = new Date();
    const date = d.getDate();
    let month = d.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    month = months[month];
    const year = d.getFullYear();
    todaysDate.innerText = `${date} ${month}, ${year}`;
    console.log(todaysDate.innerText);
}


/* Event Listeners */
if (gameWindow) {
    window.addEventListener("load", initialiseGame);
    answerBtns.forEach(answer => answer.addEventListener("click", checkAnswer));
}

if (todaysDate) {
    window.addEventListener("load", setTodaysDate);
}