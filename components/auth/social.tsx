"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function Social() {
    return (
        <div>
            <Button onClick={() => signIn('google', {
                redirect: false,
                callbackUrl: '/',
            })}>Sign in with Google</Button>
            </div>
    )
}