import {defineConfig} from "vitepress"

export default defineConfig({
  base: "/handbook/docs/",
  title: "数社软件开发手册",
  description: "软件开发基础知识文档",
  themeConfig: {
    nav: [
      {text: "首页", link: "/"},
      {text: "Flutter", link: "/flutter"},
    ],
    sidebar: {
      "/flutter/": {
        base: "/flutter/",
        items: [
          {
            text: "Flutter",
            link: "/flutter",
            items: [
              {text: "Flutter环境搭建", link: "/env"},
              {text: "Dart语法基础", link: "/dart"},
            ],
          },
        ],
      },
    },
    socialLinks: [{icon: "github", link: "https://github.com/digso/handbook"}],
  },
})
