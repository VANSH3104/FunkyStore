import { z } from "zod"

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    LOCAL_DATABASE_URL: z.string().url().optional(),
    USE_LOCAL_DB: z.string().optional(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
})

export const env = envSchema.parse(process.env)
