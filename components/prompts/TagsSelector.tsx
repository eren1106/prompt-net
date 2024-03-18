import React from 'react'
import DropdownMenuButton from '../custom/DropdownMenuButton';
import { Tag } from '@prisma/client';
import { Cross2Icon } from '@radix-ui/react-icons';
import TagWrapper from './TagWrapper';

interface TagComponentProps {
  id: number;
  label: string;
  onDeleteItemById: (id: number) => void;
}

// interface TagWrapperProps {
//   pointer?: boolean;
//   children: ReactNode;
// }

interface TagSelectorProps {
  tags: Tag[];
  selectedTagIdList: number[];
  onToggleItem: (id: number) => void;
  maxSelectedItem?: number;
}

// const TagWrapper = ({ pointer = false, children, ...props }: TagWrapperProps, ref) => {
//   return (
//     <div className={`border rounded-3xl px-2 py-1 text-xs ${pointer && "cursor-pointer"}`} {...props}>
//       {children}
//     </div>
//   )
// }

const TagComponent = ({ id, label, onDeleteItemById }: TagComponentProps) => {
  return (
    <TagWrapper>
      <div className='flex gap-2'>
        <p>{label}</p>
        <Cross2Icon className='cursor-pointer' onClick={() => { onDeleteItemById(id) }} />
      </div>
    </TagWrapper>
  )
}

const TagsSelector = ({
  tags,
  selectedTagIdList,
  onToggleItem,
  maxSelectedItem = 3,
}: TagSelectorProps) => {
  return (
    <div className='flex gap-2'>
      {
        selectedTagIdList.map((selectedTagId: number) => {
          const tag = tags.find((tag: Tag) => tag.id === selectedTagId);
          return tag ?
            <TagComponent
              label={tag.name}
              id={tag.id}
              onDeleteItemById={onToggleItem}
            /> : <></>
        })
      }
      {
        selectedTagIdList.length < 3 && (
          <DropdownMenuButton
            title="Tags"
            items={
              tags.filter((tag: Tag) => !selectedTagIdList.includes(tag.id))
                .map((tag: Tag) => ({
                  label: tag.name,
                  key: tag.id,
                }))
            }
            onClickItemById={onToggleItem}
          >
            <div className='border rounded-3xl px-2 py-1 text-xs cursor-pointer'>
              <p>+ Add Tag</p>
            </div>
          </DropdownMenuButton>
        )
      }
    </div>
  )
}

export default TagsSelector