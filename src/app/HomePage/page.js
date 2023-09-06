'use client'

import { useSession, getSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession()

  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/');
  //   },
  // })

  // useEffect(() => {
  //   const checkSeason = () => {
  //     console.log(status, "session", session, status === 'unauthenticated')
  //     if (status === 'unauthenticated') {
  //       redirect('/');
  //     }
  //   }
  //   checkSeason();
  // }, [status])

  const logoutHandler = () => {
    signOut({ redirect: false, callbackUrl: '/' });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="ml-auto flex gap-2">
        <>
          <h1>Protected Page</h1>
          <p>Hi {session?.user?.name}!</p>
          <Link href="/" onClick={logoutHandler}>
            Logout
          </Link>
        </>
      </div>

    </main>
  )
}
