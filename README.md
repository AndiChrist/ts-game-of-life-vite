# ts-game-of-life-vite
A small "game of life" (by John Conway ,1970) project with TypeScript

Vite is a modern, lightning-fast build and development server for web projects – ideal for projects using TypeScript, JavaScript, React, Vue, Svelte and more.

## install Vite
```zsh
npm create vite@latest
```
use: "Vanilla" and "TypeScript" (ignore existing files)

## follow steps
```zsh
cd ts-game-of-life-vite
npm install
npm run dev
```

## alternative project creation
```zsh
npm create vite@latest game-of-life-vite -- --template vanilla-ts
```

## scripts in this project
* dev	
  * Entwicklungsserver mit Hot Reload (vite)
* build	
  * Produktions-Build in den Ordner dist/
* preview
  * Vorschau des Builds via lokalen Webserver
* clean (manuell)
  * Löscht dist/, um frisch zu bauen

## install unit tests
```zsh
npm install --save-dev vite vitest

```
### with UI
```zsh
npm install --save-dev @vitest/ui
```
### install jsdom
```zsh
npm install --save-dev jsdom
```

## start test
```zsh
npx vitest --ui
```

## test coverage
### install plugin
```zsh
npm install -D @vitest/coverage-v8
```

### run test with covergae
```zsh
npx vitest run --coverage
```
or with UI
```zsh
npx vitest --ui
```