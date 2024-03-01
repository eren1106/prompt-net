import ListCard from '@/components/ListCard'
import { Button } from '@/components/ui/button'
import { PromptList } from '@/models/prompt-list.model'
import { getAllPromptLists } from '@/services/prompt-list.service'
import React from 'react'

const ListsPage = async () => {
  const lists: PromptList[] = await getAllPromptLists();

  return (
    <div className='w-full'>
      <div className='flex justify-between mb-3'>
        <div className='flex items-center gap-2'>
          <h1>Lists</h1>
          <p className='font-thin text-2xl text-gray-300'>(6)</p>
        </div>
        <Button>
          Create List
        </Button>
      </div>

      <div className='flex flex-col gap-3'>
        {
          lists.map((list: PromptList) => <ListCard promptList={list} />)
        }
      </div>
    </div>
  )
}

export default ListsPage