import { getTimeOfDay } from '@/app/lib/time'
import React from 'react'
import moment from 'moment'

const Greeting = ({ descipription }: { descipription?: string }) => {
  return (
    <div className='min-h-[250px] bg-primary-500 rounded-b-3xl pt-8 flex flex-col items-center'>
      <div className='text-white'>
        <p className='text-2xl font-medium'>Hello, good {getTimeOfDay()}.</p>
        <p className='text-sm text-center mt-1'>
          {moment().format('dddd, DD MMMM YYYY.')}
        </p>
      </div>

      {descipription && (
        <p className='mt-6 w-[365px] text-center text-default-200 font-medium text-2xl'>
          "{descipription}"
        </p>
      )}
    </div>
  )
}

export default Greeting
