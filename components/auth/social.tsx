"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { FcGoogle } from 'react-icons/fc'

export default function Social() {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Button
      variant={'outline'}
        className="gap-4 flex w-full"
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        <p>Sign in with Google</p>
        <FcGoogle className='h-5 w-5' />
      </Button>
    </div>
  );
}