import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 项目站：https://cubeplus1.github.io/Dundao/
// 生产构建必须带 /Dundao/，否则 index.html 会去域名根路径要 JS/CSS（404，白屏）。
// 线上旧包用的是已改名的仓库路径 /04171819/。dev 保持 '/'，本机仍打开 http://localhost:5173/。
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Dundao/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': { target: 'http://localhost:4000', changeOrigin: true },
      '/ws':  { target: 'ws://localhost:4000',  ws: true, changeOrigin: true },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
}));
