const wrongContainer = document.querySelector(".wrong-letter-container");
const wordContainer = document.querySelector(".word-container");
const overlay = document.querySelector(".overlay");
const winAlertBox = document.querySelector(".user-win");
const loseAlertBox = document.querySelector(".user-lose");
const playAgainBtns = document.querySelectorAll(".play-again");
const notifcationBox = document.querySelector(".notification-box");
let playable = true;
let letterDivs, wrongLetters, correctLetters;

const words = ["happy", "programming", "wizard", "giant"];

// Game start
function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];

  clear();

  renderWord();
}

// Render blank elements inside word container i.e. _ _ _ _ _
function renderWord() {
  wordContainer.innerHTML = "";
  for (let i = 0; i < selectedWord.length; i++) {
    wordContainer.innerHTML += '<div class="letter"></div>';
  }

  letterDivs = Array.from(document.querySelectorAll(".letter"));
}

// This function calls when user enter wrong letter
function onWrongGuess(letter) {
  if (wrongLetters.includes(letter)) {
    // Display on error box for 2 seconds
    notifcationBox.classList.add("notification-box-on");

    setTimeout(() => {
      notifcationBox.classList.remove("notification-box-on");
    }, 2000);
  } else {
    wrongLetters.push(letter);
    wrongContainer.innerHTML = `
      <h4>Wrong letters</h4>
      <div class="wrong-letters-list">${wrongLetters.join(", ")}</div>
    `;

    // Display a figure part
    document.querySelector(".figure-part").classList.remove("figure-part");

    // check if the user lose
    if (wrongLetters.length == 6) {
      loseAlertBox.classList.add("display-on");
      overlay.classList.add("display-on");
      playable = false;
    }
  }
}

// checkLetter will check if a letter
// is found in a given word if yes, display
// them inside word container else display
// inside wrong container
function checkLetter(letter) {
  // Check if letter is alphabet
  if (letter >= "A" && letter <= "z" && letter.length == 1) {
    letter = letter.toLowerCase();

    let indexes = [];

    // Finding the indexes of the letter
    selectedWord.split("").forEach((l, index) => {
      l == letter ? indexes.push(index) : "";
    });

    // if the letter is found in the word,
    // then display it
    if (indexes.length) {
      indexes.forEach((index) => {
        letterDivs[index].innerText = letter;
        correctLetters[index] = letter;
      });

      // check if user wins
      if (correctLetters.join("") === selectedWord) {
        winAlertBox.classList.add("display-on");
        overlay.classList.add("display-on");
        playable = false;
      }
    } else {
      onWrongGuess(letter);
    }
  }
}

// Clear Datas
function clear() {
  letterDivs = [];
  wrongLetters = [];
  correctLetters = [];
  playable = true;

  // Display off figure
  const figures = document.querySelectorAll(".figure");

  figures.forEach((f) => f.classList.add("figure-part"));

  // display off overlay and alert box
  overlay.classList.remove("display-on");
  winAlertBox.classList.remove("display-on");
  loseAlertBox.classList.remove("display-on");

  // Clearing off wrong letters container
  wrongContainer.innerHTML = "";
}

// Event Listeners
playAgainBtns.forEach((btn) => {
  btn.addEventListener("click", startGame);
});

document.addEventListener("keydown", (e) =>
  playable ? checkLetter(e.key) : ""
);

// Start Game
startGame();
