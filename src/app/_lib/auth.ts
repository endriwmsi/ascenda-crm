import { db } from "./prisma";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email", placeholder: "E-mail" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) return null;

        const passwordMatch =
          existingUser.password &&
          (await compare(credentials.password, existingUser.password));

        if (!passwordMatch) return null;

        return {
          id: existingUser.id,
          name: existingUser.name || existingUser.email,
          email: existingUser.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
        },
      };
    },
  },
  // callbacks: {
  //   async session({ session, user }) {
  //     session.user = {
  //       ...session.user,
  //       id: user.id,
  //     } as any;

  //     return session;
  //   },
  // },
  secret: process.env.NEXT_AUTH_SECRET,
};
