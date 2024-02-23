import React, { Suspense } from 'react'
import PromptDetails from '@/components/PromptDetails';
import { getPromptById } from '@/services/prompt.service';
import CommentSection from '@/components/CommentSection';

const PromptDetailPage = async ({ params }: any) => {
  const { id } = params;
  const prompt = await getPromptById(Number(id));

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