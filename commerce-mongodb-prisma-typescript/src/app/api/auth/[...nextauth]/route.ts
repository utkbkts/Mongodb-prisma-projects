import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import prisma from "@/libs/db/prismadb";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { mergeAnonymousCart } from "@/actions/Cart";

// NextAuthOptions türündeki yapılandırma seçenekleri
export const authOptions: NextAuthOptions = {
  // Prisma veritabanı adaptörü
  adapter: PrismaAdapter(prisma) as Adapter,

  // Kullanılacak kimlik sağlayıcıları
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // Auth olayları
  events: {
    // Kullanıcı giriş yaptığında tetiklenen olay
    async signIn({ user }) {
      // Anonim alışveriş sepetini kullanıcının sepetiyle birleştir
      await mergeAnonymousCart(user.id);
    }
  }
};

// Auth handler'ı
const handler = NextAuth(authOptions);

// GET ve POST taleplerini aynı handler ile yönet
export { handler as GET, handler as POST };
