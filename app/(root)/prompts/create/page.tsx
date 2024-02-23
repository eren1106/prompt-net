import PromptForm from '@/components/PromptForm'
import { getAllPromptTags } from '@/services/prompt.service'
import React from 'react'

const CreatePromptPage = async () => {
  const tags = await getAllPromptTags();
  
  return (
    <div className='w-full'>
      <h1 className='mb-2'>Create Prompt Template</h1>
      <PromptForm tags={tags} />
    </div>
  )
}

export default CreatePromptPage