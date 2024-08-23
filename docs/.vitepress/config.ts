import {defineConfig} from "vitepress"
import {navMenu, sidebarMenu} from "./menu"
import {wordless} from "./wordless"

export default defineConfig({
  markdown: {config: (md) => md.use(wordless)},
  base: "/handbook/docs/",
  lang: "zh-CN",
  title: "数社软件开发手册",
  description: "软件开发基础知识文档",
  themeConfig: {
    nav: navMenu,
    sidebar: sidebarMenu,
    socialLinks: [{icon: "github", link: "https://github.com/digso/handbook"}],
    outline: {label: "页面大纲", level: [1, 2]},
    docFooter: {prev: "前页", next: "后页"},
    editLink: {
      text: "在 GitHub 上编辑此页面",
      pattern: "https://github.com/aprosail/notes/edit/dev/:path",
    },
    lastUpdated: {
      text: "最近更新时间",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
        forceLocale: true,
      },
    },
  },
})
