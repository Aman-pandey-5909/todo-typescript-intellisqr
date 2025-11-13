import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().trim().min(6)
})
export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    name: z.string().trim(),
    email: z.string().trim().email(),
    password: z.string().trim().min(6, "Password must be at least 6 characters long")
})
export type RegisterInput = z.infer<typeof registerSchema>