import "../css/style.css";
import { darkModeHandler } from "./utils";
import { startGAme } from "./game";

darkModeHandler();

const buttonStartGame = document.querySelector("#startGame");

buttonStartGame.addEventListener("click", startGAme);
