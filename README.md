# Rsbuild project

## 网络请求工具使用指南

### 基础使用
```typescript
import request from '@/utils/request'

// GET请求
request.get('/api/data').then(data => {
  console.log(data)
})

// POST请求
request.post('/api/login', { username, password })
```

### 高级功能
1. **请求缓存**：
```typescript
request.get('/api/products', {
  cache: true,
  cacheTime: 300000 // 缓存5分钟
})
```

2. **防抖/节流请求**：
```typescript
// 防抖请求(300ms)
request.debouncedRequest(config)

// 节流请求(1s)
request.throttledRequest(config)
```

3. **请求取消**：
```typescript
const controller = new AbortController()
request.get('/api/data', {
  signal: controller.signal
})

// 取消请求
controller.abort()
```

4. **错误处理**：
```typescript
request.get('/api/data').catch(err => {
  console.error(err.code) // 错误码
  console.error(err.message) // 错误信息
  console.error(err.data) // 响应数据(如果有)
})
```

### 配置项
| 参数 | 类型 | 说明 |
|------|------|------|
| cache | boolean | 是否启用缓存 |
| cacheTime | number | 缓存时间(毫秒) |
| retry | number | 重试次数 |
| retryDelay | number | 重试延迟(毫秒) |
| signal | AbortSignal | 用于取消请求 |

完整示例见：[src/utils/request.example.ts](src/utils/request.example.ts)

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```
