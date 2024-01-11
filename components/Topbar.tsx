import React from 'react'
import { ModeToggle } from './ModeToggle'

const Topbar = () => {
  return (
    <div className='d border-b border-gray p-3 flex justify-between items-center'>
      <h1 className='text-xl font-extrabold'>PromptNet</h1>
      <ModeToggle />
    </div>
  )
}

export default Topbar