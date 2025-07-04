import { z } from 'zod'

export const TicketPriceSchema = z.object({
  stationfrom: z.string().min(2),
  stationto: z.string().min(2)
})

export type TicketPrice = z.infer<typeof TicketPriceSchema>

export const TicketPriceResponseSchema = z.object({
  sta_code_from: z.string(),
  sta_name_from: z.string(),
  sta_code_to: z.string(),
  sta_name_to: z.string(),
  fare: z.number(),
  distance: z.string()
})

export type TicketPriceResponse = z.infer<typeof TicketPriceResponseSchema>
