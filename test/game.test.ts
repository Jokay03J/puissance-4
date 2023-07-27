import { beforeEach, describe, expect, it, test } from "vitest";
import { Game } from "../src/Game";

describe("Game/win", () => {
  let game: Game;
  beforeEach(() => {
    game = new Game();
  });

  test("horizontal", () => {
    game.cells = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0],
    ];
    game.put(2);
    expect(game.gameResult).toBe(1);
  });

  test("vertical", () => {
    game.cells = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
    ];
    game.put(5);
    expect(game.gameResult).toBe(1);
  });

  test("diagonal", () => {
    game.cells = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0],
    ];
    game.put(5);
    expect(game.gameResult).toBe(1);
  });

  test("2nd diagonal", () => {
    game.cells = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 0],
    ];
    game.put(2);
    expect(game.gameResult).toBe(1);
  });
});

describe("Game/turn", () => {
  let game: Game;
  beforeEach(() => {
    game = new Game();
  });
  test("default player turn is player 1", () => {
    expect(game.turn).toBe(1);
  });

  test("after player play, the turn must be changed", () => {
    expect(game.turn).toBe(1);
    game.put(1);
    expect(game.turn).toBe(2);
  });
});

describe("Game/put", () => {
  let game: Game;
  beforeEach(() => {
    game = new Game();
  });

  test("the token must be placed at column bottom", () => {
    expect(game.put(0)).toBe(5);
    expect(game.put(0)).toBe(4);
  });
});

describe("Game/generate", () => {
  let game: Game;
  beforeEach(() => {
    game = new Game();
  });
  test("at start the game cells must be generated", () => {
    expect(game.cells).toStrictEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});

describe("Game/checkDirection", () => {
  let game: Game;
  beforeEach(() => {
    game = new Game();
  });
  test("horizontal", () => {
    game.cells = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0],
    ];
    expect(
      game.checkDirection(
        [
          { c: -1, r: 0 },
          { c: 1, r: 0 },
        ],
        3,
        5
      )
    ).toBe(4);
  });
});
