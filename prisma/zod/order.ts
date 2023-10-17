import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteProduct, relatedProductSchema } from "./index"

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
})

export interface CompleteOrder extends z.infer<typeof orderSchema> {
  user: CompleteUser
  products: CompleteProduct[]
}

/**
 * relatedOrderSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedOrderSchema: z.ZodSchema<CompleteOrder> = z.lazy(() => orderSchema.extend({
  user: relatedUserSchema,
  products: relatedProductSchema.array(),
}))
