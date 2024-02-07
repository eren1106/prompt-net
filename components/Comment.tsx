'use client'

import React, { useState } from 'react'
import Dot from '@/components/custom/Dot'
import { AiOutlineLike } from 'react-icons/ai'
import ProfileAvatar from '@/components/custom/ProfileAvatar'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface CommentProps {
  profilePicUri: string;
  name: string;
  text: string;
  likes: number;
  isSub?: boolean;
  subComments?: CommentProps[];
}

const Comment = ({
  profilePicUri,
  name,
  text,
  likes,
  isSub = false,
  subComments = [],
}: CommentProps) => {
  const [showReplyTextField, setShowReplyTextField] = useState<boolean>(false);

  const toggleShowReplyTextField = () => {
    setShowReplyTextField(!showReplyTextField);
  }

  return (
    <div className={`${isSub ? "" : "pb-3 border-solid border-b border-secondary last:border-b-0"}`}>
      <div className='flex gap-4'>
        <ProfileAvatar
          size={isSub ? "sm" : "md"}
          src={profilePicUri}
        />
        <div className='w-full flex flex-col gap-2'>
          <h2>{name}</h2>
          <p>{text}</p>
          <div className='flex gap-2 items-center'>
            <p
              className='hover:underline cursor-pointer'
              onClick={toggleShowReplyTextField}
            >Reply</p>
            <Dot />
            <p>{`${likes} likes`}</p>
            <AiOutlineLike className='cursor-pointer' />
          </div>

          {/* REPLY TEXT FIELD */}
          {
            showReplyTextField &&
            <div className='flex gap-1'>
              <Input placeholder={`Reply to ${name}...`} />
              <Button onClick={toggleShowReplyTextField}>Send</Button>
              <Button
                onClick={toggleShowReplyTextField}
                variant="secondary"
              >Cancel</Button>
            </div>
          }

          {/* SUB COMMENTS */}
          {
            (!isSub && subComments.length > 0) &&
            <div className='flex flex-col gap-3 mt-4'>
              {
                subComments.map((comment: CommentProps) =>
                  <Comment
                    profilePicUri={comment.profilePicUri}
                    name={comment.name}
                    text={comment.text}
                    likes={comment.likes}
                    isSub
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

export default Comment