'use client'

import React, { ChangeEvent, useState } from 'react'
import AutoResizeTextarea from './custom/AutoResizeTextarea'
import PromptInput from './PromptInput'
import { Card } from './ui/card';
import { Prompt } from '@/models/prompt.model';
import { Tag } from '@prisma/client';
import TagWrapper from './TagWrapper';
import { Button } from './ui/button';
import { getPlatformByName, replacePlaceholders } from '@/services/prompt.service';
import { useToast } from './ui/use-toast';
import { Copy, Eye } from 'lucide-react';
import DialogButton from './custom/DialogButton';
import { Separator } from './ui/separator';

interface PromptDetailsProps {
  promptData: Prompt;
}

const PromptDetails = ({ promptData }: PromptDetailsProps) => {
  const { toast } = useToast();

  const getInputsFromPrompt = (promptText: string): string[] => {
    // match substrings within a string that are enclosed in curly braces {}.
    const regex = /\{([^}]+)\}/g;
    const matches = promptText.match(regex);

    if (matches) return matches.map(match => match.slice(1, -1).trim());
    return [];
  }

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setPromptValue(e.target.value)
    setInputs(getInputsFromPrompt(e.target.value));
  }

  const handleInputChange = (index: number, value: string): void => {
    const newInputValues: string[] = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleCopyPromptText = (): void => {
    if (promptValue.length < 1) {
      toast({
        title: 'Text is empty!',
        duration: 2000,
        variant: "destructive",
      })
      return;
    }
    navigator.clipboard.writeText(replacePlaceholders(promptValue, inputValues));
    toast({
      title: 'Text copied to clipboard!',
      duration: 2000,
    })
  }

  const handleClickCopyAndOpenChat = () => {
    // copy
    navigator.clipboard.writeText(replacePlaceholders(promptValue, inputValues))
      .then(() => {
        // open chatgpt
        window.open('https://chat.openai.com/');

        // TODO: open gemini & other chatbot platform (if any)
      })
      .catch(error => console.log("Copy error: ", error));
  }

  const [promptValue, setPromptValue] = useState<string>(promptData.promptText);
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
        <TagWrapper>{getPlatformByName(promptData.platform)?.label}</TagWrapper>
      </div>
      <Card>
        <div className='flex justify-end mt-2 gap-2'>
          <DialogButton
            title="Inspect prompt"
            content={
              replacePlaceholders(promptValue, inputValues).length > 0 ?
                <p>
                  {replacePlaceholders(promptValue, inputValues)}
                </p>
                : <p className='italic text-sm font-thin'>(Prompt is empty)</p>
            }
          >
            <Eye />
          </DialogButton>
          <Button variant="outline" onClick={handleCopyPromptText}><Copy size={16} /></Button>
          <Button variant="secondary" onClick={handleClickCopyAndOpenChat}>
            Copy & Open ChatGPT
          </Button>
        </div>
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
      <Card>
        <h2>Sample response</h2>
        <Separator className='my-3' />
        <p>{promptData.sampleOutput}</p>
      </Card>
    </div>
  )
}

export default PromptDetails