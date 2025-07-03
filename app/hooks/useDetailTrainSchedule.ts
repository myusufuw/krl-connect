import { useMutation } from '@tanstack/react-query'
import axiosPublic from '../api/axios'
import { DetailTrainScheduleParams } from '../schemas/commuter-schedule'

const fetchDetailTrainSchedule = async (params: {
  trainid: string | null
}): Promise<DetailTrainScheduleParams[]> => {
  const response = await axiosPublic.get('/schedule-train', {
    params: {
      trainid: params.trainid,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  })

  return response.data.data
}

export const useDetailTrainSchedule = () => {
  return useMutation({
    mutationFn: fetchDetailTrainSchedule,
  })
}
