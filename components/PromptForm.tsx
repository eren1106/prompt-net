'use client'

import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AutoResizeTextarea from '@/components/custom/AutoResizeTextarea';
import PromptInput from '@/components/PromptInput';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { platformSelectItems } from '@/constants';
import TagsSelector from './TagsSelector';
import { Tag } from '@prisma/client';
import DialogButton from './custom/DialogButton';
import { Eye } from 'lucide-react';
import { createPrompt, getInputsFromPrompt, replacePlaceholders, updatePrompt } from '@/services/prompt.service';
import { Prompt } from '@/models/prompt.model';
import usePromptTemplateData from '@/hooks/prompt-template.hook';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import useLoading from '@/hooks/loading.hook';
import { convertIdTitleToSlug } from '@/lib/utils';

const PromptFormSchema = z.object({
  title: z.string().min(12),
  description: z.string().min(20),
  promptValue: z.string().min(40),
  // inputValues: z.array(z.string()),
  sampleResponse: z.string(),
  platform: z.string(),
  tagIdList: z.array(z.number()).max(3),
});

interface PromptFormProps {
  promptData?: Prompt;
  tags: Tag[];
}

const PromptForm = ({ promptData, tags }: PromptFormProps) => {
  const { inputs, setInputs, inputValues, setInputValues } = usePromptTemplateData(promptData);
  const { toast } = useToast();
  const router = useRouter();
  const { loading, setLoading, Loader } = useLoading();

  const promptFormSchemaDefaultValue = {
    title: promptData?.title ?? "",
    description: promptData?.description ?? "",
    promptValue: promptData?.promptText ?? "",
    // inputValues: [],
    sampleResponse: promptData?.sampleOutput ?? "",
    platform: promptData?.platform ?? platformSelectItems[0].name,
    tagIdList: promptData?.tags.map((tag) => tag.id) ?? [],
  }

  const form = useForm({
    resolver: zodResolver(PromptFormSchema),
    defaultValues: promptFormSchemaDefaultValue,
  });

  const onSubmit = async (data: z.infer<typeof PromptFormSchema>) => {
    console.log("FORM DATA", data);

    setLoading(true);

    // Handle form submission
    try {
      if (promptData) { // for update
        await updatePrompt({
          id: promptData.id,
          title: data.title,
          description: data.description,
          promptText: data.promptValue,
          inputs: inputValues,
          sampleOutput: data.sampleResponse,
          platform: data.platform,
          tagIdList: data.tagIdList,
        });

        toast({
          title: 'Prompt updated successfully',
          duration: 2000,
        });

        router.push(`/prompts/${convertIdTitleToSlug(promptData.id, promptData.title)}`);
      }
      else { // for create
        await createPrompt({
          title: data.title,
          description: data.description,
          promptText: data.promptValue,
          inputs: inputValues,
          sampleOutput: data.sampleResponse,
          authorId: '401b4067-44aa-4a11-b71a-d7f5acc7ab80', // mock
          platform: data.platform,
          tagIdList: data.tagIdList,
        });

        toast({
          title: 'Prompt created successfully',
          duration: 2000,
        });

        router.push(`/prompts`);
      }
    }
    catch (err) {
      toast({
        title: "Failed: " + err,
        duration: 2000,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputs(getInputsFromPrompt(e.target.value));
    form.setValue('promptValue', e.target.value);
  }

  const handleInputChange = (index: number, value: string): void => {
    const newInputValues: string[] = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    // setValue(`inputValues.${index}`, value);
  };

  // Watch form fields
  const promptValue: string = form.watch('promptValue');
  const tagIdList: number[] = form.watch('tagIdList');

  const handleToggleTagItem = (id: number) => {
    let newList: number[];
    if (tagIdList.includes(id)) {
      newList = tagIdList.filter((tagItemId: number) => tagItemId !== id);
    }
    else newList = [...tagIdList, id];
    // @ts-ignore
    form.setValue("tagIdList", newList);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 w-full'>
          <section className='space-y-4'>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-md'>Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-md'>Description*</FormLabel>
                  <FormControl>
                    <AutoResizeTextarea
                      placeholder="description"
                      minRows={2}
                      {...field}
                    />
                    {/* <Input placeholder="description" {...field} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        platformSelectItems.map((item) =>
                          <SelectItem value={item.name} key={item.name}>{item.label}</SelectItem>
                        )
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagIdList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-md'>Tags*</FormLabel>
                  <FormControl>
                    <TagsSelector
                      tags={tags}
                      selectedTagIdList={tagIdList}
                      onToggleItem={handleToggleTagItem}
                    // {...form.register('tagIdList')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card>
              {/* <div className='flex justify-end mt-2'>
                <Button onClick={handleCopyPromptText}>Copy</Button>
              </div> */}
              <div className='flex gap-5'>
                <div className='flex-1'>
                  <FormField
                    control={form.control}
                    name="promptValue"
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex items-end'>
                          <FormLabel className='text-md'>Prompt*</FormLabel>
                          <DialogButton
                            title="Inspect prompt"
                            className="ml-auto"
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
                        </div>
                        <FormControl>
                          <AutoResizeTextarea
                            placeholder='Write prompt here'
                            minRows={10}
                            // {...field}
                            {...form.register('promptValue', { onChange: handlePromptChange })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
                        // {...register(`inputValues.${index}`, )}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <FormField
              control={form.control}
              name="sampleResponse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-md'>Sample Response</FormLabel>
                  <FormControl>
                    <AutoResizeTextarea
                      placeholder="Sample Response"
                      minRows={3}
                      {...field}
                    />
                    {/* <Input placeholder="description" {...field} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <Button type="submit" disabled={loading}>
            <Loader />
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PromptForm;
