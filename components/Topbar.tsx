import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import LinkButton from './custom/LinkButton'

const Topbar = () => {
  return (
    <div className='h-16 border-b border-gray px-3 flex justify-between items-center bg-background'>
      <div>
        <Link href="/">
          <h1 className='text-xl font-extrabold'>PromptNet</h1>
        </Link>
      </div>
      <div className='flex gap-3'>
        <ModeToggle />
        <LinkButton href='login'>Log In</LinkButton>
      </div>
    </div>
  )
}

export default Topbar