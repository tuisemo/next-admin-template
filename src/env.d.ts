/// <reference types="@rsbuild/core/types" />

interface ImportMeta {
  glob<T = unknown>(
    pattern: string,
    options?: { eager?: boolean }
  ): Record<string, T>
}

declare module "*.vue" {
  import type { DefineComponent } from "vue"

  // biome-ignore lint/complexity/noBannedTypes: reason
  const component: DefineComponent<{}, {}, unknown>
  export default component
}

declare module "@/layouts/index" {
  export { AdminLayout, BasicLayout } from "@/layouts/index"
}
