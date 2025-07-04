import { z } from 'zod'

const KrlStationSchema = z.object({
  sta_id: z.string(),
  sta_name: z.string(),
  group_wil: z.number(),
  fg_enable: z.number()
})

export const KrlStationResponseSchema = z.object({
  data: z.array(KrlStationSchema)
})

export type KrlStation = z.infer<typeof KrlStationSchema>

export const TrainScheduleParamsSchema = z.object({
  stationid: z.string().min(2),
  timefrom: z.string().min(4),
  timeto: z.string().min(4)
})

export type TrainScheduleParams = z.infer<typeof TrainScheduleParamsSchema>

export const TrainScheduleResponseSchema = z.object({
  color: z.string(),
  dest: z.string(),
  dest_time: z.string(),
  ka_name: z.string(),
  route_name: z.string(),
  time_est: z.string(),
  train_id: z.string()
})

export type TrainScheduleResponse = z.infer<typeof TrainScheduleResponseSchema>

export const DetailTrainScheduleParamsSchema = z.object({
  train_id: z.string(),
  ka_name: z.string(),
  station_id: z.string(),
  station_name: z.string(),
  time_est: z.string(),
  transit_station: z.boolean(),
  color: z.string(),
  transit: z.array(z.string())
})

export type DetailTrainScheduleParams = z.infer<
  typeof DetailTrainScheduleParamsSchema
>
