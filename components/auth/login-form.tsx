"use client"

import { AuthCard } from "./auth-card"



export const LoginForm = () => {
  return (
    <AuthCard cardTitle='Welcome Back!' backButtonHref='/auth/register' backButtonLabel='Create a new account' showSocial>
        <div>
            <h1>Hey</h1>
            </div>
    </AuthCard>
  )
}
