import AuthForm from '@/components/auth/AuthForm'
import React from 'react'

/**
 *  purpose of moving signup form to a component
 *  => dont want put 'use client' at here because react-hook-form need 'use client'
 */

const SignUpPage = () => {
  return (
    <div className='flex flex-col items-center flex-1 justify-center'>
      <AuthForm isSignup={true} />
    </div>
  )
}

export default SignUpPage