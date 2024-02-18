'use client'

import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AutoResizeTextarea from '@/components/custom/AutoResizeTextarea';
import PromptInput from '@/components/PromptInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { BookmarkIcon, PlusIcon, StarIcon } from '@radix-ui/react-icons';
import { Card } from '@/components/ui/card';
import { TabsContainer } from '@/components/custom/TabsContainer';
import MultipleSelectDropdown from '@/components/custom/MultipleSelectDropdown';
import { mockDropdownItems } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';

const PromptFormSchema = z.object({
  // title: z.string().min(12),
  // description: z.string().min(20),
  promptValue: z.string().min(1),
  // inputValues: z.array(z.string()),
  sampleResponseValue: z.string(),
  // platform: z.string(),
  // tagIdList: z.array(z.number()).max(3),
});

const promptFormSchemaDefaultValue = {
  // title: '',
  // description: '',
  promptValue: '',
  // inputValues: [],
  sampleResponseValue: '',
  // platform: '',
  // tagIdList: [],
}

const submitPrompt = async (body: any) => {
  const res = await fetch(`/api/prompts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res.json();
}

const PromptForm = () => {
  // const [promptValue, setPromptValue] = useState<string>('');
  const [inputs, setInputs] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const { toast } = useToast();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // const [sampleResponseValue, setSampleResponseValue] = useState<string>("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex atque possimus quibusdam non nisi sequi blanditiis accusantium voluptas! Aut facere dolorum minus ea dolores nam? At quos alias rerum, impedit esse, cupiditate laudantium hic iste, ab magni ducimus minima sapiente. Pariatur fugit sequi amet illum odit ipsum veniam expedita possimus.");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(PromptFormSchema),
    defaultValues: promptFormSchemaDefaultValue,
  });

  // useEffect(() => {
  //   register('promptValue');
  //   // register('inputValues.*');
  //   register('sampleResponseValue');
  // }, [register]);

  const onSubmit = async (data: z.infer<typeof PromptFormSchema>) => {
    const inspectValue = replacePlaceholders(promptValue, inputValues);
    console.log("FORM DATA", data);
    console.log("INPUTS", inputValues);
    console.log("INSPECT VALUE", inspectValue);

    // Handle form submission
    await submitPrompt({
      title: "mock title",
      description: "mock description",
      promptText: data.promptValue,
      inputs: [],
      sampleOutput: data.sampleResponseValue,
      authorId: '401b4067-44aa-4a11-b71a-d7f5acc7ab80',
      platform: 'ChatGPT',
      tagIdList: [1],
    })
  };

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    // setPromptValue(e.target.value)
    setInputs(getInputsFromPrompt(e.target.value));
    setValue('promptValue', e.target.value);
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

  const getInputsFromPrompt = (promptText: string): string[] => {
    // match substrings within a string that are enclosed in curly braces {}.
    const regex = /\{([^}]+)\}/g;
    const matches = promptText.match(regex);

    if (matches) return matches.map(match => match.slice(1, -1).trim());
    return [];
  }

  // Watch the promptValue field
  const promptValue = watch('promptValue');

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

  const replacePlaceholders = (promptText: string, inputTexts: string[]): string => {
    let result = promptText;

    promptText.match(/{(.*?)}/g)?.forEach((match, index) => {
      const replacement = inputTexts[index] || ""; // Use empty string if index is out of bounds
      result = result.replace(match, replacement);
    });

    return result;
  };

  // const handleSampleResponseChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
  //   setSampleResponseValue(e.target.value);
  //   setValue('sampleResponseValue', e.target.value);
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4 w-full'>
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

        <section>
          <TabsContainer
            tabs={[
              {
                value: "template",
                title: "Template",
                content: (
                  <div className='mt-2'>
                    <div className='flex justify-end mt-2'>
                      <Button onClick={handleCopyPromptText}>Copy</Button>
                    </div>
                    <div className='flex gap-5'>
                      <div className='flex-1'>
                        <h2 className='mb-1'>Prompt</h2>
                        <AutoResizeTextarea
                          value={promptValue}
                          // onChange={handlePromptChange}
                          placeholder='Write prompt here'
                          minRows={10}
                          {...register('promptValue', { onChange: handlePromptChange })}
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
                              // {...register(`inputValues.${index}`, )}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                value: "inspect",
                title: "Inspect",
                content: (
                  <div>
                    <h2>Inspect prompt:</h2>
                    <p>{replacePlaceholders(promptValue, inputValues)}</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section>
          <Card>
            <h2>Sample response</h2>
            <Separator className='my-3' />
            <AutoResizeTextarea
              // value={sampleResponseValue}
              // onChange={handleSampleResponseChange}
              {...register('sampleResponseValue')}
            />
            {/* {isEdit ? (
              <AutoResizeTextarea
                // value={sampleResponseValue}
                // onChange={handleSampleResponseChange}
                {...register('sampleResponseValue')}
              />
            ) : (
              <p>{sampleResponseValue}</p>
            )} */}
          </Card>
        </section>

        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default PromptForm;
