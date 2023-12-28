'use client'

import PromptInput from '@/components/PromptInput';
import { Button, Textarea, useToast } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'

const PromptDetailPage = () => {
  const [promptValue, setPromptValue] = useState<string>('');
  const [inputs, setInputs] = useState<string[]>([]);
  const toast = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setPromptValue(e.target.value)
    setInputs(getInputsFromPrompt(e.target.value));
  }

  const getInputsFromPrompt = (promptText: string): string[] => {
    const regex = /\{([^}]+)\}/g;
    const matches = promptText.match(regex);

    if (matches) return matches.map(match => match.slice(1, -1).trim());
    return [];
  }

  const handleCopyPromptText = (): void => {
    if(promptValue.length < 1) {
      toast({
        title: 'Text is empty!',
        status: 'error',
        duration: 2000,
      })
      return;
    }
    
    navigator.clipboard.writeText(promptValue);
    toast({
      title: 'Text copied to clipboard!',
      status: 'success',
      duration: 2000,
    })
  }

  return (
    <div>
      <h1>Prompt Title</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum illum eveniet tenetur recusandae vero sint sequi eligendi necessitatibus non! Dignissimos?</p>
      <div className='card mt-2'>
        <div className='flex justify-end'>
          <Button
            colorScheme='teal'
            variant='outline'
            onClick={handleCopyPromptText}
          >Copy</Button>
        </div>
        <div className='flex gap-5'>
          <div className='flex-1'>
            <h2 className='mb-1'>Prompt</h2>
            <Textarea
              value={promptValue}
              onChange={handleInputChange}
              placeholder='Write prompt here'
              className='resize-none'
              minHeight={300}
            />
          </div>
          {
            inputs.length > 0 && <div className='flex-1'>
              <h2 className='mb-1'>Inputs</h2>
              <div className='flex flex-col gap-2'>
                {
                  inputs.map((input, index) => <PromptInput label={input} key={index} />)
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default PromptDetailPage