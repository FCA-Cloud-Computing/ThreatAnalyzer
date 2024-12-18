import { useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export function useAuth() {
  const { token, setToken, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // Check token expiration
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        if (payload.exp * 1000 < Date.now()) {
          logout()
          router.push("/login")
        }
      } catch (error) {
        logout()
        router.push("/login")
      }
    }
  }, [token, logout, router])

  const refreshToken = async () => {
    try {
      const response = await fetch("/api/refresh-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setToken(data.access_token)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  return {
    isAuthenticated: !!token,
    token,
    refreshToken,
    logout: () => {
      logout()
      router.push("/login")
    },
  }
}