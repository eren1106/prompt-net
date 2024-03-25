import React, { ReactNode } from 'react'
import { Card } from '../ui/card'
import SeparatorWithText from '../custom/SeparatorWithText'
import Link from 'next/link'
import { GithubAuthButton, GoogleAuthButton } from './authButtons'
import LinkButton from '../custom/LinkButton'
import { HomeIcon } from 'lucide-react'

interface AuthFormWrapperProps {
  isSignup?: boolean;
  children: ReactNode;
}

const AuthFormWrapper = ({ isSignup = false, children }: AuthFormWrapperProps) => {
  return (
    <Card className='w-96'>
      <div className='flex justify-between items-center'>
        <h1 className='mb-2'>{isSignup ? 'Sign Up' : 'Log In'}</h1>
        <LinkButton href="/" variant="outline">
         <HomeIcon size={16} />
        </LinkButton>
      </div>
      {children}
      <SeparatorWithText text="OR" />
      <div className='flex gap-3'>
        <GoogleAuthButton />
        <GithubAuthButton />
      </div>
      {
        isSignup
          ? <div className='mt-5 text-center'>
            Already have an account? <Link href="/login" className='underline'>Log In</Link> here
          </div>
          : <div className='mt-5 text-center'>
            Don't have an account? <Link href="/signup" className='underline'>Sign Up</Link> here
          </div>
      }
    </Card>
  )
}

export default AuthFormWrapper