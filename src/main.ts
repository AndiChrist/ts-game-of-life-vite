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
let fps = 30;
let lastTime = 0;

function loop(time: number) {
    if (time - lastTime > 1000 / fps) {
        drawGrid(grid);
        grid = nextGeneration(grid);
        lastTime = time;
    }
    animationId = requestAnimationFrame(loop);
}

// === Button-Funktionen ===

const startBtn = document.getElementById("startBtn")!;
const pauseBtn = document.getElementById("pauseBtn")!;
const resetBtn = document.getElementById("resetBtn")!;
const randomBtn = document.getElementById("randomBtn")!;

const stepBtn = document.getElementById("stepBtn")!;
const speedSlider = document.getElementById("speedSlider") as HTMLInputElement;

startBtn.addEventListener("click", () => {
    if (animationId === null) {
        requestAnimationFrame(loop);
    }
});

pauseBtn.addEventListener("click", () => {
    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
});

stepBtn.addEventListener("click", () => {
    if (animationId === null) {
        grid = nextGeneration(grid);
        drawGrid(grid);
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

speedSlider.addEventListener("input", () => {
    fps = parseInt(speedSlider.value);
});

// === Hilfsfunktion für leeres Gitter ===
function createEmptyGrid(): Grid {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0 as Cell)
    );
}

// Startzustand zeichnen
drawGrid(grid);

// === Preset-Funktion ===
function applyPreset(preset: string): Grid {
    const newGrid = createEmptyGrid();

    function set(x: number, y: number) {
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
            newGrid[y][x] = 1;
        }
    }

    const cx = Math.floor(cols / 2);
    const cy = Math.floor(rows / 2);

    switch (preset) {
        case "glider":
            // Kleines sich bewegendes Muster
            set(cx, cy);
            set(cx + 1, cy);
            set(cx - 1, cy);
            set(cx + 1, cy - 1);
            set(cx, cy - 2);
            break;

        case "blinker":
            // 3 Zellen in einer Linie
            set(cx - 1, cy);
            set(cx, cy);
            set(cx + 1, cy);
            break;

        case "pulsar":
            // Komplexeres Oszillator-Muster
            const pattern = [
                [2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
                [0, 2], [5, 2], [7, 2], [12, 2],
                [0, 3], [5, 3], [7, 3], [12, 3],
                [0, 4], [5, 4], [7, 4], [12, 4],
                [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
            ];
            for (const [dx, dy] of pattern) {
                set(cx + dx - 6, cy + dy - 3); // zentrieren
                set(cx + dx - 6, cy - dy + 3);
            }
            break;
    }

    return newGrid;
}

// === Klick-Funktion ===
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);

    if (x >= 0 && x < cols && y >= 0 && y < rows) {
        // Zelle invertieren
        grid[y][x] = grid[y][x] === 1 ? 0 : 1;
        drawGrid(grid);
    }
});

// === Preset-Dropdown ===
const presetSelect = document.getElementById("presetSelect") as HTMLSelectElement;

presetSelect.addEventListener("change", () => {
    const preset = presetSelect.value;
    if (preset) {
        grid = applyPreset(preset);
        drawGrid(grid);
    }
});
