import { useUserStore } from "@/stores/userStore"
import axios from "axios"
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios"

class Request<T = unknown> {
  private _instance: AxiosInstance
  private _cache = new Map<string, { data: unknown; expire: number }>()
  private _defaultCacheTime = 5000 // 5秒缓存
  // token现在从userStore动态获取

  /**
   * 快捷GET请求
   * @param url 请求地址
   * @param params 查询参数
   * @param config 额外配置
   */
  get<R = T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) {
    return this._instance.get<R>(url, { params, ...config })
  }

  /**
   * 快捷POST请求
   * @param url 请求地址
   * @param data 请求体数据
   * @param config 额外配置
   */
  post<R = T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this._instance.post<R>(url, data, config)
  }

  /**
   * 快捷PUT请求
   * @param url 请求地址
   * @param data 请求体数据
   * @param config 额外配置
   */
  put<R = T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this._instance.put<R>(url, data, config)
  }

  /**
   * 快捷DELETE请求
   * @param url 请求地址
   * @param config 额外配置
   */
  delete<R = T>(url: string, config?: AxiosRequestConfig) {
    return this._instance.delete<R>(url, config)
  }

  /**
   * 序列化查询参数为字符串
   * @param params 查询参数对象
   * @returns 序列化后的参数字符串
   */
  private serializeParams(params: Record<string, unknown>): string {
    const searchParams = new URLSearchParams()
    for (const key of Object.keys(params).sort()) {
      searchParams.append(key, String(params[key]))
    }
    return searchParams.toString()
  }

  /**
   * 根据配置对象生成缓存键
   * @param config 请求配置对象
   * @returns 生成的缓存键字符串
   */
  private getCacheKey({
    method = "GET",
    url,
    params
  }: InternalAxiosRequestConfig): string {
    const methodKey = method.toUpperCase()
    return methodKey === "GET" && params
      ? `${methodKey}:${url}?${this.serializeParams(params)}`
      : `${methodKey}:${url}`
  }

  /**
   * 从缓存中获取指定键的数据
   *
   * @param key 缓存键
   * @returns 缓存中的数据，如果缓存已过期或不存在则返回null
   */
  private getCache(key: string): unknown {
    const cached = this._cache.get(key)
    if (cached && cached.expire > Date.now()) {
      return cached.data
    }
    this._cache.delete(key)
    return null
  }

  /**
   * 设置缓存
   *
   * @param key 缓存的键
   * @param data 缓存的数据
   * @param cacheTime 缓存的过期时间，单位为毫秒。如果不指定，则使用默认缓存时间
   */
  private setCache(key: string, data: unknown, cacheTime?: number): void {
    this._cache.set(key, {
      data,
      expire: Date.now() + (cacheTime || this._defaultCacheTime)
    })
  }
  constructor(config: AxiosRequestConfig) {
    this._instance = axios.create({
      ...config,
      baseURL: config.baseURL || import.meta.env.API_BASE_URL,
      timeout: 10000
    })
    this._instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (config.method?.toUpperCase() === "GET") {
          const cacheKey = this.getCacheKey(config)
          const cachedData = this.getCache(cacheKey)
          if (cachedData) {
            return {
              ...config,
              adapter: () =>
                Promise.resolve({
                  data: cachedData,
                  status: 200,
                  statusText: "OK",
                  headers: {},
                  config
                })
            }
          }
        }

        // 添加认证头
        const userStore = useUserStore()
        const token = userStore.token
        if (token) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this._instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.config.method?.toUpperCase() === "GET") {
          const cacheKey = this.getCacheKey(response.config)
          this.setCache(cacheKey, response.data)
        }
        return response
      },
      (error) => {
        let message: string
        switch (error.response.status) {
          case 400:
            message = "请求错误(400)"
            break
          case 401:
            message = "未授权，请重新登录(401)"
            break
          case 403:
            message = "拒绝访问(403)"
            break
          case 404:
            message = "请求出错(404)"
            break
          case 408:
            message = "请求超时(408)"
            break
          case 500:
            message = "服务器错误(500)"
            break
          case 501:
            message = "服务未实现(501)"
            break
          case 502:
            message = "网络错误(502)"
            break
          case 503:
            message = "服务不可用(503)"
            break
          case 504:
            message = "网络超时(504)"
            break
          case 505:
            message = "HTTP版本不受支持(505)"
            break
          default:
            message = `连接出错(${error.response.status})!`
        }
        console.log("请求错误:", message)
        return Promise.reject(error)
      }
    )
  }
}
export default new Request({})
