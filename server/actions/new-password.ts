"use server"

import { NewPasswordSchema } from "@/types/new-password-schema"
import { createSafeActionClient } from 'next-safe-action'

const action = createSafeActionClient()

export const newPassword = action(NewPasswordSchema, async ({password, token}) => {

        if(!token) {
            return { error: 'Missing token' }
        }
})