import * as z from "zod"

export const verificationTokenSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
})
