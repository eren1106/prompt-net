import React, { ReactNode } from 'react'
import { Card } from '../ui/card'
import SeparatorWithText from '../custom/SeparatorWithText'
import Link from 'next/link'
import { GithubAuthButton, GoogleAuthButton } from './authButtons'

interface AuthFormWrapperProps {
  isSignup?: boolean;
  children: ReactNode;
}

const AuthFormWrapper = ({isSignup=false, children}: AuthFormWrapperProps) => {
  return (
    <Card className='w-96'>
      <h1 className='mb-3'>{isSignup ? 'Sign Up' : 'Log In'}</h1>
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