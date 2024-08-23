import {DefaultTheme} from "vitepress"

type Sidebar = DefaultTheme.Sidebar
type SidebarItem = DefaultTheme.SidebarItem
type SidebarConfig = Map<string, SidebarItem[]>

function renderNestedMenu(raw: SidebarConfig): Sidebar {
  const handler: Sidebar = {}
  for (const [key, value] of raw) {
    handler[key] = {base: key, items: value}
  }
  return handler
}

const sidebar: SidebarConfig = new Map()
sidebar.set("flutter", [
  {
    text: "Flutter",
    link: "flutter",
    items: [
      {text: "Flutter环境搭建", link: "/env"},
      {text: "Dart语法基础", link: "/dart"},
    ],
  },
])
export default renderNestedMenu(sidebar)
