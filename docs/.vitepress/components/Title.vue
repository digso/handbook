<script setup lang="ts">
  import {PageData, useData} from "vitepress"

  const {theme, page} = useData()
</script>

<script lang="ts">
  function ensurePrefix(raw: string, prefix: string) {
    return raw.startsWith(prefix) ? raw : prefix + raw
  }

  function ensureSuffix(raw: string, suffix: string) {
    return raw.endsWith(suffix) ? raw : raw + suffix
  }

  function capitalCase(raw: string) {
    return raw.charAt(0).toUpperCase() + raw.slice(1)
  }

  /**
   * 从侧边栏配置中获取当前页面的标题，
   * 如果未找到，则返回 "untitled"。
   * @param theme 从配置文件(.vitepress/config.ts)中读取的主题配置(themeConfig)
   * @param page 获取的当前页面信息，主要是获取其路径信息以匹配
   */
  function parseTitle(theme: any, page: PageData) {
    return (
      parseSidebar(theme.sidebar ?? [], ensurePrefix(page.filePath, "/")) ??
      "untitled"
    )
  }

  function parseSidebar(sidebar: Array<any>, path: string): string | undefined {
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
  <h1>{{ capitalCase(parseTitle(theme, page)) }}</h1>
</template>
