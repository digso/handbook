<script setup lang="ts">
  import {PageData, useData} from "vitepress"
  import DefaultTheme from "vitepress/theme"

  const {theme, page} = useData()
  const {Layout} = DefaultTheme
</script>

<script lang="ts">
  import {
    ensurePrefix,
    ensureSuffix,
    maybeCapitalCase,
    removePrefix,
  } from "./handbook"

  /**
   * 对{@link parseSidebar}的封装，以直接从{@link useData}中获取数据。
   * 同时还要处理多重侧边栏的情况。
   *
   * @param theme 从配置文件(.vitepress/config.ts)中读取的主题配置(themeConfig)
   * @param page 获取的当前页面信息，主要是获取其路径信息以匹配
   */
  function parseTitle(theme: any, page: PageData) {
    const path = ensurePrefix(page.filePath, "/")
    const sidebar = theme.sidebar ?? []
    if (Array.isArray(sidebar)) {
      return parseSidebar(theme.sidebar, path)
    }
    for (const key in sidebar) {
      const items = sidebar[key]["items"]
      if (items && Array.isArray(items)) {
        const base = ensurePrefix(ensureSuffix(key, "/"), "/")
        const result = parseSidebar(items, removePrefix(path, base))
        if (result) return result
      }
    }
    return undefined
  }

  /**
   * 从给定侧边栏配置中获取当前页面的标题，若未找到则返回`undefined`。
   * 这里所处理的仅是单个侧边栏，若有多个侧边栏配置就应用 {@link parseTitle}。
   *
   * @param sidebar 从配置文件(.vitepress/config.ts)中获取的侧边栏结构
   * @param path 当前文件所在的路径(相对于服务器根目录的路径)
   */
  function parseSidebar(sidebar: Array<any>, path: string): string | undefined {
    path = ensurePrefix(path, "/")
    for (const item of sidebar) {
      if (ensureSuffix(item.link, ".md") === path) {
        return item.text
      } else if (item.items) {
        const title = parseSidebar(item.items, path)
        if (title) return title
      }
    }
    return undefined
  }
</script>

<template>
  <Layout>
    <!-- 所有doc页面自动显示标题 -->
    <template v-if="parseTitle(theme, page)" #doc-before>
      <h1 class="title">{{ maybeCapitalCase(parseTitle(theme, page)) }}</h1>
    </template>
  </Layout>
</template>

<style lang="scss">
  // 避免对非必要内容的选择。
  body {
    user-select: none;
    div.content-container {
      user-select: text;
    }
  }

  div.content-container {
    // 自动标题的样式。
    h1.title {
      font-size: 2em;
      font-weight: 600;
    }

    div.vp-doc {
      // 普通段落缩进并两端对齐，使中文排版更美观。
      p {
        text-indent: 2rem;
        text-align: justify;
        text-justify: inter-word;
      }

      // 除普通段落外的其他段落，如嵌套的内部段落，不添加缩进。
      div.custom-block p {
        text-indent: 0;
      }

      // 取消二级标题上面默认的分割线。
      h2 {
        margin-top: 32px;
        border-top: none;
      }
    }
  }
</style>
