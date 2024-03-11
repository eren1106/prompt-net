'use client'

import React from 'react'
import Dot from '@/components/custom/Dot'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import ProfileAvatar from '@/components/custom/ProfileAvatar'
import { useCommentStore } from '@/lib/store'
import { useForm } from 'react-hook-form'
import * as z from 'zod';
import { CommentSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Comment } from '@/models/comment.model'
import { createComment, deleteComment, updateComment } from '@/services/prompt.service'
import { useToast } from './ui/use-toast'
import { DEFAULT_PROFILE_PIC_PATH } from '@/constants'
import CommentForm from './CommentForm'
import { checkIsEdited, convertDateToTimeAgoStr } from '@/utils'

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

  // STATES & HOOKS
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      commentValue: "",
    }
  })
  const { toast } = useToast();
  const { commentId, setId: handleSetSelectedCommentId, resetId: handleResetSelectedCommentId, isEdit } = useCommentStore();
  // const [isEdit, setIsEdit] = useState<boolean>(false);


  // HANDLE FUNCTION
  const handleClickReply = () => {
    form.setValue('commentValue', `@${commentData.author.fullname} `);
    if (commentId === commentData.id) handleResetSelectedCommentId();
    else handleSetSelectedCommentId(commentData.id);
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

  const handleClickEdit = () => {
    form.setValue('commentValue', commentData.value);
    if (commentId === commentData.id) handleResetSelectedCommentId();
    else handleSetSelectedCommentId(commentData.id, true);
  }


  // HELPER FUNCTION
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

  const checkIfUserLikedComment = (): boolean => {
    const currentUserId = "401b4067-44aa-4a11-b71a-d7f5acc7ab80"; // mock
    return commentData.likes.some((like) => like.userId === currentUserId);
  }


  // FORM SUBMIT
  const onSubmit = async (data: z.infer<typeof CommentSchema>) => {
    try {
      if (isEdit) { // edit commet
        await updateComment(commentData.promptId, commentData.id, {
          value: data.commentValue,
          authorId: '401b4067-44aa-4a11-b71a-d7f5acc7ab80', // mock
        });
        toast({
          title: 'Comment edited successfully',
          duration: 2000,
        })
        // setIsEdit(false);
      }
      else {
        await createComment({ // reply comment
          promptId: commentData.promptId,
          value: data.commentValue,
          authorId: '401b4067-44aa-4a11-b71a-d7f5acc7ab80', // mock
          parentCommentId: commentData.parentCommentId ?? commentData.id,
        });
        toast({
          title: 'Comment posted successfully',
          duration: 2000,
        })
      }
      form.reset();
      handleResetSelectedCommentId();
      // TODO: think a better way to refresh data
      location.reload();
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
          {
            ((commentId === commentData.id) && isEdit) ?
              <CommentForm
                form={form}
                onSubmit={onSubmit}
                isSubmitting={checkIsSubmitting()}
                onResetReplyId={handleResetSelectedCommentId}
                editComment
              />
              : <>
                <h2>{commentData.author.fullname}</h2>
                <div className='flex gap-2 items-center'>
                  <p>{commentData.value}</p>
                  {
                    checkIsEdited(commentData.createdDatetime, commentData.updateDatetime)
                    && <p className='italic text-xs text-grey'>(Edited)</p>
                  }
                </div>
                <div className='flex gap-2 items-center'>
                  <p
                    className='hover:underline cursor-pointer'
                    onClick={handleClickReply}
                  >Reply</p>
                  <Dot />
                  <p>{`${commentData.likes.length} likes`}</p>
                  {checkIfUserLikedComment() ? <AiFillLike className='cursor-pointer' /> : <AiOutlineLike className='cursor-pointer' />}
                  {
                    checkIsCurrentUser() &&
                    <>
                      <Dot />
                      <p
                        className='hover:underline cursor-pointer'
                        onClick={handleClickEdit}
                      >Edit</p>
                      <Dot />
                      <p
                        className='hover:underline cursor-pointer'
                        onClick={handleClickDelete}
                      >Delete</p>
                    </>
                  }
                  <p className='text-grey text-sm'>{convertDateToTimeAgoStr(commentData.createdDatetime)}</p>
                </div>
              </>
          }

          {/* REPLY TEXT FIELD */}
          {
            ((commentId === commentData.id) && !isEdit) &&
            <CommentForm
              form={form}
              onSubmit={onSubmit}
              isSubmitting={checkIsSubmitting()}
              onResetReplyId={handleResetSelectedCommentId}
              replyTo={commentData.author.fullname}
            />
            // <Form {...form}>
            //   <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2'>
            //     <FormField
            //       control={form.control}
            //       name="commentValue"
            //       render={({ field }) => (
            //         <FormItem className='w-full'>
            //           {/* <FormLabel className='text-md'>Comment*</FormLabel> */}
            //           <FormControl>
            //             <Input
            //               placeholder={`Reply to ${commentData.author.fullname}...`}
            //               {...field}
            //             />
            //           </FormControl>
            //           <FormMessage />
            //         </FormItem>
            //       )}
            //     />

            //     <Button
            //       type="submit"
            //       disabled={checkIsSubmitting()}
            //     >
            //       {
            //         checkIsSubmitting() ? <Spinner /> : "Post"
            //       }
            //     </Button>
            //     <Button
            //       onClick={handleResetSelectedCommentId}
            //       variant="secondary"
            //       disabled={checkIsSubmitting()}
            //     >Cancel</Button>
            //   </form>
            // </Form>
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