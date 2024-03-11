import React from 'react'
import PromptDetails from '@/containers/prompt-details-page/components/PromptDetails';
import { getPromptById } from '@/services/prompt.service';
import CommentSection from '@/containers/prompt-details-page/components/CommentSection';
import { extractIdFromSlug } from '@/utils/utils';
import { notFound } from 'next/navigation';

const PromptDetailPage = async ({ params }: any) => {
  const { id } = params;
  const promptId = extractIdFromSlug(id);
  if(!promptId && promptId != 0) notFound(); // trigger 404 page
  const prompt = await getPromptById(Number(promptId));
  if(!prompt) notFound(); // trigger 404 page

  return (
    <div className='flex flex-col gap-4 w-full'>
      {/* PROMPT DETAILS SECTION */}
      <PromptDetails promptData={prompt} />

      {/* COMMENT SECTION */}
      <CommentSection promptId={promptId} />
    </div>
  )
}

export default PromptDetailPage