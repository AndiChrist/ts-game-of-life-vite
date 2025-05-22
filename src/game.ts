export type Grid = number[][];

export function createEmptyGrid(rows: number, cols: number): Grid {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

export function getNextGeneration(grid: Grid): Grid {
    const rows = grid.length;
    const cols = grid[0].length;
    const next: Grid = createEmptyGrid(rows, cols);

    const countNeighbors = (r: number, c: number): number => {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    count += grid[nr][nc];
                }
            }
        }
        return count;
    };

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const alive = grid[r][c] === 1;
            const neighbors = countNeighbors(r, c);
            if (alive && (neighbors === 2 || neighbors === 3)) {
                next[r][c] = 1;
            } else if (!alive && neighbors === 3) {
                next[r][c] = 1;
            }
        }
    }

    return next;
}
