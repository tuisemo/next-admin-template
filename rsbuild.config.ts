import { defineConfig } from "@rsbuild/core"
import { pluginImageCompress } from "@rsbuild/plugin-image-compress"
import { pluginSass } from "@rsbuild/plugin-sass"
import { pluginVue } from "@rsbuild/plugin-vue"
import { pluginVersionGenerate } from "./plugins/version-generate"

export default defineConfig(({ env, command, envMode }) => ({
  plugins: [
    pluginVersionGenerate(),
    pluginVue(),
    pluginSass(),
    pluginImageCompress()
  ],
  dev: {
    // 与本地开发有关的选项
    lazyCompilation: true
  },
  html: {
    // 与 HTML 生成有关的选项
    mountId: "root",
    template: "./public/index.html",
    title: "Rsbuild Demo"
  },
  tools: {
    // 与底层工具有关的选项
  },
  output: {
    // 与构建产物有关的选项
    polyfill: "usage",
    cleanDistPath: true
  },
  resolve: {
    // 与模块解析相关的选项
    alias: {
      "@": "./src"
    }
  },
  source: {
    // 与输入的源代码相关的选项
    entry: {
      index: "./src/index.ts"
    }
  },
  server: {
    // 与 Rsbuild 服务器有关的选项
    // 在本地开发和预览时都会生效
    port: 3000,
    open: true,
    base: "/",
    proxy: {
      "/mock": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: { "^/mock": "" }
      },
      "/api": {
        target: "http://localhost:8080"
      }
    }
  },
  security: {
    // 与 Web 安全有关的选项
  },
  performance: {
    // 与构建性能、运行时性能有关的选项
    chunkSplit: {
      strategy: "split-by-experience"
    },
    removeConsole: ["log", "warn"]
  },
  environments: {
    // 为每个环境定义不同的 Rsbuild 配置
  }
}))
