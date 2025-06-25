import { z } from 'zod'

const KrlStationSchema = z.object({
  sta_id: z.string(),
  sta_name: z.string(),
  group_wil: z.number(),
  fg_enable: z.number(),
})

export const KrlStationResponseSchema = z.object({
  data: z.array(KrlStationSchema),
})

export type KrlStation = z.infer<typeof KrlStationSchema>

export const TrainScheduleParamsSchema = z.object({
  stationid: z.string().min(2),
  timefrom: z.string().min(4),
  timeto: z.string().min(4),
})

export type TrainScheduleParams = z.infer<typeof TrainScheduleParamsSchema>
