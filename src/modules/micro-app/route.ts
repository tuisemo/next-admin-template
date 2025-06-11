export default [
  {
    path: "app1",
    name: "App1",
    component: () => import("./app1.vue"),
    meta: {
      title: "示例应用1"
    }
  }
  // 可以继续添加更多路由配置
]
