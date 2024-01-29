import { IPrompt } from '@/models/i-prompt';
import React from 'react'
import PromptCard from './PromptCard';

interface PromptCardListProps {
  list: IPrompt[];
  max?: number; 
}

const PromptCardList = ({ list, max }: PromptCardListProps) => {
  return (
    <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
      {
        list.slice(0, max || list.length).map((prompt: IPrompt) =>
          <PromptCard
            key={prompt.id}
            id={prompt.id}
            title={prompt.title}
            description={prompt.description}
          />
        )
      }
    </div>
  )
}

export default PromptCardList