import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const resolveExternalsPlugin = require('vite-plugin-resolve-externals');

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue()],
  plugins: [
    // It can be configured here
    vue(),
    resolveExternalsPlugin({
      vue: 'Vue',
      'vue-router': 'vueRouter',
      'element-plus': 'ElementPlus',
    }),
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '/@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  // base: process.env.NODE_ENV === "production" ? '/vite/' : '/',
  build: {
      outDir: "dist",
  }
})
