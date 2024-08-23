import {DefaultTheme} from "vitepress"
import {ensurePrefix, ensureSuffix, removePrefix} from "./utils"
import {renderChineseSpaces} from "./wordless"

interface Menu {
  [base: string]: {
    /** 在顶部导航栏中显示的文字。 */
    nav: string

    /** 在侧边栏所需要显示的目录。 */
    items: DefaultTheme.SidebarItem[]
  }
}

/**
 * 对单个侧边栏目录({@link DefaultTheme.Sidebar}[])进行预处理。
 * 1. 确保所有链接都以 "/" 开头以避免路径错误。
 * 2. 对单个侧边栏进行中英文之间添加空格的渲染处理。
 */
function renderSingleSidebar(raw: DefaultTheme.SidebarItem[]) {
  const handler: DefaultTheme.SidebarItem[] = []
  for (const item of raw) {
    const temp: DefaultTheme.SidebarItem = {
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
 * 从所给 {@link Menu} 类型的目录中提取符合
 * {@link DefaultTheme.Sidebar} 格式的侧边栏目录。
 */
function renderSidebarMenus(raw: Menu): DefaultTheme.Sidebar {
  const handler: DefaultTheme.Sidebar = {}
  for (const key of Object.keys(raw)) {
    const value = raw[key]
    handler[key] = {base: key, items: renderSingleSidebar(value.items)}
  }
  return handler
}

/**
 * 从所给 {@link Menu} 类型的目录中提取符合
 * {@link DefaultTheme.NavItem}[] 格式的导航栏。
 */
function renderNavigatorMenus(raw: Menu): DefaultTheme.NavItem[] {
  const handler: DefaultTheme.NavItem[] = []
  for (const key of Object.keys(raw)) {
    const value = raw[key]
    const base = ensurePrefix(ensureSuffix(key, "/"), "/")
    const relative = removePrefix(value.items[0]?.link ?? "", "/")
    handler.push({text: value.nav, link: base + relative})
  }
  return handler
}

const menu: Menu = {
  spec: {nav: "规范", items: [{text: "数社编程规范", link: "intro"}]},
  vscode: {nav: "编辑器", items: [{text: "VSCode代码编辑器", link: "intro"}]},
  git: {nav: "版本控制", items: [{text: "Git版本控制", link: "intro"}]},
  web: {nav: "网页开发", items: [{text: "网页开发基础", link: "intro"}]},
  vue: {nav: "Vue", items: [{text: "Vue网页应用开发", link: "intro"}]},
  flutter: {
    nav: "Flutter",
    items: [
      {text: "Flutter跨平台应用开发", link: "intro"},
      {text: "Flutter环境搭建", link: "env"},
      {text: "Dart语法基础", link: "dart"},
    ],
  },
}

export const sidebarMenu = renderSidebarMenus(menu)
export const navMenu = renderNavigatorMenus(menu)
