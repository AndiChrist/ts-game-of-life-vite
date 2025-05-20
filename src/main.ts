const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const cellSize = 10;
const rows = 60;
const cols = 80;
canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

type Cell = 0 | 1;
type Grid = Cell[][];

function createGrid(): Grid {
    const grid: Grid = [];
    for (let y = 0; y < rows; y++) {
        grid[y] = [];
        for (let x = 0; x < cols; x++) {
            grid[y][x] = Math.random() > 0.8 ? 1 : 0;
        }
    }
    return grid;
}

function drawGrid(grid: Grid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x]) {
                ctx.fillStyle = "#00ff00";
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

function countNeighbors(grid: Grid, x: number, y: number): number {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                count += grid[ny][nx];
            }
        }
    }
    return count;
}

function nextGeneration(grid: Grid): Grid {
    const newGrid: Grid = [];
    for (let y = 0; y < rows; y++) {
        newGrid[y] = [];
        for (let x = 0; x < cols; x++) {
            const neighbors = countNeighbors(grid, x, y);
            const cell = grid[y][x];
            if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
                newGrid[y][x] = 1;
            } else if (cell === 0 && neighbors === 3) {
                newGrid[y][x] = 1;
            } else {
                newGrid[y][x] = 0;
            }
        }
    }
    return newGrid;
}

let grid = createGrid();
let animationId: number | null = null;

function loop() {
    drawGrid(grid);
    grid = nextGeneration(grid);
    animationId = requestAnimationFrame(loop);
}

// === Button-Funktionen ===

const startBtn = document.getElementById("startBtn")!;
const pauseBtn = document.getElementById("pauseBtn")!;
const resetBtn = document.getElementById("resetBtn")!;
const randomBtn = document.getElementById("randomBtn")!;

startBtn.addEventListener("click", () => {
    if (animationId === null) {
        loop();
    }
});

pauseBtn.addEventListener("click", () => {
    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
});

resetBtn.addEventListener("click", () => {
    grid = createEmptyGrid();
    drawGrid(grid);
});

randomBtn.addEventListener("click", () => {
    grid = createGrid();
    drawGrid(grid);
});

// === Hilfsfunktion für leeres Gitter ===
function createEmptyGrid(): Grid {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0 as Cell)
    );
}

// Startzustand zeichnen
drawGrid(grid);

