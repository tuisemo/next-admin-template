import BaseFooter from "@/components/base-footer/index.vue"
import type { App, Component } from "vue"

export interface PluginRegistryModel {
  _registry: Map<string, unknown>
  register(name: string, component: Component, isOverride?: boolean): void
  resolve(name: string, fallbackComponent: Component): Component
}

class PluginRegistry implements PluginRegistryModel {
  _registry: Map<string, unknown> = new Map()

  // 注册组件
  register(name: string, component: Component, isOverride = false) {
    if (this._registry.has(name) && !isOverride) {
      console.warn(`[组件冲突] ${name} 已存在`)
      return
    }
    this._registry.set(name, component)
  }

  // 获取组件
  resolve(name: string, fallbackComponent: Component) {
    return this._registry.get(name) || fallbackComponent
  }
}

class PluginLoader {
  async load(clientId: string) {
    const pluginRegistry = new PluginRegistry()
    try {
      const pluginModule = await import(`@/plugins/${clientId}/entry`)
      if (pluginModule.default) {
        pluginModule.default.install(PluginRegistry)
      }
    } catch (error) {
      console.error(`[插件加载失败] ${clientId}`, error)
    }
    return pluginRegistry
  }
}

const clientId = import.meta.env.PUBLIC_CLIENT_ID
const install = async (app: App) => {
  const registry = await new PluginLoader().load(clientId)
  const XFooter = registry.resolve("XFooter", BaseFooter)
  app.component("XFooter", XFooter)
}
export default install
