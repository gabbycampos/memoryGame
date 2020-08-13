const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
let hasFlippedCard = false; // to know which card
let firstCard;
let secondCard;
let lockBoard = false; // so we won't click too quickly
clickCounter = 0;
cardsFlipped = 0;
let restartButton = document.querySelector('.btn');
const clicks = document.querySelector('.clicks');
const score = document.querySelector('.score');

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (lockBoard) {
    return;
  }
  clickCounter++;
  //clicks.innerHTML = clickCounter;
  clicks.innerText = clickCounter;
  //console.log("you just clicked", target);
  event.target.classList.add('flip');

  let target = event.target;
  target.style.backgroundColor = target.classList[0];

  //let cardClass = target.className;
  //console.log(cardClass)
  //console.log(target)


  if (!hasFlippedCard) {
    firstCard = firstCard || target;
    secondCard = target === firstCard ? null : target;
  }

  if (firstCard && secondCard) {
    lockBoard = true; // so we won't click too quickly
    let one = firstCard.className;
    let two = secondCard.className;

    if (one === two) {
      cardsFlipped += 2;
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    } else {
      setTimeout(function () {
        firstCard.style.backgroundColor = '';
        secondCard.style.backgroundColor = '';
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      }, 900);
    }
  }
  if (cardsFlipped === COLORS.length) {
    score.innerHTML = clickCounter;
    setTimeout(function () {
      alert('All Matched!');
    }, 1000)
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

// restart game
restartButton.addEventListener('click', function () {
  clicks.innerText = 0;
  clickCounter = '';
  location.reload();
});


