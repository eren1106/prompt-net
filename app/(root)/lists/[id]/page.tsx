import PromptCardList from '@/components/PromptCardList'
import { mockPrompts } from '@/constants'
import React from 'react'

const ListDetailPage = () => {
  return (
    <div>
      <h1 className='mb-3'>Whatever List</h1>
      <PromptCardList list={mockPrompts} />
    </div>
  )
}

export default ListDetailPage