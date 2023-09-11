import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/session-provider";
import { Inter } from "next/font/google";
import TrpcProvider from "./_trpc/provider";

const font = Inter({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  title: "Next13 Trpc Drizzle Next-Auth Starter",
  description:
    "A simple starter featuring T3 stack with drizzle instead of Prisma and App router.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${font.className} dark:bg-slate-950 bg-slate-50 text-slate-700 dark:text-slate-300`}
      >
        <main>
          <SessionProvider session={session}>
            <TrpcProvider>{children}</TrpcProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
