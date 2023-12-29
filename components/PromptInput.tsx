import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'

interface PromptInputProps {
  label: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <InputGroup>
        <InputLeftAddon
          className='w-1/4 whitespace-normal'
          maxH='unset'
          height='unset'
          minH={10}
        >
          {label}
        </InputLeftAddon>
        <Input placeholder={`Insert value for ${label}`}
          className='w-3/4'
          maxH='unset'
          height='unset'
          minH={10}
          onChange={onChange}
        />
      </InputGroup>
    </div>
  )
}

export default PromptInput