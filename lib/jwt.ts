import * as jose from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

export async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function createToken(payload: any, expiresIn: string = "15m") {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret)
  
  return jwt
}