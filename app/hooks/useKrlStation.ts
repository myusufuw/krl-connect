import { useQuery } from '@tanstack/react-query'
import axiosPublic from '../api/axios'
import { KrlStationResponseSchema, KrlStation } from '../schemas/krlStation'

type currentGroup = {
  title: string
  value: KrlStation[]
}

const fetchStationList = async () => {
  const response = await axiosPublic.get('/krl-station')
  const result = KrlStationResponseSchema.safeParse(response.data)

  if (!result.success) {
    return []
  } else {
    const output: currentGroup[] = []
    let currentGroup: currentGroup | null = null

    result.data.data.forEach((item) => {
      if (item.fg_enable === 0) {
        if (currentGroup) {
          output.push(currentGroup)
        }

        currentGroup = { title: item.sta_name, value: [] }
      } else {
        if (currentGroup) {
          currentGroup.value.push(item)
        }
      }
    })

    if (currentGroup) {
      output.push(currentGroup)
    }

    return output || []
  }
}

export const useKrlStation = () => {
  return useQuery({
    queryKey: ['station-list'],
    queryFn: fetchStationList,
  })
}
