import React, { ReactNode } from 'react'
import { Card } from '../ui/card'
import SeparatorWithText from '../ui/custom/SeparatorWithText'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'

interface AuthFormWrapperProp {
  isSignup?: boolean;
  children: ReactNode;
}

const AuthFormWrapper = ({isSignup=false, children}: AuthFormWrapperProp) => {
  return (
    <Card className='w-96'>
      <h1 className='mb-3'>{isSignup ? 'Sign Up' : 'Log In'}</h1>
      {children}
      <SeparatorWithText text="OR" />
      <div className='flex gap-3'>
        <Button variant="outline" className='w-full'>
          <FcGoogle size={20} />
        </Button>
        <Button variant="outline" className='w-full'>
          <FaGithub size={20} />
        </Button>
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