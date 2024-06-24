"use client"

import { useForm } from "react-hook-form";
import { Form,  FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthCard } from "./auth-card"
import { zodResolver } from "@hookform/resolvers/zod"

import { NewPasswordSchema } from "@/types/new-password-schema";
import * as z from 'zod'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { emailSignIn } from "@/server/actions/email-signin";
import { useAction } from "next-safe-action/hooks"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { newPassword } from "@/server/actions/new-password";
import { useSearchParams } from "next/navigation";
 

  export const NewPasswordForm = () => {
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
      resolver: zodResolver(NewPasswordSchema),
      defaultValues: {
        password: "",
      },
    })

    const searchParams = useSearchParams();
    const token = searchParams.get('token')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { execute, status } = useAction(newPassword, {
    onSuccess(data) {
      if(data?.error) setError(data.error)
        if(data?.success) setSuccess(data.success)
    }
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    execute({password: values.password, token})
  };

  return (
    <AuthCard
      cardTitle="Enter a new password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      showSocial
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              
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
                        disabled={status === 'executing'}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={success} />
              <FormError message={error} />
              <Button size={"sm"} variant={"link"} asChild>
                <Link href="/auth/reset">Forgot your password</Link>
              </Button>
            </div>
            <Button type="submit" className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}>
             Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};
