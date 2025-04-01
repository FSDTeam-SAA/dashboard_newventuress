import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      token: string
      email: string
      fullName: string
      industry: string
      profession: string[]
      [key: string]: any // Allow additional dynamic properties
    }
  }

  interface User {
    id: string
    email: string
    fullName: string
    industry: string
    profession: string[]
    token: string
    [key: string]: any // Allow additional dynamic properties
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string
      token: string
      email: string
      fullName: string
      industry: string
      profession: string[]
      [key: string]: any // Allow additional dynamic properties
    }
  }
}

