import React from 'react'
import PromptCard from '@/components/PromptCard'

const PromptsPage = () => {
  return (
    <div className='flex flex-col'>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </div>
    </div>
  )
}

export default PromptsPage