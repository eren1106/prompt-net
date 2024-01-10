import React from 'react'
import Link from 'next/link';

interface IPromptCardProps{
  title: string;
  description: string;
}

const PromptCard = ({title, description}: IPromptCardProps) => {
  return (
    <Link href='/prompts/123'>
      <div className='card cursor-pointer hover:transform hover:scale-105 transition-transform'>
        <p className='font-bold text-xl'>{title}</p>
        <p>
          {description}
        </p>
      </div>
    </Link>
  )
}

export default PromptCard