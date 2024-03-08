'use client'

import React, { useEffect, useState } from 'react'
import ProfileAvatar from './custom/ProfileAvatar'
import AutoResizeTextarea from './custom/AutoResizeTextarea'
import { Button } from './ui/button'
import CommentComponent from './Comment'
import { Comment } from '@/models/comment.model'
import { getAllPromptComments } from '@/services/prompt.service'
import useLoading from '@/hooks/loading.hook'
import { DEFAULT_PROFILE_PIC_PATH } from '@/constants'

interface CommentSectionProps {
  promptId: number
}

const CommentSection = ({ promptId }: CommentSectionProps) => {
  // TODO: improvement => remove state & useEffect (can try to make everything inside a hook)
  const [comments, setComments] = useState<Comment[]>([]);
  const { loading, setLoading, Loader } = useLoading();

  useEffect(() => {
    setLoading(true);
    getAllPromptComments(promptId)
      .then((fetchedComments: Comment[]) => {
        setComments(fetchedComments);
      })
      .catch((err) => {
        console.log("Error on fetching comments: ", err);
        // TODO: show error toast
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
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
        {
          loading ? <Loader /> : comments.map((comment: Comment) =>
            <CommentComponent
              id={comment.id}
              profilePicUri={comment.author.profilePicUri ?? DEFAULT_PROFILE_PIC_PATH}
              name={comment.author.fullname}
              text={comment.value}
              likes={comment.likes.length}
            />
          )
        }
        {/* <CommentComponent
          id={1}
          profilePicUri='https://github.com/shadcn.png'
          name='Your name'
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, necessitatibus aspernatur quisquam eligendi ducimus cumque?'
          likes={100}
        />
        <CommentComponent
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
        <CommentComponent
          id={5}
          profilePicUri='https://github.com/shadcn.png'
          name='Your name'
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, necessitatibus aspernatur quisquam eligendi ducimus cumque?'
          likes={100}
        /> */}
      </div>
    </section>
  )
}

export default CommentSection