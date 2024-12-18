import axios, { AxiosError } from "axios"
import { useAuthStore } from "./store"
import { useToast } from "@/hooks/use-toast"

export const createApiClient = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
  })

  api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const { toast } = useToast()
      
      if (error.response?.status === 401) {
        const { refreshToken, logout } = useAuthStore.getState()
        try {
          const success = await refreshToken()
          if (success && error.config) {
            return api(error.config)
          }
          logout()
          window.location.href = "/login"
        } catch (refreshError) {
          logout()
          window.location.href = "/login"
        }
      }

      if (error.response?.status === 429) {
        toast({
          title: "Rate Limit Exceeded",
          description: "Please wait a moment before trying again",
          variant: "destructive",
        })
      }

      return Promise.reject(error)
    }
  )

  return api
}

export const api = createApiClient()