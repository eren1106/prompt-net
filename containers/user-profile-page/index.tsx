import ListCard from '@/components/prompts/ListCard'
import PromptCard from '@/components/prompts/PromptCard'
import PromptListForm from '@/components/prompts/PromptListForm'
import DialogButton from '@/components/custom/DialogButton'
import ProfileAvatar from '@/components/custom/ProfileAvatar'
import { DEFAULT_PROFILE_PIC_PATH } from '@/constants'
import { PromptList } from '@/models/prompt-list.model'
import { Prompt } from '@/models/prompt.model'
import { User } from '@/models/user.model'
import { getUserByUsername } from '@/services/user.service'
import { Plus } from 'lucide-react'
import React from 'react'

const ProfilePage = async ({ params }: any) => {
  const { id } = params;
  const user: User = await getUserByUsername(id);

  return (
    <div className='flex gap-4'>
      {/* LEFT */}
      <div className='flex flex-col gap-2'>
        <ProfileAvatar
          size="4xl"
          src={user.profilePicUri ?? DEFAULT_PROFILE_PIC_PATH}
        />
        <div>
          <h1>{user.fullname}</h1>
          <p className='bg-secondary rounded-full px-2 w-min'>{user.username}</p>
        </div>
        <p>{user.bio}</p>
      </div>

      {/* RIGHT */}
      <div className='flex flex-col gap-3'>
        <div>
          <h1 className='mb-2'>Created Prompts</h1>
          <div className='flex gap-3'>
            {
              user.createdPrompts.slice(0, 3).map((prompt: Prompt) =>
                <PromptCard
                  key={prompt.id}
                  promptData={prompt}
                />
              )
            }
          </div>
        </div>

        <div>
          <div className='flex items-end justify-between mb-2'>
            <h1 className='mb-2'>Created Lists</h1>
            <DialogButton
              className='flex gap-2 items-center'
              variant="secondary"
              title="Create List"
              content={<PromptListForm />}
            >
              <Plus size={16} />
              Create
            </DialogButton>
          </div>
          <div className='flex flex-col gap-3'>
            {
              user.promptLists.map((list: PromptList) => <ListCard promptList={list} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage