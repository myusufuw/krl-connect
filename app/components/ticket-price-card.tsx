import { TicketPriceResponse } from '@/app/schemas/ticket-price'
import React from 'react'

const TicketPriceCard = (props: {
  ticketPriceData: TicketPriceResponse | undefined
}) => {
  const { ticketPriceData } = props

  return (
    <div
      className='h-[190px] w-full bg-no-repeat bg-cover rounded-lg p-3 flex flex-col items-start justify-between'
      style={{ backgroundImage: "url('/assets/schedule-price-card-bg.png')" }}
    >
      <div className='flex flex-col gap-2 items-start'>
        <div className='bg-[#ebebebab] py-2 px-3 rounded-lg flex items-center'>
          <p className='truncate max-w-[360px]'>
            {ticketPriceData?.sta_name_from} STATION -{' '}
            {ticketPriceData?.sta_name_to} STATION
          </p>
        </div>

        <div className='bg-[#ebebebab] py-2 px-3 rounded-md flex items-center justify-center text-xs'>
          Estimated Time: {Number(ticketPriceData?.distance).toFixed()} minutes
        </div>
      </div>

      <div className='bg-blue-500 bg-opacity-80 py-2 px-4 rounded-lg flex self-end items-center justify-center text-white text-3xl'>
        Rp {ticketPriceData?.fare?.toLocaleString()}
      </div>
    </div>
  )
}

export default TicketPriceCard
