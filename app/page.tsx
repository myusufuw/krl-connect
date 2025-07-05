'use client'

import React, { useState } from 'react'
import clsx from 'clsx'

import { useKrlStation } from './hooks/useKrlStation'
import {
  TrainScheduleParams,
  TrainScheduleParamsSchema
} from './schemas/commuter-schedule'
import { useTrainSchedule } from './hooks/useTrainSchedule'
import { useToastOnError } from './hooks/useToastOnError'
import { useAppContext } from './context/app-context'

import Loading from '@/app/components/loading'
import ScheduleCard from '@/app/components/schedule-card'
import Greeting from '@/app/components/greeting'
import CommuterSearchPanel from '@/app/components/commuter-seacrh-panel'

export default function Home() {
  const {
    data: krlStationData,
    isLoading: isKrlStationLoading,
    isError: isKrlStationError,
    error: krlStationError
  } = useKrlStation()

  const {
    mutate,
    data: trainSchedules,
    isPending,
    isError: isTrainScheduleError,
    error: trainScheduleError
  } = useTrainSchedule()

  const { isSearchPanelExpanded, setIsSearchPanelExpanded } = useAppContext()

  useToastOnError(trainScheduleError, isTrainScheduleError)
  useToastOnError(krlStationError, isKrlStationError)

  const [searchScheduleFormObject, setSearchScheduleFormObject] =
    useState<TrainScheduleParams>({
      stationid: '',
      timefrom: '',
      timeto: ''
    })

  const handleFormObjectChange = (name: string, value: React.Key | null) => {
    setSearchScheduleFormObject((current) => ({
      ...current,
      [name]: value
    }))
  }

  const isSearchFormValid = TrainScheduleParamsSchema.safeParse(
    searchScheduleFormObject
  ).success

  const handleSearchButtonClick = () => {
    mutate(searchScheduleFormObject, {
      onSuccess: () =>
        setTimeout(() => {
          setIsSearchPanelExpanded(false)
        }, 1000)
    })
  }

  return (
    <div className='relative flex flex-col h-screen'>
      {/* GREETING */}
      <Greeting />

      {/* SEARCH PANEL */}
      <CommuterSearchPanel
        handleFormObjectChange={handleFormObjectChange}
        handleSubmitButtonClick={handleSearchButtonClick}
        isButtonSubmitLoading={isPending}
        isKrlStationLoading={isKrlStationLoading}
        isSubmitButtonEnabled={isSearchFormValid}
        krlStationData={krlStationData}
      />

      {/* SCHEDULE LIST */}
      <div
        className={clsx(
          'w-full px-4 h-[100%] flex flex-col gap-4 justify-center items-center overflow-hidden transition-all duration-500 pt-2',
          isSearchPanelExpanded
            ? 'mt-[23vh] sm:pb-[90px] pb-[100px]'
            : 'mt-[10vh] pb-[80px] sm:pb-[18px]'
        )}
      >
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
