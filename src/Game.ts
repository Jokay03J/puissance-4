export class Game {
  /**
   * game cells
   */
  cells: number[][];

  /**
   * 0 = no player
   * 1 = X
   * 2 = O
   */
  turn: number;

  /**
   * null = game is playing
   * 1 = player X
   * 2 = player O
   */
  gameResult: null | number;

  /**
   * Amount of same player token aligned to win
   */
  size: number;

  constructor(columns: number = 7, rows: number = 6, size: number = 4) {
    this.cells = this.generate(columns, rows);
    this.turn = 1;
    this.gameResult = null;
    this.size = size;
  }

  /**
   * Generate cells
   */
  generate(column: number, row: number): number[][] {
    const result = [];
    for (let indexRow = 0; indexRow < row; indexRow++) {
      const row = [];
      for (let indexColumn = 0; indexColumn < column; indexColumn++) {
        row.push(0);
      }
      result.push(row);
    }

    return result;
  }

  /**
   * Return array of direction cells
   */
  getPartOfDirection(
    direction: { r: number; c: number },
    column: number,
    row: number
  ): number[] {
    let resultCells = [];
    let indexRow = row + direction.r;
    let indexColumn = column + direction.c;
    let cellNext =
      this.cells[indexRow] && this.cells[indexRow][indexColumn]
        ? this.cells[indexRow][indexColumn]
        : null;
    while (
      cellNext &&
      indexRow >= 0 &&
      indexRow < this.cells.length &&
      indexColumn >= 0 &&
      indexColumn < this.cells[0].length
    ) {
      resultCells.push(this.cells[indexRow][indexColumn]);
      indexRow += direction.r;
      indexColumn += direction.c;
      cellNext =
        this.cells[indexRow] && this.cells[indexRow][indexColumn]
          ? this.cells[indexRow][indexColumn]
          : null;
    }

    return resultCells;
  }

  /**
   * Combine two part of direction and return count of same current player token
   */
  checkDirection(
    directions: [{ r: number; c: number }, { r: number; c: number }],
    column: number,
    row: number
  ): number {
    let resultCells = [];
    //get the first direction cells and reverse it to preserve order
    resultCells.push(
      ...this.getPartOfDirection(directions[0], column, row).reverse()
    );

    resultCells.push(this.cells[row][column]);

    resultCells.push(...this.getPartOfDirection(directions[1], column, row));

    return resultCells.reduce(
      (accumulator, currentValue) =>
        currentValue === this.turn ? accumulator + 1 : 0,
      0
    );
  }

  /**
   * Place token on selected column.
   * @return cell index placed token or -1 if column is full
   */
  put(indexColumn: number): number {
    for (let indexRow = this.cells.length - 1; indexRow >= 0; indexRow--) {
      if (this.cells[indexRow][indexColumn] === 0) {
        this.cells[indexRow][indexColumn] = this.turn;
        if (this.checkWin(indexRow, indexColumn)) {
          this.gameResult = this.turn;
        }
        this.turn = this.turn === 1 ? 2 : 1;
        return indexRow;
      }
    }
    return -1;
  }

  /**
   * Return if current player win game
   */
  checkWin(row: number, column: number): boolean {
    let count = 0;
    //horizontal
    count = this.checkDirection(
      [
        { c: -1, r: 0 },
        { c: 1, r: 0 },
      ],
      column,
      row
    );

    if (count >= this.size) {
      return true;
    }
    // //vertical
    count = this.checkDirection(
      [
        { c: 0, r: 1 },
        { c: 0, r: -1 },
      ],
      column,
      row
    );
    if (count >= this.size) {
      return true;
    }

    //diagonal
    count = this.checkDirection(
      [
        { c: -1, r: 1 },
        { c: 1, r: -1 },
      ],
      column,
      row
    );
    if (count >= this.size) {
      return true;
    }

    //second diagonal
    count = this.checkDirection(
      [
        { c: 1, r: 1 },
        { c: -1, r: -1 },
      ],
      column,
      row
    );
    if (count >= this.size) {
      return true;
    }

    return false;
  }
}
