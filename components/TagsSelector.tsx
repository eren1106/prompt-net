import { getAllPromptTags } from '@/services/promptService';
import { Cross1Icon } from '@radix-ui/react-icons';
import React, { ReactNode, Suspense } from 'react'
import DropdownMenuButton from './custom/DropdownMenuButton';
import { Tag } from '@prisma/client';
import { Button } from './ui/button';

interface TagComponentProps {
  label: string;
}

interface TagWrapperProps {
  pointer?: boolean;
  children: ReactNode;
}

interface TagSelectorProps {
  tags: Tag[];
}

// const TagWrapper = ({ pointer = false, children, ...props }: TagWrapperProps, ref) => {
//   return (
//     <div className={`border rounded-3xl px-2 py-1 text-xs ${pointer && "cursor-pointer"}`} {...props}>
//       {children}
//     </div>
//   )
// }

const TagComponent = ({ label }: TagComponentProps) => {
  return (
    <div>
      <p>{label}</p>
      <Cross1Icon />
    </div>
  )
}

const TagsSelector = ({ tags }: TagSelectorProps) => {
  // const tags: Tag[] = await getAllPromptTags();
  const handleClickItem = (id: number) => {
    // select tag logic
  }

  return (
    <div className='flex gap-2'>
      <DropdownMenuButton
        title="Tags"
        items={
          tags.map(tag => ({
            label: tag.name,
            key: tag.id,
          }))
        }
        onClickItemById={handleClickItem}
      >
        <div className='border rounded-3xl px-2 py-1 text-xs cursor-pointer'>
          <p>+ Add Tag</p>
        </div>
      </DropdownMenuButton>
    </div>
  )
}

export default TagsSelector