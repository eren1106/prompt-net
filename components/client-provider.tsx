'use client'

import { SessionProvider } from "next-auth/react"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Provider({
  children,
  session
}: {
  children: React.ReactNode
  session: any
}): React.ReactNode {
  return <SessionProvider session={session}>
    <ProgressBar />
    {children}
  </SessionProvider>
}