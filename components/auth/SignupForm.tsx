'use client'

import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from '../ui/use-toast'
import AuthFormWrapper from './AuthFormWrapper'
import { SignupSchema } from '@/schemas'
import { signupUser } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import useLoading from '@/hooks/loading.hook'

const SignupForm = () => {
  const router = useRouter();
  const { loading, setLoading, Loader } = useLoading();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    // defaultValues: {
    //   username: "",
    //   email: "",
    //   password: "",
    // },
  })

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    setLoading(true);
    try {
      await signupUser({
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });
      toast({
        title: "Signup successfully",
      })
      router.push('/prompts');
    }
    catch (err) {
      console.log("Signup error: ", err);
      toast({
        title: "Signup error: " + err,
        variant: "destructive",
      })
    }
    setLoading(false);
  }

  return (
    <AuthFormWrapper isSignup={true}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} autoComplete='off' />
                </FormControl>
                <FormDescription>
                  Username must be unique
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder="fullname" {...field} autoComplete='off' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button type="submit" className='w-full' disabled={loading}>
            <Loader />
            Sign Up
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  )
}

export default SignupForm