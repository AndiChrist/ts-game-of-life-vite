import { describe, it, expect } from 'vitest';
import { getNextGeneration } from './game';

describe('Game of Life', () => {
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

        const result = getNextGeneration(input);
        expect(result).toEqual(expected);
    });
});
