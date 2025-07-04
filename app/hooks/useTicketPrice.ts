import { useMutation } from '@tanstack/react-query'

import {
  TicketPrice,
  TicketPriceResponse,
  TicketPriceSchema,
} from '../schemas/ticket-price'
import axiosPublic from '../api/axios'

const fetchTicketPrice = async (
  params: TicketPrice,
): Promise<TicketPriceResponse[]> => {
  const parsed = TicketPriceSchema.safeParse(params)

  if (!parsed.success) {
    throw new Error('All forms must be filled in')
  }

  const { stationfrom, stationto } = parsed.data

  const response = await axiosPublic.get('/fare', {
    params: {
      stationfrom,
      stationto,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  })

  return response.data.data
}

export const useTicketPrice = () => {
  return useMutation({
    mutationFn: fetchTicketPrice,
  })
}
