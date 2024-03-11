import React from 'react'
import PromptCardList from '@/components/prompts/PromptCardList'
import { FaSort } from "react-icons/fa";
import Searchbar from '@/components/custom/Searchbar';
import RadioSelectDropdown from '@/components/custom/RadioSelectDropdown';
import { mockDropdownItems } from '@/constants';
import { getAllPrompts } from '@/services/prompt.service';

const PromptsPage = async () => {
  const prompts = await getAllPrompts();

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

      <PromptCardList list={prompts} />
    </div>
  )
}

export default PromptsPage