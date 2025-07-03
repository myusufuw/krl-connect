'use client'

import Greeting from '@/components/greeting'
import { useKrlStation } from './hooks/useKrlStation'
import React, { useState } from 'react'
import {
  TrainScheduleParams,
  TrainScheduleParamsSchema,
} from './schemas/krlStation'
import { useTrainSchedule } from './hooks/useTrainSchedule'
import Loading from '@/components/loading'
import ScheduleCard from '@/components/schedule-card'
import { useToastOnError } from './hooks/useToastOnError'
import CommuterSearchPanel from '@/components/commuter-seacrh-panel'

export default function Home() {
  const {
    data: krlStationData,
    isLoading: isKrlStationLoading,
    isError: isKrlStationError,
    error: krlStationError,
  } = useKrlStation()
  const {
    mutate,
    data: trainSchedules,
    isPending,
    isError: isTrainScheduleError,
    error: trainScheduleError,
  } = useTrainSchedule()

  useToastOnError(trainScheduleError, isTrainScheduleError)
  useToastOnError(krlStationError, isKrlStationError)

  const [searchScheduleFormObject, setSearchScheduleFormObject] =
    useState<TrainScheduleParams>({
      stationid: '',
      timefrom: '',
      timeto: '',
    })

  const handleFormObjectChange = (name: string, value: React.Key | null) => {
    setSearchScheduleFormObject((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const isSearchFormValid = TrainScheduleParamsSchema.safeParse(
    searchScheduleFormObject
  ).success

  const handleSearchButtonClick = () => {
    mutate(searchScheduleFormObject)
  }

  return (
    <div className='relative flex flex-col h-screen'>
      {/* GREETING */}
      <Greeting />

      {/* SEARCH PANEL */}
      <CommuterSearchPanel
        isKrlStationLoading={isKrlStationLoading}
        handleFormObjectChange={handleFormObjectChange}
        handleSubmitButtonClick={handleSearchButtonClick}
        krlStationData={krlStationData}
        isSubmitButtonEnabled={isSearchFormValid}
        isButtonSubmitLoading={isPending}
      />

      {/* SCHEDULE LIST */}
      <div className='mt-[20vh] w-full px-4 h-[100%] pb-[90px] sm:pb-[30px] flex flex-col gap-4 justify-center items-center overflow-hidden'>
        {isPending ? (
          <Loading />
        ) : (
          <div className='flex flex-col pb-2 h-full w-full gap-4 overflow-y-auto overflow-x-hidden no-scrollbar'>
            {trainSchedules?.map((item, index) => (
              <ScheduleCard key={index} schedule={item} />
            ))}

            {isTrainScheduleError && (
              <div className='h-full flex items-center justify-center'>
                <p className='text-xl text-default-900'>Data Not Found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
