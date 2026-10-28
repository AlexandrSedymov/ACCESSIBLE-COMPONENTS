import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined;

          if (id.includes('react-syntax-highlighter/dist/esm/languages/')) return 'syntax-languages';
          if (id.includes('react-syntax-highlighter/dist/esm/styles/')) return 'syntax-theme';
          if (id.includes('react-syntax-highlighter')) return 'syntax-highlighter';
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react-vendor';
          if (/node_modules\/(react-router|react-router-dom)\//.test(id)) return 'router';
          if (/node_modules\/(clsx|tailwind-merge)\//.test(id)) return 'utils';
          return undefined;
        },
      },
    },
    // Reduce chunk size warning limit to 800 kB
    chunkSizeWarningLimit: 800,

    // Additional optimizations
    sourcemap: false, // Disable sourcemaps in production for smaller builds
    minify: 'esbuild', // Use esbuild for faster builds

    target: 'es2020', // Modern target for smaller output
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'clsx', 'tailwind-merge'],
    // Exclude syntax highlighter from pre-bundling to allow tree shaking
    exclude: ['react-syntax-highlighter'],
  },
});
