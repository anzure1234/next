import { z } from 'zod';
export const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
})

export const configProject= configSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT

})

if(!configProject.success) {
    throw new Error("Invalid config")
}

export const envConfig = configProject.data