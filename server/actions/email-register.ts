"use server"

import { RegisterSchema } from "@/types/register-schema"
import { createSafeActionClient } from "next-safe-action"
import bcrypt from 'bcrypt'
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { db } from ".."
import { generateEmailVerificationToken } from "./token"

const action = createSafeActionClient()

export const emailRegister = action(RegisterSchema, async ({email, name, password}) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    })

    if(existingUser) {
        if(!existingUser.emailVerified) {
            const verificationToken = await generateEmailVerificationToken(email);
            await sendVerificationEmail()

            return { success: 'Email Confirmation resent'}
        }
        return {error: 'Email already in use'}
    }

    await db.insert(users).values({
        email,
        name,
        password:  hashedPassword
    })


})
