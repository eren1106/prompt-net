import PromptForm from '@/components/prompts/PromptForm';
import { extractIdFromSlug } from '@/utils/utils';
import { getAllPromptTags, getPromptById } from '@/services/prompt.service';
import React from 'react'

const EditPromptPage = async ({ params }: any) => {
  const { id } = params;
  const promptId = extractIdFromSlug(id);
  const prompt = await getPromptById(Number(promptId));
  const tags = await getAllPromptTags();

  return (
    <div className='w-full'>
      <h1 className='mb-2'>Edit Prompt Template</h1>
      <PromptForm tags={tags} promptData={prompt} />
    </div>
  )
}

export default EditPromptPage