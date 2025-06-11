import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "Guest",
    isAuthenticated: false
  }),
  getters: {
    greeting: (state) => `Hello, ${state.name}`,
    token: (state) => `token${state.name}`
  },
  actions: {
    login(name: string) {
      this.name = name
      this.isAuthenticated = true
    },
    logout() {
      this.name = "Guest"
      this.isAuthenticated = false
    }
  }
})
