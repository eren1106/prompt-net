import { IPrompt } from '@/models/i-prompt';
import React from 'react'
import PromptCard from './PromptCard';

interface PromptCardListProps {
  list: IPrompt[];
}

const PromptCardList = ({ list }: PromptCardListProps) => {
  return (
    <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
      {
        list.map((prompt: IPrompt) =>
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