//const messageEl = document.querySelector("#message");
//const cardButtonEl = document.querySelector("button");
const cardEl = document.querySelectorAll(".card");

let selectedCards = [...cardEl].map((card) => ({
  name: card.getAttribute("alt"),
  element: card,
}));
//console.log(cardEl);
console.log(selectedCards);

// let board = ["", "", "", "", "", "", "", "", "", "", "", ""];
let currentPlayer;
let gameActive = true;

const winningMessage = () =>
  `Congrats ${currentPlayer}, you have succesfully matched all the pairs!!`;
const losingMessage = () =>
  `Sorry ${currentPlayer}, you didn't match all the pairs. Better luck next time`;

const successfulPairs = [
  [0, 6],
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
];

const handleCardPicked = (clickedCard, clickedCardIndex) => {
  board[clickedCardIndex] = currentPlayer;
  clickedCard = currentPlayer;
};
