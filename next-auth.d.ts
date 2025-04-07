// src/types/next-auth.d.ts or @types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      email: string;
      fullName: string;
      industry: string;
      profession: string[];
      [key: string]: any; // Allow additional dynamic properties
    };
  }

  interface User {
    token?: string; // Optional token in User response if required
  }
}
