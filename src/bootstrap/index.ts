import Antd from "ant-design-vue"
import "ant-design-vue/dist/reset.css"
import type { App } from "vue"

const install = (app: App) => {
  app.use(Antd)
}
export default install
