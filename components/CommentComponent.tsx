'use client'

import React from 'react'
import Dot from '@/components/custom/Dot'
import { AiOutlineLike } from 'react-icons/ai'
import ProfileAvatar from '@/components/custom/ProfileAvatar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useReplyingCommentStore } from '@/lib/store'
import { useForm } from 'react-hook-form'
import * as z from 'zod';
import { CommentSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Comment } from '@/models/comment.model'
import { createComment, deleteComment } from '@/services/prompt.service'
import { useToast } from './ui/use-toast'
import { DEFAULT_PROFILE_PIC_PATH } from '@/constants'
import Spinner from './custom/Spinner'

interface CommentComponentProps {
  commentData: Comment;
  // id: number;
  // promptId: number;
  // profilePicUri: string;
  // name: string;
  // text: string;
  // likes: number;
  // isSub?: boolean;
  // subComments?: CommentProps[];
}

const CommentComponent = ({
  commentData,
  // id,
  // profilePicUri,
  // name,
  // text,
  // likes,
  // isSub = false,
  // subComments = [],
}: CommentComponentProps) => {
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      commentValue: "",
    }
  })
  const { toast } = useToast();
  const { replyingCommentId, setId: handleSetReplyId, resetId: handleResetReplyId } = useReplyingCommentStore();

  const handleClickReply = () => {
    if (replyingCommentId === commentData.id) handleResetReplyId();
    else handleSetReplyId(commentData.id);
  }

  const handleClickDelete = async () => {
    try {
      await deleteComment(commentData.promptId, commentData.id);
      toast({
        title: 'Comment deleted successfully',
        duration: 2000,
      })

      // TODO: think a better way to refresh data
      location.reload();
    }
    catch (err) {
      console.log("Error: ", err);
      toast({
        title: "Failed: " + err,
        duration: 2000,
        variant: "destructive",
      })
    }
  }

  const checkIsSub = (): boolean => {
    return !!commentData.parentCommentId
  }

  const checkIsSubmitting = (): boolean => {
    return form.formState.isSubmitting;
  }

  const checkIsCurrentUser = (): boolean => {
    // TODO: check whether the author of the comment is current user
    return true;
  }

  const onSubmit = async (data: z.infer<typeof CommentSchema>) => {
    try {
      await createComment({
        promptId: commentData.promptId,
        value: data.commentValue,
        authorId: '401b4067-44aa-4a11-b71a-d7f5acc7ab80', // mock
        parentCommentId: commentData.parentCommentId ?? commentData.id,
      });
      toast({
        title: 'Comment posted successfully',
        duration: 2000,
      })
      form.reset();
      handleResetReplyId();
    }
    catch (err) {
      toast({
        title: "Failed: " + err,
        duration: 2000,
        variant: "destructive",
      })
    }
  }

  return (
    <div className={`${checkIsSub() ? "" : "pb-3 border-solid border-b border-secondary last:border-b-0"}`}>
      <div className='flex gap-4'>
        <ProfileAvatar
          size={checkIsSub() ? "sm" : "md"}
          src={commentData.author.profilePicUri || DEFAULT_PROFILE_PIC_PATH}
        />
        <div className='w-full flex flex-col gap-2'>
          <h2>{commentData.author.fullname}</h2>
          <p>{commentData.value}</p>
          <div className='flex gap-2 items-center'>
            <p
              className='hover:underline cursor-pointer'
              onClick={handleClickReply}
            >Reply</p>
            <Dot />
            <p>{`${commentData.likes.length} likes`}</p>
            <AiOutlineLike className='cursor-pointer' />
            {
              checkIsCurrentUser() &&
              <>
                <Dot />
                <p
                  className='hover:underline cursor-pointer'
                  onClick={handleClickDelete}
                >Delete</p>
              </>
            }
          </div>

          {/* REPLY TEXT FIELD */}
          {
            (replyingCommentId === commentData.id) &&
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
                          placeholder={`Reply to ${commentData.author.fullname}...`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={checkIsSubmitting()}
                >
                  {
                    checkIsSubmitting() ? <Spinner /> : "Post"
                  }
                </Button>
                <Button
                  onClick={handleResetReplyId}
                  variant="secondary"
                  disabled={checkIsSubmitting()}
                >Cancel</Button>
              </form>
            </Form>
          }

          {/* SUB COMMENTS */}
          {
            (!checkIsSub() && commentData.subComments.length > 0) &&
            <div className='flex flex-col gap-3 mt-4'>
              {
                commentData.subComments.map((comment: Comment) =>
                  <CommentComponent
                    commentData={comment}
                  />
                )
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default CommentComponent