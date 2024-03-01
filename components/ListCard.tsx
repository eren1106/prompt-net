import React from 'react'
import { Card } from './ui/card'
import Link from 'next/link'
import { convertIdTitleToSlug } from '@/lib/utils';
import { PromptList } from '@/models/prompt-list.model';

interface ListCardProps {
  promptList: PromptList;
}

const ListCard = ({promptList}: ListCardProps) => {
  return (
    <Link href={`/lists/${convertIdTitleToSlug(promptList.id, promptList.title)}`}>
      <Card className='cursor-pointer'>
        <div className='flex items-center justify-between'>
          <h1>{promptList.title}</h1>
          <p className='text-sm text-gray-500'>{`${promptList.prompts.length} prompts`}</p>
        </div>
        <p className='mt-2'>{promptList.description}</p>
      </Card>
    </Link>
  )
}

export default ListCard