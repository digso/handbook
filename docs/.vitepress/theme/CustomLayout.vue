<script setup lang="ts">
  import {PageData, useData} from "vitepress"
  import DefaultTheme from "vitepress/theme"

  const {theme, page} = useData()
  const {Layout} = DefaultTheme
</script>

<script lang="ts">
  function ensurePrefix(raw: string, prefix: string) {
    return raw.startsWith(prefix) ? raw : prefix + raw
  }

  function ensureSuffix(raw: string, suffix: string) {
    return raw.endsWith(suffix) ? raw : raw + suffix
  }

  function removePrefix(raw: string, prefix: string) {
    return raw.startsWith(prefix) ? raw.slice(prefix.length) : raw
  }

  function capitalCase(raw: string) {
    return raw.charAt(0).toUpperCase() + raw.slice(1)
  }

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
   * 这里所处理的仅是单个侧边栏，如果有多个侧边栏配置就要在
   * {@link parseTitle} 中处理。
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
      <h1 class="title">{{ capitalCase(parseTitle(theme, page)) }}</h1>
    </template>
  </Layout>
</template>

<style scoped lang="scss">
  h1.title {
    font-size: 2em;
    font-weight: 600;
  }
</style>
