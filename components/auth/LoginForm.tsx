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
import { LoginSchema } from '@/schemas'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useLoading from '@/hooks/loading.hook'

const LoginForm = () => {
  const router = useRouter();
  const { loading, setLoading, Loader } = useLoading();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    // defaultValues: {
    //   username: "",
    //   email: "",
    //   password: "",
    // },
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);

    try {
      const { email, password } = data;
      const res: any = await signIn("credentials", {
        email: email,
        password,
        redirect: false,
      });
      console.log({ response: res });
      // if (!res?.error) {
      //   router.push("/prompts");
      //   // router.refresh();
      // }

      if (res.error) {
        // toast({
        //   title: res.error,
        //   variant: "destructive"
        // })
        // setLoading(false);
        throw new Error(res.error);
      }

      if (!res.ok) {
        // toast({
        //   title: "Network response was not ok",
        //   variant: "destructive"
        // })
        // setLoading(false);
        throw new Error("Network response was not ok");
      }

      // Process response here
      console.log("Login Successful", res);
      toast({ title: "Login Successful" });
      router.push("/prompts");
    }
    catch (err) {
      console.log(err);
      toast({
        title: String(err),
        variant: "destructive"
      })
    }

    setLoading(false);
  }

  return (
    <AuthFormWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
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

          <Button type="submit" className='w-full' disabled={loading}>
            <Loader />
            Log In
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  )
}

export default LoginForm