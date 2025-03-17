document.addEventListener("DOMContentLoaded", () => {
  const cardEl = document.querySelectorAll(".card");
  const timerElement = document.getElementById("countdown-timer");
  const startButton = document.getElementById("start-btn");
  const resetButton = document.getElementById("reset-btn");
  const gameMessage = document.getElementById("game-message");

  let timeLeft = 60;
  let timerInterval;
  let gameStarted = false;
  let resetTriggered = false;

  if (startButton) {
    startButton.addEventListener("click", startGame);
  }

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      resetTriggered = true;
      resetGame();
    });
  }

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
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    return shuffledCards;
  }

  cardEl.forEach((card) => (card.style.pointerEvents = "none"));

  function startGame() {
    if (gameStarted) return;

    gameStarted = true;
    startButton.disabled = true;
    gameMessage.textContent = "";
    gameMessage.classList.add("hidden");

    cardEl.forEach((card) => (card.style.pointerEvents = "auto"));

    selectedCards = shuffleCards(selectedCards);
    selectedCards.forEach((cardObj, index) => {
      cardObj.element.style.order = index;
    });

    timeLeft = 60;
    timerElement.value = timeLeft;
    clearInterval(timerInterval);
    startTimer();
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.value = timeLeft;
      console.log("Time Left:", timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }

  let clickedCards = [];
  selectedCards.forEach((cardObj) => {
    cardObj.element.addEventListener("click", () => {
      if (clickedCards.length < 2 && !clickedCards.includes(cardObj)) {
        flipCard(cardObj.element);
        clickedCards.push(cardObj);
        if (clickedCards.length === 2) {
          checkForMatch();
        }
      }
    });
  });

  function flipCard(card) {
    card.classList.add("flipped");
  }

  function checkForMatch() {
    const [card1, card2] = clickedCards;

    if (card1.name === card2.name) {
      clickedCards = [];
      checkWinCondition();
    } else {
      setTimeout(() => {
        card1.element.classList.remove("flipped");
        card2.element.classList.remove("flipped");
        clickedCards = [];
      }, 1000);
    }
  }

  function checkWinCondition() {
    const flippedCards = document.querySelectorAll(".flipped");
    if (flippedCards.length === selectedCards.length) {
      clearInterval(timerInterval);
      gameMessage.textContent = "🎉 Congrats! You matched all the pairs!";
      gameMessage.classList.remove("hidden");
      gameStarted = false;
      startButton.disabled = false;
    }
  }

  function endGame() {
    gameMessage.textContent = "⏳ Time's up! Please try again!";
    gameMessage.classList.remove("hidden");

    resetTriggered = false;

    setTimeout(() => {
      if (!resetTriggered) {
        resetGame();
      }
    }, 2000);
  }

  function resetGame() {
    timeLeft = 60;
    timerElement.value = timeLeft;
    clearInterval(timerInterval);
    timerInterval = null;
    gameStarted = false;
    startButton.disabled = false;
    clickedCards = [];

    gameMessage.textContent = "";
    gameMessage.classList.add("hidden");

    cardEl.forEach((card) => {
      card.classList.remove("flipped");
      card.style.pointerEvents = "none";
    });

    selectedCards = shuffleCards(selectedCards);
    selectedCards.forEach((cardObj, index) => {
      cardObj.element.style.order = index;
    });
  }
});
