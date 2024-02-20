import { getPromptTags } from '@/services/promptService';
import { Cross1Icon } from '@radix-ui/react-icons';
import React, { ReactNode, Suspense } from 'react'

interface TagProps {
  label: string;
}

interface TagWrapperProps {
  pointer?: boolean;
  children: ReactNode;
}

const TagWrapper = ({ pointer = false }: TagWrapperProps) => {
  return (
    <div className={`border rounded-3xl px-2 py-1 text-xs ${pointer && "cursor-pointer"}`}>
      + Add Tag
    </div>
  )
}

const Tag = ({ label }: TagProps) => {
  return (
    <div>
      <p>{label}</p>
      <Cross1Icon />
    </div>
  )
}



const TagsSelector = async () => {
  const tags = await getPromptTags();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='flex gap-2'>
        <TagWrapper pointer>
          + Add Tag
        </TagWrapper>
      </div>
    </Suspense>
  )
}

export default TagsSelector