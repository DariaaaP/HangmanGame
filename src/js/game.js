import { WORDS, KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.querySelector("#game"),
  logoH1 = document.querySelector("#logo");

let triesLeft, winCount;

const createPlaceholderHTML = () => {
  const word = sessionStorage.getItem("word");
  const wordArray = word.split("");
  const placeholdersHTML = wordArray.reduce(
    (acc, curr, i) => acc + `<h1 id="letter_${i}" class="letter">_</h1>`,
    ""
  );
  return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`; //String
};

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";

  const keyboardHTML = KEYBOARD_LETTERS.reduce(
    (acc, curr) =>
      acc +
      `<button id="${curr}" class="button-primary keyboard-button">${curr}</button>`,
    ""
  );

  keyboard.innerHTML = keyboardHTML;
  return keyboard; //HTMLElement
};

const createHangmanImg = () => {
  const image = document.createElement("img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.classList.add("hangman-img");
  image.id = "hangman-img";
  return image;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  const inputLetter = letter.toLowerCase();
  //буквы в слове нет
  if (!word.includes(inputLetter)) {
    const triesCounter = document.querySelector("#tries-left");
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.querySelector("#hangman-img");
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame("lose");
    }
  } else {
    //буква в слове есть
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount += 1;
        if (winCount === word.length) {
          stopGame("win");
          return;
        }
        document.querySelector(`#letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

const stopGame = (status) => {
  document.querySelector("#placeholders").remove();
  document.querySelector("#tries").remove();
  document.querySelector("#keyboard").remove();
  document.querySelector("#quit").remove();

  const word = sessionStorage.getItem("word");
  if (status === "win") {
    document.querySelector("#hangman-img").src = "images/hg-win.png";
    document.querySelector("#game").innerHTML +=
      '<h2 class="result-header win">You won!</h2>';
  } else if (status === "lose") {
    document.querySelector("#game").innerHTML +=
      '<h2 class="result-header lose">You lost!</h2>';
  } else if (status === "quit") {
    logoH1.classList.remove("logo-sm");
    document.querySelector("#hangman-img").remove();
  }

  document.querySelector(
    "#game"
  ).innerHTML += `<p>The word was: <span class="result-word">${word}</span></p><button id="play-again" class="button-primary px-5 py-2 mt-5">Play again</button>`;

  document.querySelector("#play-again").onclick = startGame;
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;
  logoH1.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceholderHTML();
  gameDiv.innerHTML += `<p id='tries' class='mt-2'>TRIES LEFT: <span id='tries-left' class='font-medium text-green-600'>${triesLeft}</span></p>`;

  const keyboardDiv = createKeyboard();

  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);
  gameDiv.appendChild(keyboardDiv);

  gameDiv.insertAdjacentHTML(
    "beforeend",
    '<button id="quit" class="button-secondary px-2 py-1 mt-4">Quit</button>'
  );

  document.querySelector("#quit").onclick = () => {
    const isSure = confirm("Aru you sure you want to quit and lose progress?");
    if (isSure) {
      stopGame("quit");
    }
  };
};
