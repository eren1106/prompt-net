import React from 'react'
import PromptCard from '@/components/PromptCard'
import { mockPrompts } from '@/constants'
import { IPrompt } from '@/models/i-prompt'

const PromptsPage = () => {
  return (
    <div className='flex flex-col'>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
        {
          mockPrompts.map((prompt: IPrompt) => 
            <PromptCard
              key={prompt.id}
              title={prompt.title}
              description={prompt.description}
            />
          )
        }
      </div>
    </div>
  )
}

export default PromptsPage