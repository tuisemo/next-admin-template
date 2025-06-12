import Antd from "ant-design-vue"
import "ant-design-vue/dist/reset.css"
import type { App } from "vue"
import pluginLoader from "./core/plugin-loader"

const install = async (app: App) => {
  app.use(Antd)
  app.use(pluginLoader)
}
export default install
