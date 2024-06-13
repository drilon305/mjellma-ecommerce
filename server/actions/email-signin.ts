"use server"

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export const emailSignIn = action(LoginSchema, async ({email, password, code}) => {
    console.log(email, password, code);
    return { email }
}
)