import vue from "@vitejs/plugin-vue"
import {defineConfig} from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: "index.ts",
      name: "Handbook",
      fileName: "handbook",
      formats: ["cjs", "es"],
    },
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: ["vitepress", "vitepress/theme", "vue"],
      // output: {compact: false},
    },
  },
})
