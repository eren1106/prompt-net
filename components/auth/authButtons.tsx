'use client'

import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const GoogleAuthButton = () => {
  const router = useRouter();
  const handleClickGoogle = async () => {
    await signIn("google", { callbackUrl: '/prompts' });
    // router.push('/prompts');
  }

  return (
    <Button variant="outline" className='w-full' onClick={handleClickGoogle}>
      <FcGoogle size={20} />
    </Button>
  )
}

export const GithubAuthButton = () => {
  const router = useRouter();
  const handleClickGithub = async () => {
    await signIn("github", { callbackUrl: '/prompts' });
    // router.push('/prompts');
  }

  return (
    <Button variant="outline" className='w-full' onClick={handleClickGithub}>
      <FaGithub size={20} />
    </Button>
  )
}