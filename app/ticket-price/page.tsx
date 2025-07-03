'use client'

import CommuterSearchPanel from '@/components/commuter-seacrh-panel'
import Greeting from '@/components/greeting'
import React, { useState } from 'react'
import { useKrlStation } from '../hooks/useKrlStation'
import { useToastOnError } from '../hooks/useToastOnError'
import { TicketPrice as TypeTicketPrice } from '../schemas/ticket-price'

const TicketPrice = () => {
  const {
    data: krlStationData,
    isLoading: isKrlStationLoading,
    isError: isKrlStationError,
    error: krlStationError,
  } = useKrlStation()

  useToastOnError(krlStationError, isKrlStationError)

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
    // mutate(searchScheduleFormObject)
  }

  const isCheckTicketPriceFormValid = true
  console.log(ticketPriceFormData)
  return (
    <div className='relative flex flex-col h-screen'>
      {/* GREETING */}
      <Greeting />

      {/* SEARCH PANEL */}
      <CommuterSearchPanel
        isKrlStationLoading={isKrlStationLoading}
        handleFormObjectChange={handleFormObjectChange}
        handleSubmitButtonClick={handleCheckTicketPrice}
        krlStationData={krlStationData}
        isSubmitButtonEnabled={isCheckTicketPriceFormValid}
        isButtonSubmitLoading={false}
        variant='ticket-price'
        title='Find the Best Fares for Your Journey'
      />
    </div>
  )
}

export default TicketPrice
