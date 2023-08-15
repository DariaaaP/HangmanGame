import { WORDS, KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.querySelector("#game");

const createPlaceholderHTML = () => {
  const word = sessionStorage.getItem("word");

  //1
  const wordArray = word.split("");
  const placeholdersHTML = wordArray.reduce(
    (acc, curr, i) => acc + `<h1 id="letter_${i}" class="letter">_</h1>`,
    ""
  );

  //2
  // const placeholdersArray = Array.from("_".repeat(word.length));
  // const placeholdersHTML = placeholdersArray.reduce(
  //   (acc, curr, i) => acc + `<h1 id="letter_${i}" class="letter">${curr}</h1>`,
  //   ""
  // );

  return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;
};

export const startGAme = () => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceholderHTML();
};
