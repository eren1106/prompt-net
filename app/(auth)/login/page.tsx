import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

/**
 *  purpose of moving signup form to a component
 *  => dont want put 'use client' at here because react-hook-form need 'use client'
 */

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center flex-1 justify-center'>
      <LoginForm />
    </div>
  )
}

export default LoginPage