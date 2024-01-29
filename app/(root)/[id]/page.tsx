import PromptCardList from '@/components/PromptCardList'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockPrompts } from '@/constants'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className='flex gap-12'>
      {/* LEFT */}
      <div className='flex flex-col gap-4 w-2/6'>
        <Avatar className='w-44 h-auto'>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Img</AvatarFallback>
        </Avatar>
        <div>
          <h1>Your Full Name</h1>
          <p className='bg-secondary rounded-xl px-3 py-1 w-min'>yourusername</p>
        </div>
        <p>Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque voluptates ipsum rem commodi sint corporis non quod laboriosam ab?</p>
      </div>

      {/* RIGHT */}
      <div className='flex flex-col gap-3 w-4/6'>
        <div>
          <h1>Created Prompts</h1>
          <PromptCardList list={mockPrompts} max={3} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage