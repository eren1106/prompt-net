import React from 'react'
import Link from 'next/link';
import { StarIcon } from '@radix-ui/react-icons';
import { Card } from './ui/card';

interface IPromptCardProps {
  title: string;
  description: string;
}

const PromptCard = ({ title, description }: IPromptCardProps) => {
  return (
    <Link href='/prompts/123'>
      <Card className='cursor-pointer hover:transform hover:scale-105 transition-transform'>
        <div className='p-4 flex flex-col gap-1'>
          <div className='flex justify-end'>
            <div className='p-1 bg-muted rounded-lg text-[10px]'>
              ChatGPT
            </div>
          </div>
          <p className='font-bold text-xl'>{title}</p>
          <p>
            {description}
          </p>
          <div className='flex items-center justify-between'>
            <p className='text-xs text-gray-500'>Last update: 06/09/2023</p>
            <div className='flex gap-1 items-center'>
              <StarIcon />
              <p>69</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default PromptCard