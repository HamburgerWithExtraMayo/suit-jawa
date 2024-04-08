'use strict';

const computerChoice = () => {
    let randomNumber = Math.ceil(Math.random() * 3);
    return randomNumber == 1 ? "thumb" : randomNumber == 2 ? "pinky" : "index";
};

let playerChoice = "";
let isShuffling = false;

let score = JSON.parse(localStorage.getItem('score')) || {
    playerScore: 0,
    computerScore: 0,
    ties: 0
};

const thumb = document.querySelector(".thumb");
const pinky = document.querySelector(".pinky");
const index = document.querySelector(".index");
const reset = document.querySelector(".reset");
const result = document.querySelector(".result");
const playerChoiceImg = document.querySelector(".player-vis > img");
const computerChoiceImg = document.querySelector(".computer-vis > img");

result.innerHTML = `Wins : ${score.playerScore} Loses : ${score.computerScore} Ties : ${score.ties}`;

thumb.addEventListener("click", () => {
    if (!isShuffling) {
        playerChoice = "thumb";
        compareChoices();
    }
});
pinky.addEventListener("click", () => {
    if (!isShuffling) {
        playerChoice = "pinky";
        compareChoices();
    }
});
index.addEventListener("click", () => {
    if (!isShuffling) {
        playerChoice = "index";
        compareChoices();
    }
});
reset.addEventListener("click", () => {
    score = {
        playerScore: 0,
        computerScore: 0,
        ties: 0
    };
    result.innerHTML = `Wins : ${score.playerScore} Loses : ${score.computerScore} Ties : ${score.ties}`;
    playerChoiceImg.src = `blank-circle.svg`;
    computerChoiceImg.src = `blank-circle.svg`;

});

const shuffle = () => {
    const imgComputer = document.querySelector(".computer-vis img");
    const img = ["thumb", "index", "pinky"];
    isShuffling = true;
    const intervalId = setInterval(() => {
        imgComputer.src = `${img[Math.floor(Math.random() * 3)]}.svg`;
    }, 100);


    setTimeout(() => {
        clearInterval(intervalId);
        isShuffling = false;
    }, 1000);
};

function compareChoices() {
    shuffle();
    const computer = computerChoice();
    if ((computer == "thumb" && playerChoice == "pinky") ||
        (computer == "pinky" && playerChoice == "index") ||
        (computer == "index" && playerChoice == "thumb")) {
        score.playerScore += 1;
        result.innerHTML = `You win! <br> Wins : ${score.playerScore}, Loses : ${score.computerScore}, Ties : ${score.ties}`;
    } else if ((computer == "thumb" && playerChoice == "index") ||
        (computer == "index" && playerChoice == "pinky") ||
        (computer == "pinky" && playerChoice == "thumb")) {
        score.computerScore += 1;
        result.innerHTML = `Computer wins! <br> Wins : ${score.playerScore}, Loses : ${score.computerScore}, Ties : ${score.ties}`;
    } else {
        score.ties += 1;
        result.innerHTML = `Tie! <br> Wins : ${score.playerScore}, Loses : ${score.computerScore}, Ties : ${score.ties}`;
    }
    localStorage.setItem('score', JSON.stringify(score));

    playerChoiceImg.src = `${playerChoice}.svg`;
    setTimeout(() => {
        computerChoiceImg.src = `${computer}.svg`;
    }, 1000);
}
