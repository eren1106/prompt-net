'use client'

import React, { ChangeEvent } from 'react'
import AutoResizeTextarea from './custom/AutoResizeTextarea'
import PromptInput from './PromptInput'
import { Card } from './ui/card';
import { Prompt } from '@/models/prompt.model';
import { Tag } from '@prisma/client';
import TagWrapper from './TagWrapper';
import { Button } from './ui/button';
import { deletePrompt, getInputsFromPrompt, getPlatformByName, replacePlaceholders } from '@/services/prompt.service';
import { useToast } from './ui/use-toast';
import { BookmarkIcon, Copy, Eye, Pencil, PlusIcon, RotateCcw, StarIcon, Trash2 } from 'lucide-react';
import DialogButton from './custom/DialogButton';
import { Separator } from './ui/separator';
import Link from 'next/link';
import MultipleSelectDropdown from './custom/MultipleSelectDropdown';
import { mockDropdownItems } from '@/constants';
import { convertDateToTimeAgoStr, convertIdTitleToSlug, replaceNewlinesWithBr } from '@/utils';
import usePromptTemplateData from '@/hooks/prompt-template.hook';
import { useRouter } from 'next/navigation';
import useLoading from '@/hooks/loading.hook';
import ProfileAvatar from './custom/ProfileAvatar';
import { DEFAULT_PROFILE_PIC_PATH } from '@/constants';

interface PromptDetailsProps {
  promptData: Prompt;
}

const PromptDetails = ({ promptData }: PromptDetailsProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { loading, setLoading, Loader } = useLoading();

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

  const handleDeletePrompt = async () => {
    setLoading(true);

    try {
      await deletePrompt(promptData.id);
      toast({
        title: 'Prompt deleted successfully',
        duration: 2000,
      });

      router.push('/prompts');
    }
    catch (err) {
      toast({
        title: 'Error: ' + err,
        duration: 2000,
        variant: "destructive",
      })
    }

    setLoading(false);
  }

  const handleRestoreDefaultValue = () => {
    setPromptValue(promptData.promptText);
    setInputs(getInputsFromPrompt(promptData.promptText));
    setInputValues(promptData.inputs);
  }

  const checkIsPromptDefault = (): boolean => {
    return promptData.promptText === promptValue && promptData.inputs === inputValues;
  }

  const { promptValue, setPromptValue, inputs, setInputs, inputValues, setInputValues } = usePromptTemplateData(promptData);

  return (
    <div className='flex flex-col gap-3'>
      {/* TITLE & EDIT BUTTON */}
      <div className='flex justify-between items-end'>
        <h1>{promptData.title}</h1>
        <div className='flex items-center gap-2'>
          <Link href={`${convertIdTitleToSlug(promptData.id, promptData.title)}/edit`}>
            <Button
              className='flex gap-2 items-center'
              variant="secondary"
            >
              <Pencil size={16} />
              Edit
            </Button>
          </Link>
          <Button
            className='flex gap-2 items-center'
            variant="secondary"
            onClick={handleDeletePrompt}
            disabled={loading}
          >
            <Loader />
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p>{promptData.description}</p>

      {/* AUTHOR & TAGS */}
      <div className='flex gap-2 items-center'>
        <Link href={`/${promptData.author.username}`}>
          <div className='flex items-center gap-2'>
            <ProfileAvatar
              src={promptData.author.profilePicUri ?? DEFAULT_PROFILE_PIC_PATH}
              size="sm"
            />
            <p className='text-sm hover:underline'>{promptData.author.fullname}</p>
          </div>
        </Link>
        {
          promptData.tags.map((tag: Tag) => <TagWrapper>{tag.name}</TagWrapper>)
        }
        <TagWrapper>{getPlatformByName(promptData.platform)?.label}</TagWrapper>
      </div>

      {/* STARS & BOOKMARK */}
      <div className='flex items-center gap-3'>
        <Button variant="outline">
          <StarIcon size={16} />
        </Button>
        <MultipleSelectDropdown
          buttonChild={<BookmarkIcon size={16} />}
          items={mockDropdownItems}
          label="Lists"
          footerChild={
            <div
              className="flex items-center gap-2 p-1 cursor-pointer"
              onClick={() => { }}
            >
              <PlusIcon size={16} />
              <p className="text-sm">Create List</p>
            </div>
          }
        />
      </div>

      {/* STARS & TIME */}
      <div className='flex items-center gap-3'>
        <p className='text-sm'>69 stars</p>
        <p className='text-sm'>{convertDateToTimeAgoStr(promptData.createdDatetime)}</p>
      </div>

      {/* PROMPT TEMPLATE */}
      <Card>
        <div className='flex items-center justify-between mb-2'>
          {
            !checkIsPromptDefault() &&
            (
              <Button
                variant='outline'
                className='flex items-center gap-2'
                onClick={handleRestoreDefaultValue}
              >
                <RotateCcw size={16} />
                Restore default value
              </Button>
            )
          }
          <div className='flex items-center gap-2 justify-end w-full'>
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
        </div>
        <h1 className='mb-2'>Prompt</h1>
        <div className='flex gap-5'>
          <div className='flex-1'>
            <AutoResizeTextarea
              placeholder='Write prompt here'
              minRows={10}
              onChange={handlePromptChange}
              value={promptValue}
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
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* SAMPLE OUTPUT */}
      <Card>
        <h2>Sample response</h2>
        <Separator className='my-3' />
        <p>{promptData.sampleOutput}</p>
      </Card>
    </div >
  )
}

export default PromptDetails