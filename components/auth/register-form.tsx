"use client"

import { useForm } from "react-hook-form";
import { Form,  FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthCard } from "./auth-card"
import { zodResolver } from "@hookform/resolvers/zod"

import { RegisterSchema } from "@/types/register-schema";
import * as z from 'zod'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { useAction } from "next-safe-action/hooks"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { emailRegister } from "@/server/actions/email-register";


export const RegisterForm = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
      defaultValues: {
        email: "",
        password: "",
        name: "",
      },
    });
  
    const [error, setError] = useState('')
    const { execute, status } = useAction(emailRegister, {
        onSuccess(data) {
            if(data.success) {
                console.log(data.success)
            }
        },
    })
  
   
  
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log('before server action')
      execute(values)
    };
  
    return (
      <AuthCard
        cardTitle="Create an account 🎉"
        backButtonHref="/auth/login"
        backButtonLabel="Already have an account? Login here."
        showSocial
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Beni"
                          type="text"
                        />
                      </FormControl>
                      <FormDescription />
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
                        <Input
                          {...field}
                          placeholder="example@gmail.com"
                          type="email"
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormDescription />
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
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size={"sm"} variant={"link"} asChild>
                  <Link href="'/auth/reset">Forgot your password</Link>
                </Button>
              </div>
              <Button type="submit" className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}>
               Register
              </Button>
            </form>
          </Form>
        </div>
      </AuthCard>
    );
  };
  