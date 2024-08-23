import {DefaultTheme} from "vitepress"
import {ensurePrefix} from "./utils"
import {renderChineseSpaces} from "./wordless"

type Sidebar = DefaultTheme.Sidebar
type SidebarItem = DefaultTheme.SidebarItem
type SidebarConfig = Map<string, SidebarItem[]>

/**
 * 对单个侧边栏目录({@link DefaultTheme.Sidebar}[])进行预处理。
 * 1. 确保所有链接都以 "/" 开头以避免路径错误。
 * 2. 对单个侧边栏进行中英文之间添加空格的渲染处理。
 */
function renderSingleSidebar(raw: SidebarItem[]) {
  const handler: SidebarItem[] = []
  for (const item of raw) {
    const temp: SidebarItem = {
      ...item,
      text: item.text ? renderChineseSpaces(item.text) : item.text,
      link: item.link ? ensurePrefix(item.link, "/") : item.link,
      items: item.items ? renderSingleSidebar(item.items) : item.items,
    }
    handler.push(temp)
  }
  return handler
}

/**
 * 1. 将VitePress的多侧边栏目录配置封装为键值对以简化配置。
 * 2. 对标题进行添加中英文之间空格的渲染。
 *
 * @param raw 键值对表示的最简数据
 * @returns 以VitePress配置所需要的格式输出
 */
function renderNestedMenu(raw: SidebarConfig): Sidebar {
  const handler: Sidebar = {}
  for (const [key, value] of raw) {
    handler[key] = {base: key, items: renderSingleSidebar(value)}
  }
  return handler
}

/** 所有侧边栏的配置，每个嵌套配置通过 {@link Map.set} 添加到其中。 */
const sidebar: SidebarConfig = new Map()
sidebar.set("flutter", [
  {
    text: "Flutter",
    link: "flutter",
    items: [
      {text: "Flutter环境搭建", link: "env"},
      {text: "Dart语法基础", link: "dart"},
    ],
  },
])
export default renderNestedMenu(sidebar)
