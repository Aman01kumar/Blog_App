import z from "zod"

export const signupSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(30)
})

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(30),
});