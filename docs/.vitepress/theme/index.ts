import {Theme} from "vitepress"
import {Handbook} from "vitepress-handbook"
import DefaultTheme from "vitepress/theme"

export default {extends: DefaultTheme, Layout: Handbook} satisfies Theme
