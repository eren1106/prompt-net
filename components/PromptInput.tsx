import React from 'react'
import AutoResizeTextarea from './ui/AutoResizeTextarea';

interface PromptInputProps {
  label: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ label, value, onChange }) => {
  return (
    <div className=''>
      <p className='font-semibold px-2 pb-3 bg-gray-200 rounded-md w-min translate-y-2'>{label}</p>
      <AutoResizeTextarea
        placeholder={`Insert value for ${label}`}
        value={value}
        onChange={onChange}
        className='relative z-10'
      />
    </div>
  )
}

export default PromptInput