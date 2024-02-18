import React, { Suspense } from 'react'
import PromptCardList from '@/components/PromptCardList'
import { FaSort } from "react-icons/fa";
import Searchbar from '@/components/custom/Searchbar';
import RadioSelectDropdown from '@/components/custom/RadioSelectDropdown';
import { mockDropdownItems } from '@/constants';

const getPrompts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/prompts`, { cache: 'no-store' });
  return res.json();
}

const PromptsPage = async () => {
  const res = await getPrompts();
  const prompts = res.data;
  console.log("PROMPTS", prompts);

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <Searchbar />
        <RadioSelectDropdown
          buttonChild={
            <div className='flex gap-3 items-center'>
              <p>Sort</p>
              <FaSort />
            </div>
          }
          items={mockDropdownItems}
          label="Sort by"
        />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <PromptCardList list={prompts} />
      </Suspense>
    </div>
  )
}

export default PromptsPage