import { Game } from "./Game";
import { Graphic } from "./Graphic";
import "./style.css";

const graphic = new Graphic(document.getElementById("app"), new Game());
graphic.render();
