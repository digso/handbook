import {defineConfig} from "vitepress"
import sidebarMenu from "./menu"
import {wordless} from "./wordless"

export default defineConfig({
  markdown: {config: (md) => md.use(wordless)},
  base: "/handbook/docs/",
  title: "数社软件开发手册",
  description: "软件开发基础知识文档",
  themeConfig: {
    nav: [
      {text: "首页", link: "/"},
      {text: "Flutter", link: "/flutter/flutter"},
    ],
    sidebar: sidebarMenu,
    socialLinks: [{icon: "github", link: "https://github.com/digso/handbook"}],
  },
})
