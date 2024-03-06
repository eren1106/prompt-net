import React from 'react'
import PromptCard from './PromptCard';
import { Prompt } from '@/models/prompt.model';

interface PromptCardListProps {
  list: Prompt[];
  max?: number; 
}

const PromptCardList: React.FC<PromptCardListProps> = ({ list, max }: PromptCardListProps) => {
  return (
    <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
      {
        list.length > 0 ? list.slice(0, max || list.length).map((prompt: Prompt) =>
        <PromptCard
          key={prompt.id}
          promptData={prompt}
        />
      ) : <p className='italic text-grey'>Dont have any prompt yet!</p>
      }
    </div>
  )
}

export default PromptCardList