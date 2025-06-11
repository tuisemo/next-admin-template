import microApp from "@micro-zoe/micro-app"

microApp.start({
  tagName: "micro-app", // 自定义标签名，默认为microApp
  iframe: false, // 全局开启iframe沙箱，默认为false
  inline: false, // 全局开启内联script模式运行js，默认为false
  destroy: false, // 全局开启destroy模式，卸载时强制删除缓存资源，默认为false
  ssr: false, // 全局开启ssr模式，默认为false
  "disable-scopecss": false, // 全局禁用样式隔离，默认为false
  "disable-sandbox": false, // 全局禁用沙箱，默认为false
  "keep-alive": false, // 全局开启保活模式，默认为false
  "disable-memory-router": false, // 全局关闭虚拟路由系统，默认值false
  "keep-router-state": false, // 子应用在卸载时保留路由状态，默认值false
  "disable-patch-request": false, // 关闭子应用请求的自动补全功能，默认值false
  iframeSrc: location.origin, // 设置iframe沙箱中iframe的src地址，默认为子应用所在页面地址
  inheritBaseBody: false // true: 采用基座标签 作为子应用的标签， false: 不采用
})
