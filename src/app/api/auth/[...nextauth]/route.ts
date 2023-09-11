import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle-db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    updateAge: 24 * 60 * 60 * 4, // 4 days
    strategy: "jwt",
    //   // maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Include user.id on session
  callbacks: {
    async jwt({ token, account }) {
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
        };
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // ...add more providers here¨
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
