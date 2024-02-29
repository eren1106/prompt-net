import React, { Suspense } from 'react'
import PromptDetails from '@/components/PromptDetails';
import { getPromptById } from '@/services/prompt.service';
import CommentSection from '@/components/CommentSection';
import { extractIdFromSlug } from '@/lib/utils';

const PromptDetailPage = async ({ params }: any) => {
  const { id } = params;
  const promptId = extractIdFromSlug(id);
  const prompt = await getPromptById(Number(promptId));

  return (
    <div className='flex flex-col gap-4 w-full'>
      {/* PROMPT DETAILS SECTION */}
      <PromptDetails promptData={prompt} />

      {/* COMMENT SECTION */}
      <CommentSection />
    </div>
  )
}

export default PromptDetailPage