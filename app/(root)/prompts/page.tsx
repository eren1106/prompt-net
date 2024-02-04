import React, { Suspense } from 'react'
import PromptCardList from '@/components/PromptCardList'

const getPrompts = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/prompts`);
  return res.json();
}

const PromptsPage = async () => {
  const res = await getPrompts();
  const prompts = res.data;

  return (
    <div className='flex flex-col'>
      <Suspense fallback={<div>Loading...</div>}>
        <PromptCardList list={prompts} />
      </Suspense>
    </div>
  )
}

export default PromptsPage