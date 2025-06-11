import request from "@/utils/request"

export function getUserList(params: Record<string, unknown> | undefined) {
  return request.get("/api/za/tianqi.php", params)
}
