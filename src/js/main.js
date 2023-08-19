import "../css/style.css";
import { darkModeHandler } from "./utils";
import { startGame } from "./game";

darkModeHandler();

const buttonStartGame = document.querySelector("#startGame");

buttonStartGame.addEventListener("click", startGame);
