//const messageEl = document.querySelector("#message");
//const cardButtonEl = document.querySelector("button");
const cardEl = document.querySelectorAll(".card");
const timerElement = document.getElementById("countdown-timer");
const startButton = document.getElementById("start-btn");

let selectedCards = [...cardEl].map((card) => {
  const lastImg = card.querySelector("img:last-of-type");
  return {
    name: lastImg ? lastImg.getAttribute("alt") : "No alt found",
    element: card,
  };
});

function shuffleCards(gameArray) {
  let shuffledCards = [...gameArray];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
}

selectedCards = shuffleCards(selectedCards);

selectedCards.forEach((cardObj, index) => {
  cardObj.element.style.order = index;
});

function shuffleWithAnimation() {
  selectedCards.forEach((cardObj) => {
    cardObj.element.classList.add("shuffling");
  });

  setTimeout(() => {
    selectedCards = shuffleCards(selectedCards);
    selectedCards.forEach((cardObj, index) => {
      cardObj.element.style.order = index;
    });

    setTimeout(() => {
      selectedCards.forEach((cardObj) => {
        cardObj.element.classList.remove("shuffling");
      });
    }, 500);
  }, 300);
}

let timeLeft = 60;
let timerInterval;

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.value = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameMessage.textContent = "Sorry, you didn't match all the pairs. Try again!";
  gameMessage.classList.remove("hidden");
  timeLeft = 60;
  timerElement.value = timeLeft;
  timerInterval = null;
}
startButton.addEventListener("click", startTimer);

document
  .getElementById("reset-btn")
  .addEventListener("click", shuffleWithAnimation);

const winningMessage = () =>
  `Congrats ${currentPlayer}, you have succesfully matched all the pairs!!`;
const losingMessage = () =>
  `Sorry ${currentPlayer}, you didn't match all the pairs. Better luck next time`;

const handleCardPicked = (clickedCard, clickedCardIndex) => {
  board[clickedCardIndex] = currentPlayer;
  clickedCard = currentPlayer;
};
