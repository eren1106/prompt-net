import React, { Suspense } from 'react'
import PromptCardList from '@/components/PromptCardList'
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Searchbar from '@/components/custom/Searchbar';

const getPrompts = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/prompts`);
  return res.json();
}

const PromptsPage = async () => {
  const res = await getPrompts();
  const prompts = res.data;

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <Searchbar />

      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <PromptCardList list={prompts} />
      </Suspense>
    </div>
  )
}

export default PromptsPage