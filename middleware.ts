import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/jwt"

const publicPaths = ["/login", "/register", "/"]

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-storage")?.value
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && isPublicPath && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (token) {
    try {
      const payload = await verifyToken(token)
      if (!payload) {
        request.cookies.delete("auth-storage")
        return NextResponse.redirect(new URL("/login", request.url))
      }
    } catch (error) {
      request.cookies.delete("auth-storage")
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}