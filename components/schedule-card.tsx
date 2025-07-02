import { TrainScheduleResponse } from '@/app/schemas/krlStation'
import { Icon } from '@iconify/react'
import React from 'react'

const ScheduleCard = ({ train }: { train: TrainScheduleResponse }) => {
  const trainInformationList = [
    {
      icon: 'material-symbols:train-outline',
      content: `${train.ka_name} - ${train.train_id}`,
    },
    {
      icon: 'mdi:clock-outline',
      content: `${train.time_est} WIB`,
    },
    {
      icon: 'fa6-solid:route',
      content: train.route_name,
    },
  ]

  return (
    <div className='p-4 border border-default-200 rounded-lg shadow-sm w-full flex relative'>
      <div className='flex-1 flex flex-col gap-2'>
        {trainInformationList.map((item, index) => (
          <div key={index} className='flex items-center gap-2 text-default-500'>
            <Icon icon={item.icon} />
            <p className='truncate w-[320px] text-xs'>{item.content}</p>
          </div>
        ))}
      </div>
      <button
        className='transform -rotate-90 absolute -right-7 top-7 rounded-b-md w-[97px] text-white py-2'
        style={{ backgroundColor: train.color }}
      >
        DETAIL
      </button>
    </div>
  )
}

export default ScheduleCard
