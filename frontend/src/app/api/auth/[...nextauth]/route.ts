import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "read:user repo",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        if (!account.access_token || !profile.login) {
          throw new Error("Missing access token or login");
        }

        token.accessToken = account.access_token;
        token.login = profile.login;
      }

      return token;
    },

    async session({ session, token }) {
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
      }

      session.login = token.login;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/api/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
