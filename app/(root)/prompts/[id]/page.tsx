'use client'

import AutoResizeTextarea from '@/components/custom/AutoResizeTextarea';
import PromptInput from '@/components/PromptInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import React, { ChangeEvent, useState } from 'react'
import { Separator } from '@/components/ui/separator';
import { BookmarkIcon, PlusIcon, StarIcon } from '@radix-ui/react-icons';
import { Card } from '@/components/ui/card';
import BookmarkDropdown from '@/components/BookmarkDropdown';
import { TabsContainer } from '@/components/custom/TabsContainer';
import ProfileAvatar from '@/components/custom/ProfileAvatar';
import Comment from '@/components/Comment';
import MultipleSelectDropdown from '@/components/custom/MultipleSelectDropdown';
import { mockDropdownItems } from '@/constants';

const PromptDetailPage = () => {
  const [promptValue, setPromptValue] = useState<string>('');
  const [inputs, setInputs] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const { toast } = useToast();
  const [isEditSampleResponse, setIsEditSampleResponse] = useState<boolean>(false);
  const [sampleResponseValue, setSampleResponseValue] = useState<string>("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex atque possimus quibusdam non nisi sequi blanditiis accusantium voluptas! Aut facere dolorum minus ea dolores nam? At quos alias rerum, impedit esse, cupiditate laudantium hic iste, ab magni ducimus minima sapiente. Pariatur fugit sequi amet illum odit ipsum veniam expedita possimus.");

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setPromptValue(e.target.value)
    setInputs(getInputsFromPrompt(e.target.value));
  }

  const handleInputChange = (index: number, value: string): void => {
    // Create a copy of the inputValues array
    const newInputValues: string[] = [...inputValues];
    // Update the value at the specified index
    newInputValues[index] = value;
    // Update the state with the new array
    setInputValues(newInputValues);
  };

  const getInputsFromPrompt = (promptText: string): string[] => {
    const regex = /\{([^}]+)\}/g;
    const matches = promptText.match(regex);

    if (matches) return matches.map(match => match.slice(1, -1).trim());
    return [];
  }

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

  // Function to replace placeholders with values
  const replacePlaceholders = (promptText: string, inputTexts: string[]): string => {
    let result = promptText;

    promptText.match(/{(.*?)}/g)?.forEach((match, index) => {
      const replacement = inputTexts[index] || ""; // Use empty string if index is out of bounds
      result = result.replace(match, replacement);
    });

    return result;
  };

  const handleToggleEditSampleResponse = (): void => {
    setIsEditSampleResponse(!isEditSampleResponse);
  }

  const handleSampleResponseChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setSampleResponseValue(e.target.value);
  }

  return (
    <div className='flex flex-col gap-4 w-full'>
      {/* TOP SECTION */}
      <section>
        <h1>Prompt Title</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum illum eveniet tenetur recusandae vero sint sequi eligendi necessitatibus non! Dignissimos?</p>
        <div className='flex items-center gap-3 mt-2'>
          <Button variant="outline">
            <StarIcon />
          </Button>
          <MultipleSelectDropdown
            buttonChild={<BookmarkIcon />}
            items={mockDropdownItems}
            label="Lists"
            footerChild={
              <div
                className="flex items-center gap-2 p-1 cursor-pointer"
                onClick={() => { }}
              >
                <PlusIcon />
                <p className="text-sm">Create List</p>
              </div>
            }
          />
        </div>
      </section>

      {/* TEMPLATE SECTION */}
      <section>
        <TabsContainer
          tabs={[
            {
              value: "template",
              title: "Template",
              content: (
                // TAB 1 CONTENT
                <div className='mt-2'>
                  <div className='flex justify-end mt-2'>
                    <Button
                      onClick={handleCopyPromptText}
                    >Copy</Button>
                  </div>
                  <div className='flex gap-5'>
                    <div className='flex-1'>
                      <h2 className='mb-1'>Prompt</h2>
                      <AutoResizeTextarea
                        value={promptValue}
                        onChange={handlePromptChange}
                        placeholder='Write prompt here'
                        minRows={10}
                      />
                    </div>
                    {
                      inputs.length > 0 && <div className='flex-1'>
                        <h2 className='mb-1'>Inputs</h2>
                        <div className='flex flex-col gap-2'>
                          {
                            inputs.map((input, index) =>
                              <PromptInput
                                label={input}
                                key={index}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                              />)
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              )
            },
            {
              value: "inspect",
              title: "Inspect",
              content: (
                // TAB 2 CONTENT
                <div>
                  <h2>Inspect prompt:</h2>
                  <p>{replacePlaceholders(promptValue, inputValues)}</p>
                </div>
              )
            },
          ]}
        />
      </section>

      {/* SAMPLE SECTION */}
      <section>
        <Card>
          <div className='flex justify-between items-end'>
            <h2>Sample response</h2>
            {
              isEditSampleResponse ?
                <div className='flex gap-3'>
                  <Button onClick={handleToggleEditSampleResponse}>
                    Cancel
                  </Button>
                  <Button onClick={handleToggleEditSampleResponse}>
                    Save
                  </Button>
                </div>
                :
                <Button onClick={handleToggleEditSampleResponse}>
                  Edit
                </Button>
            }
          </div>
          <Separator className='my-3' />
          {
            isEditSampleResponse ?
              <AutoResizeTextarea
                value={sampleResponseValue}
                onChange={handleSampleResponseChange}
              />
              :
              <p>
                {sampleResponseValue}
              </p>
          }
        </Card>
      </section>

      {/* COMMENT SECTION */}
      <section>
        <h1 className='mb-3'>Comments</h1>
        {/* COMMENT TEXT AREA */}
        <div className='flex gap-4'>
          <ProfileAvatar
            size="md"
            src="https://github.com/shadcn.png"
          />
          <div className='w-full'>
            <AutoResizeTextarea
              minRows={3}
              placeholder='Write your comment...'
            />
            <Button className='w-full mt-3'>
              Post
            </Button>
          </div>
        </div>

        {/* ALL COMMENTS */}
        <div className='flex flex-col gap-3 mt-10'>
          <Comment
            id={1}
            profilePicUri='https://github.com/shadcn.png'
            name='Your name'
            text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, necessitatibus aspernatur quisquam eligendi ducimus cumque?'
            likes={100}
          />
          <Comment
            id={2}
            profilePicUri='https://github.com/shadcn.png'
            name='Your name'
            text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, necessitatibus aspernatur quisquam eligendi ducimus cumque?'
            likes={100}
            subComments={[
              {
                id: 3,
                profilePicUri: 'https://github.com/shadcn.png',
                name: 'Your name',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, necessitatibus aspernatur quisquam eligendi ducimus cumque?',
                likes: 100,
              },
              {
                id: 4,
                profilePicUri: 'https://github.com/shadcn.png',
                name: 'Your name',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, necessitatibus aspernatur quisquam eligendi ducimus cumque?',
                likes: 100,
              }
            ]}
          />
          <Comment
            id={5}
            profilePicUri='https://github.com/shadcn.png'
            name='Your name'
            text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, necessitatibus aspernatur quisquam eligendi ducimus cumque?'
            likes={100}
          />
        </div>
      </section>
    </div>
  )
}

export default PromptDetailPage