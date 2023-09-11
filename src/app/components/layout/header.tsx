"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const { status, data: session } = useSession();
  return (
    <>
      <div className="mb-14">
        <div className="fixed inset-x-0 top-0 z-50 flex h-14 w-full items-center justify-between px-2 py-0 backdrop-blur-sm">
          <div className="flex flex-row items-center gap-3">
            <div className="text-neutral-950 dark:text-neutral-50 tracking-tight font-semibold uppercase">
              {children}
            </div>
          </div>

          <div className="">
            {status === "unauthenticated" && (
              <button onClick={() => signIn()}>Sign in</button>
            )}
            {status === "authenticated" && (
              <div className="flex flex-row gap-x-3">
                Hello {session.user?.name}
                <button onClick={() => signOut()}>Sign out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
