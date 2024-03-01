import PromptCardList from '@/components/PromptCardList'
import { extractIdFromSlug } from '@/lib/utils';
import { PromptList } from '@/models/prompt-list.model';
import { getPromptListById } from '@/services/prompt-list.service';
import { notFound } from 'next/navigation';
import React from 'react'

const ListDetailPage = async ({ params }: any) => {
  const { id } = params;
  const promptListId = extractIdFromSlug(id);
  if(!promptListId && promptListId != 0) notFound(); // trigger 404 page
  const promptList: PromptList = await getPromptListById(Number(promptListId));
  if(!promptList) notFound(); // trigger 404 page

  return (
    <div className='flex flex-col gap-3'>
      <h1>{promptList.title}</h1>
      <p>{promptList.description}</p>
      <PromptCardList list={promptList.prompts} />
    </div>
  )
}

export default ListDetailPage