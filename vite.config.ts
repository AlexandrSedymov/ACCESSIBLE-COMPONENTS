import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core libraries
          'react-vendor': ['react', 'react-dom'],
          
          // Router library
          'router': ['react-router-dom'],
          
          // Syntax highlighter (only what we need)
          'syntax-highlighter': [
            'react-syntax-highlighter/dist/esm/light'
          ],
          
          // Individual language chunks for better splitting
          'syntax-languages': [
            'react-syntax-highlighter/dist/esm/languages/prism/javascript',
            'react-syntax-highlighter/dist/esm/languages/prism/typescript',
            'react-syntax-highlighter/dist/esm/languages/prism/jsx',
            'react-syntax-highlighter/dist/esm/languages/prism/tsx',
            'react-syntax-highlighter/dist/esm/languages/prism/css',
            'react-syntax-highlighter/dist/esm/languages/prism/markup'
          ],
          
          // Theme as separate chunk
          'syntax-theme': [
            'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
          ],
          
          // Utility libraries
          'utils': ['clsx', 'tailwind-merge']
        }
      }
    },
    // Reduce chunk size warning limit to 800 kB
    chunkSizeWarningLimit: 800,
    
    // Additional optimizations
    sourcemap: false, // Disable sourcemaps in production for smaller builds
    minify: 'esbuild', // Use esbuild for faster builds
    
    target: 'es2020' // Modern target for smaller output
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'clsx',
      'tailwind-merge'
    ],
    // Exclude syntax highlighter from pre-bundling to allow tree shaking
    exclude: [
      'react-syntax-highlighter'
    ]
  }
})
