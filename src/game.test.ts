import { describe, it, expect } from 'vitest';
import { simulate } from './utils';
import { getNextGeneration, type Grid } from './game';

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

    describe('Glider entwickelt sich korrekt über mehrere Generationen', () => {
        it('Glider nach 4 Generationen', () => {
            const gen0: Grid = [
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            const expectedGen4: Grid = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
            ];

            expect(simulate(gen0, 4)).toEqual(expectedGen4);
        });
    });

});
