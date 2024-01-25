import SignUpForm from '@/components/SignUpForm'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import SeparatorWithText from '@/components/ui/custom/SeparatorWithText'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React from 'react'
import Link from 'next/link';

/**
 *  purpose of moving signup form to a component
 *  => dont want put 'use client' at here because react-hook-form need 'use client'
 */

const SignUpPage = () => {
  return (
    <div className='flex flex-col items-center flex-1 justify-center'>
      <Card className='w-96'>
        <h1 className='mb-3'>Sign Up</h1>
        <SignUpForm />
        <SeparatorWithText text="OR" />
        <div className='flex gap-3'>
          <Button variant="outline" className='w-full'>
            <FcGoogle size={20} />
          </Button>
          <Button variant="outline" className='w-full'>
            <FaGithub size={20} />
          </Button>
        </div>
        <div className='mt-5 text-center'>Already have an account? <Link href="/login">Login here</Link></div>
      </Card>
    </div>
  )
}

export default SignUpPage