import { useQuery } from '@tanstack/react-query'

import axiosPublic from '../api/axios'

type CommuterMapResponse = {
  area: number
  permalink: string
}

const fetchCommuterMap = async (): Promise<CommuterMapResponse[]> => {
  const response = await axiosPublic.get('/krl-webs/v1/routemap', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    }
  })

  return response.data.data
}

export const useCommuterMap = () => {
  return useQuery({
    queryKey: ['commuter-map'],
    queryFn: fetchCommuterMap,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false
  })
}
