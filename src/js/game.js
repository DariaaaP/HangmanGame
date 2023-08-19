import { WORDS, KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.querySelector("#game"),
  logoH1 = document.querySelector("#logo");

let triesLeft;

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
  console.log(keyboard);
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
  } else {
    //буква в слове есть
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        document.querySelector(`#letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

export const startGAme = () => {
  triesLeft = 10;
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
};
