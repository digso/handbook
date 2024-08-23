import vue from "@vitejs/plugin-vue"
import {defineConfig} from "vite"

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {entry: "index.ts", name: "handbook", fileName: "handbook"},
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: ["vitepress", "vue"],
      output: {globals: {vitepress: "VitePress", vue: "Vue"}, compact: false},
    },
  },
})
