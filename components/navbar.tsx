"use client"

import { Shield } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { useAuthStore } from "@/lib/store"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { token, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="font-bold text-xl">ThreatAnalyzer</span>
        </Link>
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
              <Link href="/threats" className="hover:text-primary">Threats</Link>
              <Link href="/reports" className="hover:text-primary">Reports</Link>
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}