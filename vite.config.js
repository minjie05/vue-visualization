import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 适配import地址前的@符号
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // 热更新
    hmr: true,
  },
});
