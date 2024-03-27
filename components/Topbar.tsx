'use client'

import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import LinkButton from './custom/LinkButton'
import { useCurrentUser } from '@/hooks/current-user.hook'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { User } from '@/models/user.model'
import ProfileAvatar from './custom/ProfileAvatar'
import { DEFAULT_PROFILE_PIC_PATH } from '@/constants'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { CircleUser, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'


const Topbar = () => {
  const user: User = useCurrentUser();
  console.log("USER", user);

  const router = useRouter();

  const handleToProfile = () => {
    router.push(`/${user.username}`);
  }

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
      <div className='flex gap-3 items-center'>
        <ModeToggle />
        {user ?
          // <Button onClick={handleLogout}>Log Out</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='cursor-pointer'>
                <ProfileAvatar src={user.profilePicUri ?? DEFAULT_PROFILE_PIC_PATH} size="sm" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={handleToProfile}>
                <CircleUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          : <LinkButton href='login'>Log In</LinkButton>
        }
      </div>
    </div>
  )
}

export default Topbar