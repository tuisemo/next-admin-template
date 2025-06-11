import { execSync } from "node:child_process"
// plugins/version-generate.ts
import fs from "node:fs/promises"
import path from "node:path"
import type { RsbuildConfig, RsbuildPlugin } from "@rsbuild/core"

interface VersionGenerateOptions {
  outputPath?: string
}

export const pluginVersionGenerate = (
  options: VersionGenerateOptions = {}
): RsbuildPlugin => ({
  name: "pluginVersionGenerate",
  setup(api) {
    let version: string
    try {
      version = execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim()
    } catch (error) {
      console.error("[version-generate] Failed to get git version:", error)
      version = "unknown"
    }
    api.modifyHTMLTags(({ headTags, bodyTags }) => {
      headTags.push({
        tag: "meta",
        attrs: { name: "version", content: version }
      })
      return { headTags, bodyTags }
    })
    api.onAfterBuild(async () => {
      try {
        const outputPath = path.resolve(
          options.outputPath || "./dist/version.json"
        )
        await fs.writeFile(outputPath, JSON.stringify({ version }, null, 2))
        console.log("[version-generate] Version file created at:", outputPath)
      } catch (error) {
        console.error("[version-generate] Failed to write version file:", error)
      }
    })
  }
})
