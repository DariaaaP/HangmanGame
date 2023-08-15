import { WORDS, KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.querySelector("#game"),
  logoH1 = document.querySelector("#logo");

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

export const startGAme = () => {
  logoH1.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceholderHTML();
  gameDiv.innerHTML +=
    "<p id='tries' class='mt-2'>TRIES LEFT: <span id='tries-left' class='font-medium text-green-600'>10</span></p>";

  // const keyboardDiv = createKeyboard();
  // keyboardDiv.addEventListener("click", (event) => {});

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);
  gameDiv.appendChild(keyboardDiv);
};
