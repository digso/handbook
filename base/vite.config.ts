import vue from "@vitejs/plugin-vue"
import {defineConfig} from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: "index.ts",
      name: "handbook",
      fileName: "handbook",
      formats: ["es", "umd"],
    },
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: ["vitepress", "vue"],
      output: {globals: {vitepress: "VitePress", vue: "Vue"}, compact: false},
    },
  },
})
