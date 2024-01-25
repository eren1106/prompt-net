'use client'

import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from '../ui/use-toast'
import { Card } from '../ui/card'
import SeparatorWithText from '../ui/custom/SeparatorWithText'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'

const LoginSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(6),
});

const SignupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  email: z.string().email("This is not a valid email."),
  password: z.string().min(6),
});

interface AuthFormProp {
  isSignup?: boolean;
}

const AuthForm = ({ isSignup = false }: AuthFormProp) => {
  const FormSchema = isSignup ? SignupSchema : LoginSchema;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // defaultValues: {
    //   username: "",
    //   email: "",
    //   password: "",
    // },
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Card className='w-96'>
      <h1 className='mb-3'>{isSignup ? 'Sign Up' : 'Log In'}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {
            isSignup && <FormField
              control={form.control}
              // @ts-ignore
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} autoComplete='off' />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          }

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className='w-full'>
            {isSignup ? 'Sign Up' : 'Log In'}
          </Button>
        </form>
      </Form>
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

export default AuthForm