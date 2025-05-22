import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom', // falls du DOM-Tests brauchst
        include: ['src/**/*.test.ts'],
    }
});
