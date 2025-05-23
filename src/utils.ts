import { getNextGeneration, type Grid } from './game';

export function simulate(grid: Grid, steps: number): Grid {
    let current = grid;
    for (let i = 0; i < steps; i++) {
        current = getNextGeneration(current);
    }
    return current;
}
