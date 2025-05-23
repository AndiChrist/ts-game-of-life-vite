import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        coverage: {
            provider: 'v8', // oder 'istanbul' als Alternative
            reportsDirectory: './coverage',
            reporter: ['text', 'html'],
            all: true,
        },
    },
});
