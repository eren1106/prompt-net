'use client'

import React, { ChangeEvent, useState } from 'react'
import AutoResizeTextarea from './custom/AutoResizeTextarea'
import PromptInput from './PromptInput'
import { Card } from './ui/card';
import { Prompt } from '@/models/prompt.model';
import { Tag } from '@prisma/client';
import TagWrapper from './TagWrapper';

interface PromptDetailsProps {
  promptData: Prompt;
}

const PromptDetails = ({promptData}: PromptDetailsProps) => {
  const getInputsFromPrompt = (promptText: string): string[] => {
    // match substrings within a string that are enclosed in curly braces {}.
    const regex = /\{([^}]+)\}/g;
    const matches = promptText.match(regex);

    if (matches) return matches.map(match => match.slice(1, -1).trim());
    return [];
  }

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    // setPromptValue(e.target.value)
    setInputs(getInputsFromPrompt(e.target.value));
  }

  const handleInputChange = (index: number, value: string): void => {
    // Create a copy of the inputValues array
    const newInputValues: string[] = [...inputValues];
    // Update the value at the specified index
    newInputValues[index] = value;
    // Update the state with the new array
    setInputValues(newInputValues);
    // setValue(`inputValues.${index}`, value);
  };

  // const handleCopyPromptText = (): void => {
  //   if (promptValue.length < 1) {
  //     toast({
  //       title: 'Text is empty!',
  //       duration: 2000,
  //       variant: "destructive",
  //     })
  //     return;
  //   }
  //   navigator.clipboard.writeText(replacePlaceholders(promptValue, inputValues));
  //   toast({
  //     title: 'Text copied to clipboard!',
  //     duration: 2000,
  //   })
  // }

  const [inputs, setInputs] = useState<string[]>(getInputsFromPrompt(promptData.promptText));
  const [inputValues, setInputValues] = useState<string[]>(promptData.inputs);

  return (
    <div className='flex flex-col gap-3'>
      <h1>{promptData.title}</h1>
      <p>{promptData.description}</p>
      <div className='flex gap-2'>
        {
          promptData.tags.map((tag: Tag) => <TagWrapper>{tag.name}</TagWrapper>)
        }
      </div>
      <Card>
        <h1 className='mb-2'>Prompt</h1>
        <div className='flex gap-5'>
          <div className='flex-1'>
            <AutoResizeTextarea
              placeholder='Write prompt here'
              minRows={10}
              onChange={handlePromptChange}
              defaultValue={promptData.promptText}
            />
          </div>
          {inputs.length > 0 && (
            <div className='flex-1'>
              <h2 className='mb-1'>Inputs</h2>
              <div className='flex flex-col gap-2'>
                {inputs.map((input, index) => (
                  <PromptInput
                    label={input}
                    key={index}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
      <p>{promptData.sampleOutput}</p>
    </div>
  )
}

export default PromptDetails