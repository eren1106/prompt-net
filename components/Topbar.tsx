'use client'

import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import LinkButton from './custom/LinkButton'
import { useCurrentUser } from '@/hooks/current-user.hook'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const Topbar = () => {
  const user = useCurrentUser();
  console.log("USER", user);

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  }

  return (
    <div className='fixed top-0 w-full z-10 h-16 border-b border-gray px-3 flex justify-between items-center bg-background'>
      <div>
        <Link href="/">
          <h1 className='text-xl font-extrabold'>PromptNet</h1>
        </Link>
      </div>
      <div className='flex gap-3'>
        <ModeToggle />
        {user ?
          <Button onClick={handleLogout}>Log Out</Button>
          : <LinkButton href='login'>Log In</LinkButton>
        }
      </div>
    </div>
  )
}

export default Topbar