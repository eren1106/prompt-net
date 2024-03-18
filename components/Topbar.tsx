import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'

const Topbar = () => {
  return (
    <div className='h-16 border-b border-gray px-3 flex justify-between items-center bg-background'>
      <Link href="/">
        <h1 className='text-xl font-extrabold'>PromptNet</h1>
      </Link>
      <ModeToggle />
    </div>
  )
}

export default Topbar