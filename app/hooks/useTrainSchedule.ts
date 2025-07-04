import { useMutation } from '@tanstack/react-query'

import {
  TrainScheduleParams,
  TrainScheduleParamsSchema,
  TrainScheduleResponse
} from '../schemas/commuter-schedule'
import axiosPublic from '../api/axios'

const fetchTrainSchedule = async (
  params: TrainScheduleParams
): Promise<TrainScheduleResponse[]> => {
  const parsed = TrainScheduleParamsSchema.safeParse(params)

  if (!parsed.success) {
    throw new Error('All forms must be filled in')
  }

  const { stationid, timefrom, timeto } = parsed.data

  const response = await axiosPublic.get('/schedule', {
    params: {
      stationid,
      timefrom,
      timeto
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    }
  })

  return response.data.data
}

export const useTrainSchedule = () => {
  return useMutation({
    mutationFn: fetchTrainSchedule
  })
}
