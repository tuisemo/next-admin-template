import { defineStore } from "pinia"

export const useAppStore = defineStore(
  `${import.meta.env.PUBLIC_APP_CODE}_app`,
  {
    state: () => ({
      name: "Guest",
      isAuthenticated: false
    }),
    getters: {},
    actions: {
      login(name: string) {
        this.name = name
        this.isAuthenticated = true
      }
    }
  }
)
