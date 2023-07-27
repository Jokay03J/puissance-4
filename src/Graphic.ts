import { Game } from "./Game";

export class Graphic {
  view: HTMLElement;
  game: Game;
  constructor(view: HTMLElement | null, game: Game) {
    this.view = view!;
    this.game = game;
  }

  render() {
    console.log(this.game.cells);

    for (let indexRow = 0; indexRow < this.game.cells.length; indexRow++) {
      const row = this.game.cells[indexRow];
      for (let indexColumn = 0; indexColumn < row.length; indexColumn++) {
        const cell = row[indexColumn];
        let el = document.createElement("div");
        el.textContent = `col: ${indexColumn} row: ${indexRow}`;
        el.dataset["player"] = cell.toString();
        el.dataset["col"] = indexColumn.toString();
        el.dataset["row"] = indexRow.toString();
        this.view.appendChild(el);
        el.addEventListener("click", () => this.click(indexColumn));
      }
    }
  }

  click(column: number) {
    if (this.game.gameResult !== null) return;

    const index = this.game.put(column);
    if (index === -1) {
      return alert("Colonne pleine !");
    }
    const elClick = document.querySelector(
      `#app div[data-row="${index}"][data-col="${column}"]`
    ) as HTMLDivElement;
    elClick.dataset["player"] = this.game.turn.toString();
    if (this.game.gameResult !== null) {
      return confirm(`le joueur ${this.game.gameResult} à gagnez !`);
    }
  }
}
