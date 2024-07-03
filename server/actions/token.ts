"use server"

import { eq } from "drizzle-orm"
import { db } from ".."
import { emailTokens, passwordResetTokens, twoFactorTokens, users } from "../schema"


export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.query.emailTokens.findFirst({
            where: eq(emailTokens.token, email)
        })
        return verificationToken
    } catch (error) {
        return null
    }
}

export const generateEmailVerificationToken = async (email: string) => {
    const token = crypto.randomUUID()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken) {
        await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id))
    }

    const verificationToken = await db.insert(emailTokens).values({
        email,
        token,
        expires
    }).returning()

    return verificationToken

}

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByEmail(token)
    if (!existingToken) return { error: "Token not found" }
    const hasExpired = new Date(existingToken.expires) < new Date()
  
    if (hasExpired) return { error: "Token has expired" }
  
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    })
    if (!existingUser) return { error: "Email does not exist" }
  
    await db
      .update(users)
      .set({
        emailVerified: new Date(),
        email: existingToken.email,
      })
      .where(eq(users.id, existingUser.id))
  
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id))
    return { success: "Email Verified" }
  }

  export const getPasswordResetByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.query.passwordResetTokens.findFirst({
            where: eq(passwordResetTokens.token, token)
        })
        return passwordResetToken

    } catch (error) {
        return null
    }
  }

  export const getPasswordResetByTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.query.passwordResetTokens.findFirst({
            where: eq(passwordResetTokens.email, email)
        })

        return passwordResetToken

    } catch (error) {
            return null
    }
}
    
    export const getTwoFactorTokenByEmail = async (email: string) => {
        try {
            const twoFactorToken = await db.query.twoFactorTokens.findFirst({
                where: eq(twoFactorTokens.email, email)
            })
    
            return twoFactorToken
    
        } catch (error) {
                return null
        }
      }

      export const getTwoFactorTokenByToken = async (token: string) => {
        try {
            const twoFactorToken = await db.query.twoFactorTokens.findFirst({
                where: eq(twoFactorTokens.token, token)
            })
            return twoFactorToken
    
        } catch (error) {
            return null
        }
      }

  export const generatePasswordResetToken = async (email: string) => {
   try {
    const token = crypto.randomUUID();

    const expires = new Date(new Date().getTime() + 36000 * 1000);

    const existingToken = await getPasswordResetByToken(email)
    if(existingToken) {
        await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, existingToken.id))
    }

    const passwordResetToken = await db.insert(passwordResetTokens).values({
        email,
        token,
        expires
    }).returning()

    return passwordResetToken

   } catch (error) {
    return null
   }
   
  }