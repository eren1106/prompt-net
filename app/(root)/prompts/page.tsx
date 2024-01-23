import React from 'react'
import { mockPrompts } from '@/constants'
import PromptCardList from '@/components/PromptCardList'

const PromptsPage = () => {
  return (
    <div className='flex flex-col'>
      <PromptCardList list={mockPrompts} />
    </div>
  )
}

export default PromptsPage