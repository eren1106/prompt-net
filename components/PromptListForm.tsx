'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AutoResizeTextarea from '@/components/custom/AutoResizeTextarea';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import useLoading from '@/hooks/loading.hook';
import { convertIdTitleToSlug } from '@/lib/utils';
import { PromptList } from '@/models/prompt-list.model';
import { createPromptList, updatePromptList } from '@/services/prompt-list.service';

const PromptListFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(20),
});

interface PromptListFormProps {
  promptListData?: PromptList;
}

const PromptListForm = ({ promptListData }: PromptListFormProps) => {
  const router = useRouter();
  const { loading, setLoading, Loader } = useLoading();

  const promptFormListSchemaDefaultValue = {
    title: promptListData?.title ?? "",
    description: promptListData?.description ?? "",
  }

  const form = useForm({
    resolver: zodResolver(PromptListFormSchema),
    defaultValues: promptFormListSchemaDefaultValue,
  });

  const onSubmit = async (data: z.infer<typeof PromptListFormSchema>) => {
    console.log("FORM DATA", data);

    setLoading(true);

    // Handle form submission
    try {
      if (promptListData) { // for update
        await updatePromptList({
          id: promptListData.id,
          title: data.title,
          description: data.description,
        });

        toast({
          title: 'PromptList updated successfully',
          duration: 2000,
        });

        router.push(`/lists/${convertIdTitleToSlug(promptListData.id, promptListData.title)}`);
      }
      else { // for create
        await createPromptList({
          title: data.title,
          description: data.description,
          authorId: '401b4067-44aa-4a11-b71a-d7f5acc7ab80', // mock
        });

        toast({
          title: 'PromptList created successfully',
          duration: 2000,
        });

        router.push(`/lists`);
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

export default PromptListForm;
