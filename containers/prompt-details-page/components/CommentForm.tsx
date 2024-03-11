import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import Spinner from '../../../components/custom/Spinner';

interface CommentFormProps {
  form: any; // TODO: put type of form
  onSubmit: any;
  isSubmitting: boolean;
  onResetReplyId: () => void;
  replyTo?: string;
  editComment?: boolean;
}

const CommentForm = ({
  form,
  onSubmit,
  isSubmitting,
  onResetReplyId,
  replyTo,
  editComment=false,
}: CommentFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2'>
        <FormField
          control={form.control}
          name="commentValue"
          render={({ field }) => (
            <FormItem className='w-full'>
              {/* <FormLabel className='text-md'>Comment*</FormLabel> */}
              <FormControl>
                <Input
                  placeholder={editComment ? "Edit your comment..." : `Reply to ${replyTo}...`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {
            isSubmitting ? <Spinner /> : editComment ? "Done" : "Post"
          }
        </Button>
        <Button
          onClick={onResetReplyId}
          variant="secondary"
          disabled={isSubmitting}
        >Cancel</Button>
      </form>
    </Form>
  )
}

export default CommentForm