# Puissance 4

> this project is education only\
> This project use [pnpm](https://pnpm.io/fr/) as package manager

## Project structure

├── src\
│ ├── Game.ts\
│ ├── Graphic.ts\
│ ├── main.ts\
├── public\
│ ├── vite.svg\
├── dist\
├── index.html\
├── node_modules\
├── package.json\
├── pnpm-lock.json\
└── .gitignore\

- Game.ts is the Game class contain all game logic
- Graphic.ts is the Graphic class contain all render
- main.ts entry point of index.html

## Run dev server

You must have [pnpm](https://pnpm.io/fr/) and [node.js(14.18+, 16+)](https://nodejs.org/en/download) installed on your computer.

```bash
pnpm run dev
```

## Run build

```bash
pnpm run build
```

## Run tests

> To run units test we use vitest.\
> The project is shiped with units test for power 4 logic only.

```bash
pnpm run test
```

If you want vitest ui, you can run this command.

```bash
pnpm run test:ui
```

## Goals

| Goal name        | State |
| ---------------- | ----- |
| Using units test | ✅    |
| Using POO        | ✅    |
