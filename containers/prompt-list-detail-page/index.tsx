import PromptCardList from '@/components/PromptCardList'
import PromptListForm from '@/components/PromptListForm';
import DialogButton from '@/components/custom/DialogButton';
import { Button } from '@/components/ui/button';
import { extractIdFromSlug } from '@/utils/utils';
import { PromptList } from '@/models/prompt-list.model';
import { getPromptListById } from '@/services/prompt-list.service';
import { Pencil } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react'

const ListDetailPage = async ({ params }: any) => {
  const { id } = params;
  const promptListId = extractIdFromSlug(id);
  if (!promptListId && promptListId != 0) notFound(); // trigger 404 page
  const promptList: PromptList = await getPromptListById(Number(promptListId));
  if (!promptList) notFound(); // trigger 404 page
  console.log("PROMPT", promptList);

  return (
    <div className='flex flex-col gap-3 w-full'>
      <section>
        <div className='flex justify-between items-center'>
          <h1>{promptList.title}</h1>
          <DialogButton
            className='flex gap-2 items-center'
            variant="secondary"
            title="Edit List"
            content={<PromptListForm promptListData={promptList} />}
          >
            <Pencil size={16} />
            Edit
          </DialogButton>
        </div>
        <p>{promptList.description}</p>
      </section>
      <section className='flex flex-col gap-2'>
        <h1>Prompts:</h1>
        <PromptCardList list={promptList.prompts} />
      </section>
    </div>
  )
}

export default ListDetailPage