'use client'

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from '../ui/use-toast'
import AuthFormWrapper from './AuthFormWrapper'

const LoginSchema = z.object({
  usernameOrEmail: z.string().min(2, "Username or email required at least 2 characters"),
  password: z.string().min(6, "Minimim length of password is 6"),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    // defaultValues: {
    //   username: "",
    //   email: "",
    //   password: "",
    // },
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
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
    <AuthFormWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username / Email</FormLabel>
                <FormControl>
                  <Input placeholder="username or email" {...field} />
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
            Log In
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  )
}

export default LoginForm