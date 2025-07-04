'use client'

import React, { useState } from 'react'

import { useKrlStation } from '../hooks/useKrlStation'
import { useToastOnError } from '../hooks/useToastOnError'
import {
  TicketPriceSchema,
  TicketPrice as TypeTicketPrice,
} from '../schemas/ticket-price'
import { useTicketPrice } from '../hooks/useTicketPrice'

import Greeting from '@/app/components/greeting'
import CommuterSearchPanel from '@/app/components/commuter-seacrh-panel'
import TicketPriceCard from '@/app/components/ticket-price-card'

const TicketPrice = () => {
  const {
    data: krlStationData,
    isLoading: isKrlStationLoading,
    isError: isKrlStationError,
    error: krlStationError,
  } = useKrlStation()

  const {
    mutate,
    isPending,
    isError: isTicketPriceError,
    error: ticketPriceError,
    data: ticketPriceData,
  } = useTicketPrice()

  useToastOnError(krlStationError, isKrlStationError)
  useToastOnError(ticketPriceError, isTicketPriceError)

  const [ticketPriceFormData, setTicketPriceFormData] =
    useState<TypeTicketPrice>({
      stationfrom: '',
      stationto: '',
    })

  const handleFormObjectChange = (name: string, value: React.Key | null) => {
    setTicketPriceFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleCheckTicketPrice = () => {
    mutate(ticketPriceFormData)
  }

  const isCheckTicketPriceFormValid =
    TicketPriceSchema.safeParse(ticketPriceFormData).success

  return (
    <div className='relative flex flex-col h-screen'>
      {/* GREETING */}
      <Greeting />

      {/* SEARCH PANEL */}
      <CommuterSearchPanel
        handleFormObjectChange={handleFormObjectChange}
        handleSubmitButtonClick={handleCheckTicketPrice}
        isButtonSubmitLoading={isPending}
        isKrlStationLoading={isKrlStationLoading}
        isSubmitButtonEnabled={isCheckTicketPriceFormValid}
        krlStationData={krlStationData}
        title='Find the Best Fares for Your Journey'
        variant='ticket-price'
      />

      {/* SCHEDULE PRICE */}
      <div className='mt-[24vh] w-full px-4 flex flex-col items-center overflow-hidden'>
        {ticketPriceData && (
          <TicketPriceCard
            ticketPriceData={ticketPriceData ? ticketPriceData[0] : undefined}
          />
        )}

        {isTicketPriceError && (
          <div className='h-full flex items-center justify-center mt-10'>
            <p className='text-xl text-default-900'>Data Not Found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketPrice
