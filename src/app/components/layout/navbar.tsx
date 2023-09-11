"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Header from "./header";

export default function Navbar() {
  const session = useSession();
  return (
    <>
      <Header>Dashboard</Header>
    </>
  );
}
