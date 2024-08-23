import {Theme} from "vitepress"
import DefaultTheme from "vitepress/theme"
import CustomLayout from "./CustomLayout.vue"

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  // enhanceApp({app}) {},
} satisfies Theme
