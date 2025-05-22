import { describe, it, expect } from 'vitest';
import { getNextGeneration } from './game';

describe('Game of Life - Muster', () => {
    it('Blinker oszilliert korrekt', () => {
        const input = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ];
        const expected = [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
        ];
        expect(getNextGeneration(input)).toEqual(expected);
    });

    it('Block bleibt stabil', () => {
        const input = [
            [1, 1],
            [1, 1],
        ];
        expect(getNextGeneration(input)).toEqual(input);
    });

    it('Toad oszilliert korrekt', () => {
        const input = [
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
        ];
        const expected = [
            [0, 0, 1, 0],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [0, 1, 0, 0],
        ];
        expect(getNextGeneration(input)).toEqual(expected);
    });

    it('Beehive bleibt stabil', () => {
        const input = [
            [0, 1, 1, 0],
            [1, 0, 0, 1],
            [0, 1, 1, 0],
        ];
        expect(getNextGeneration(input)).toEqual(input);
    });

    it('Glider bewegt sich korrekt (1 Schritt)', () => {
        const input = [
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];

        const expected = [
            [0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];

        expect(getNextGeneration(input)).toEqual(expected);
    });



    it('Glider bewegt sich korrekt (4 Generationen)', () => {
        const gen0 = [
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];

        const gen4 = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ];

        expect(simulate(gen0, 4)).toEqual(gen4);
    });

});

function simulate(grid: number[][], steps: number): number[][] {
    let result = grid;
    for (let i = 0; i < steps; i++) {
        result = getNextGeneration(result);
    }
    return result;
}
