import React from 'react'
import Dot from '@/components/custom/Dot'
import { AiOutlineLike } from 'react-icons/ai'
import ProfileAvatar from '@/components/custom/ProfileAvatar'

interface CommentProps {
  profilePicUri: string;
  name: string;
  text: string;
  likes: number;
}

const Comment = ({
  profilePicUri,
  name,
  text,
  likes,
}: CommentProps) => {
  return (
    <div className='flex gap-4 pb-3 border-solid border-b border-secondary last:border-b-0'>
      <ProfileAvatar
        size="md"
        src={profilePicUri}
      />
      <div className='w-full flex flex-col gap-2'>
        <h2>{name}</h2>
        <p>{text}</p>
        <div className='flex gap-2 items-center'>
          <p className='hover:underline cursor-pointer'>Reply</p>
          <Dot />
          <p>{`${likes} likes`}</p>
          <AiOutlineLike className='cursor-pointer' />
        </div>
      </div>
    </div>

  )
}

export default Comment