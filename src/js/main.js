import "../css/style.css";
import { darkModeHandler } from "./utils";

darkModeHandler();

const buttonStartGame = document.querySelector("#startGame");

buttonStartGame.addEventListener("click", () => {
  console.log("Click!");
});
