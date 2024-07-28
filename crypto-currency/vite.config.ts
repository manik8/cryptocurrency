import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  build: {
    outDir: 'dist', // The directory to output the build
    sourcemap: true, // Optional: Generates source maps for easier debugging
  },
});
