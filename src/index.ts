import "./bootstrap/public-path"
import { type App, createApp } from "vue"
import {
  type RouterHistory,
  createRouter,
  createWebHashHistory
} from "vue-router"
import RootApp from "./App.vue"
import bootstrap from "./bootstrap/index"
import { createRoutes } from "./routers/index"
import pinia from "./stores"
import "./styles/index.css"

let app: App<Element> | null = null
let router = null
let history: RouterHistory | null = null

// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
  history = createWebHashHistory()
  const routes = createRoutes()
  router = createRouter({
    history,
    routes
  })

  app = createApp(RootApp)
  app.use(router)
  app.use(bootstrap)
  app.use(pinia)
  app.mount("#root")
}

// 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => {
  if (app) {
    app.unmount()
  }
  if (history) {
    history.destroy()
  }
  app = null
  router = null
  history = null
}

// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount()
}
