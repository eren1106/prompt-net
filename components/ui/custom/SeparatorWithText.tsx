import React from 'react'
import { Separator } from '@/components/ui/separator'

interface SeparatorWithTextProp{
  text: string;
}

const SeparatorWithText = ({text}: SeparatorWithTextProp) => {
  return (
    <div className='flex items-center gap-3 my-5'>
      <Separator className='flex-1' />
      <p>{text}</p>
      <Separator className='flex-1' />
    </div>
  )
}

export default SeparatorWithText