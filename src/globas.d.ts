declare global {
  interface Window {
    __MICRO_APP_ENVIRONMENT__: boolean // 定义类型
    __MICRO_APP_BASE_ROUTE__: string // 定义类型
    __MICRO_APP_PUBLIC_PATH__: string // 定义类型
    mount: () => void
    unmount: () => void
  }
}
export {}
