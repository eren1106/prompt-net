import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'
import AutoResizeTextarea from './AutoResizeTextarea';

interface PromptInputProps {
  label: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ label, value, onChange }) => {
  return (
    <div className=''>
      <label className='font-semibold px-2 pb-2 bg-gray-200 rounded-md'>{label}</label>
      <AutoResizeTextarea
        placeholder={`Insert value for ${label}`}
        value={value}
        onChange={onChange}
        minH={1}
        className='bg-white'
      />
    </div>
  )
}

export default PromptInput