'use client'

import React from 'react'
import ProfileAvatar from './custom/ProfileAvatar'
import AutoResizeTextarea from './custom/AutoResizeTextarea'
import { Button } from './ui/button'
import Comment from './Comment'

const CommentSection = () => {
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
  )
}

export default CommentSection