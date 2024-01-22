import React from 'react'
import { Card } from './ui/card'

const ListCard = () => {
  return (
    <Card className='cursor-pointer'>
      <div className='flex items-center justify-between'>
        <h1>Title</h1>
        <p className='text-sm text-gray-500'>69 prompts</p>
      </div>
      <p className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat qui corrupti id accusamus voluptates minus enim obcaecati nemo vel dicta?</p>
    </Card>
  )
}

export default ListCard