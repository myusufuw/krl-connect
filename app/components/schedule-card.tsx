import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

import { TrainScheduleResponse } from '@/app/schemas/commuter-schedule'

const ScheduleCard = ({ schedule }: { schedule: TrainScheduleResponse }) => {
  const trainInformationList = [
    {
      icon: 'material-symbols:train-outline',
      content: `${schedule.ka_name} - ${schedule.train_id}`
    },
    {
      icon: 'mdi:clock-outline',
      content: `${schedule.time_est} WIB`
    },
    {
      icon: 'fa6-solid:route',
      content: schedule.route_name
    }
  ]

  return (
    <div className='p-4 border border-default-200 rounded-lg shadow-sm w-full flex relative'>
      <div className='flex-1 flex flex-col gap-2'>
        {trainInformationList.map((item, index) => (
          <div key={index} className='flex items-center gap-2 text-default-500'>
            <Icon icon={item.icon} />
            <p className='truncate w-[70%] sm:w-[80%] text-xs'>
              {item.content}
            </p>
          </div>
        ))}
      </div>
      <Link
        className='transform -rotate-90 absolute -right-7 top-7 rounded-b-md w-[97px] text-white py-2 flex items-center justify-center'
        href={`/detail-schedule?commuterName=${schedule.ka_name}&commuterId=${schedule.train_id}`}
        style={{ backgroundColor: schedule.color }}
      >
        DETAIL
      </Link>
    </div>
  )
}

export default ScheduleCard
