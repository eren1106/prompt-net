import React, { ReactNode } from 'react'

interface TagWrapperProps {
  children: ReactNode;
}

const TagWrapper = ({children}: TagWrapperProps) => {
  return (
    <div className='border rounded-3xl px-2 py-1 text-xs'>
      {children}
    </div>
  )
}

export default TagWrapper