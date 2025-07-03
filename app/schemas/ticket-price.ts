import { z } from 'zod'

export const TicketPriceSchema = z.object({
  stationfrom: z.string(),
  stationto: z.string(),
})

export type TicketPrice = z.infer<typeof TicketPriceSchema>
