import {defineConfig} from "vitepress"
import {chineseSearchOptimize, pagefindPlugin} from "vitepress-plugin-pagefind"
import {Menu, renderNavigatorMenus, renderSidebarMenus} from "./menu"
import {wordless} from "./wordless"

const menu: Menu = {
  spec: {nav: "规范", items: [{text: "数社编程规范", link: "intro"}]},
  vscode: {nav: "编辑器", items: [{text: "VSCode代码编辑器", link: "intro"}]},
  git: {nav: "版本控制", items: [{text: "Git版本控制", link: "intro"}]},
  web: {nav: "互联网", items: [{text: "互联网和网页知识", link: "intro"}]},
  cloud: {nav: "服务器", items: [{text: "服务器运维", link: "intro"}]},
  vue: {nav: "Vue", items: [{text: "Vue网页应用开发", link: "intro"}]},
  flutter: {
    nav: "Flutter",
    items: [
      {text: "Flutter跨平台应用开发", link: "intro"},
      {text: "Flutter环境搭建", link: "env"},
      {text: "Dart语法基础", link: "dart"},
    ],
  },
  go: {nav: "Go", items: [{text: "Go服务器开发", link: "intro"}]},
  rust: {nav: "Rust", items: [{text: "Rust编程语言", link: "intro"}]},
  native: {nav: "原生开发", items: [{text: "原生平台开发", link: "intro"}]},
}

export default defineConfig({
  markdown: {config: (md) => md.use(wordless)},
  vite: {
    plugins: [
      pagefindPlugin({
        btnPlaceholder: "全局搜索",
        placeholder: "全局搜索关键词",
        emptyText: "找不到相关内容",
        heading: "共: {{searchResult}} 条结果",
        customSearchQuery: chineseSearchOptimize,
      }),
    ],
  },
  base: "/handbook/",
  lang: "zh-CN",
  title: "数社软件开发手册",
  description: "软件开发基础知识文档",
  themeConfig: {
    nav: renderNavigatorMenus(menu),
    sidebar: renderSidebarMenus(menu),
    socialLinks: [{icon: "github", link: "https://github.com/digso/handbook"}],
    outline: {label: "页面大纲", level: [1, 2]},
    docFooter: {prev: "前页", next: "后页"},
    editLink: {
      text: "在 GitHub 上编辑此页面",
      pattern: "https://github.com/digso/handbook/edit/dev/:path",
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
