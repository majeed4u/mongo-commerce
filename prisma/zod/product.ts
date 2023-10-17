import * as z from "zod"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortdesc: z.string(),
  longdesc: z.string(),
  newArrival: z.boolean(),
  bestSeller: z.boolean(),
  topRated: z.boolean(),
  price: z.number(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
