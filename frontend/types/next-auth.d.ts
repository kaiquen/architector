import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    login: string;
  }

  interface User {
    accessToken: string;
    login: string;
  }

  interface Profile {
    login: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    login: string;
  }
}
