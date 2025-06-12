import type { PluginRegistryModel } from "@/bootstrap/core/plugin-loader"
import XFooter from "./components/footer.vue"

export default {
  install: (registry: PluginRegistryModel) => {
    registry.register("XFooter", XFooter)
  }
}
