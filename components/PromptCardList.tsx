import React from 'react'
import PromptCard from './PromptCard';
import { Prompt } from '@prisma/client';

interface PromptCardListProps {
  list: Prompt[];
  max?: number; 
}

const PromptCardList: React.FC<PromptCardListProps> = ({ list, max }: PromptCardListProps) => {
  return (
    <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
      {
        list.slice(0, max || list.length).map((prompt: Prompt) =>
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