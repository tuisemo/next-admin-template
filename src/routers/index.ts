import { AdminLayout } from "@/layouts/index"
import type { RouteRecordRaw } from "vue-router"

interface RouteModule {
  default: RouteRecordRaw[]
}

export const createRoutes = () => {
  const rootPath = window.__MICRO_APP_ENVIRONMENT__
    ? window.__MICRO_APP_BASE_ROUTE__
    : "/"

  const filesContext = import.meta.webpackContext("../modules/", {
    recursive: true,
    regExp: /route\.ts$/
  })
  const moduleRoutes: RouteRecordRaw[] = []
  for (const fileName of filesContext.keys()) {
    const fileModule = filesContext(fileName) as RouteModule

    // 在这里你可以使用你的模块
    moduleRoutes.push(...fileModule.default)
  }
  console.log("🚀 ~ createRoutes ~ moduleRoutes:", moduleRoutes)

  return [
    {
      path: rootPath,
      component: AdminLayout,
      children: moduleRoutes
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue")
    }
  ]
}
