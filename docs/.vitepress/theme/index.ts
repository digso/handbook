import {Theme} from "vitepress"
import DefaultTheme from "vitepress/theme"
import Title from "../components/Title.vue"

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    app.component("Title", Title)
  },
} satisfies Theme
