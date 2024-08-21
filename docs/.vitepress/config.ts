import {defineConfig} from "vitepress"

export default defineConfig({
  base: "/handbook/docs/",
  title: "数社软件开发手册",
  description: "软件开发基础知识文档",
  themeConfig: {
    nav: [{text: "首页", link: "/"}],
    sidebar: [{text: "Flutter", link: "/flutter"}],
    socialLinks: [{icon: "github", link: "https://github.com/digso/handbook"}],
  },
})
