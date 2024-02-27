import React from 'react'
import Link from 'next/link';
import { StarIcon } from '@radix-ui/react-icons';
import { Card } from './ui/card';
import { Prompt } from '@/models/prompt.model';
import { getPlatformByName } from '@/services/prompt.service';
import { convertDateToTimeAgoStr } from '@/lib/utils';
import { Tag } from '@prisma/client';
import TagWrapper from './TagWrapper';

interface PromptCardProps {
  promptData: Prompt;
}

const PromptCard = ({ promptData }: PromptCardProps) => {

  return (
    <Link href={`/prompts/${promptData.id}`}>
      <Card className='cursor-pointer hover:transform hover:scale-105 transition-transform w-72 h-56'>
        <div className='flex flex-col gap-1 h-full'>
          {/* TAGS SECTION */}
          <section className='flex justify-between items-center mb-1'>
            <div className='flex gap-2 items-center'>
              {promptData.tags.map((tag: Tag) => <TagWrapper>{tag.name}</TagWrapper>)}
            </div>
            <div className='p-1 bg-muted rounded-lg text-[10px]'>
              {getPlatformByName(promptData.platform)?.label}
            </div>
          </section>

          {/* CONTENT SECTION */}
          <p className='font-bold text-xl'>{promptData.title}</p>
          <p className='line-clamp-3'>
            {promptData.description}
          </p>

          {/* BOTTOM SECTION */}
          <section className='flex items-center justify-between mt-auto'>
            <p className='text-xs text-gray-500'>{convertDateToTimeAgoStr(promptData.createdDatetime)}</p>
            <div className='flex gap-1 items-center'>
              <StarIcon />
              <p>69</p>
            </div>
          </section>
        </div>
      </Card>
    </Link>
  )
}

export default PromptCard