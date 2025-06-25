'use client'

import Greeting from '@/components/greeting'
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from '@heroui/autocomplete'
import { generateHourlyStrings } from './lib/time'
import { Button } from '@heroui/button'
import { useKrlStation } from './hooks/useKrlStation'
import { useState } from 'react'
import {
  TrainScheduleParams,
  TrainScheduleParamsSchema,
} from './schemas/krlStation'

export default function Home() {
  const { data, isLoading, isError } = useKrlStation()

  const [searchScheduleFormObject, setSearchScheduleFormObject] =
    useState<TrainScheduleParams>({
      stationid: '',
      timefrom: '',
      timeto: '',
    })

  const handleFormObjectChange = (name: string, value: string) => {
    setSearchScheduleFormObject((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const isButtonSearchDisabled = TrainScheduleParamsSchema.safeParse(
    searchScheduleFormObject
  ).success

  return (
    <div className='relative'>
      <Greeting />

      <div className='bg-white p-4 absolute top-[45%] rounded-2xl mx-4 shadow-md'>
        <p className='font-medium text-2xl'>Where do you want to go?</p>
        <p className='text-sm text-default-400'>
          Explore new place, get new experience!
        </p>

        <Autocomplete
          fullWidth
          size='sm'
          className='mt-4'
          scrollShadowProps={{
            isEnabled: false,
          }}
          label='Select the station'
          items={data ? data : []}
          isLoading={isLoading}
          onInputChange={(value) => handleFormObjectChange('stationid', value)}
        >
          {(data) => (
            <AutocompleteSection
              key={data.title}
              title={data.title}
              items={data.value}
            >
              {(stations) => (
                <AutocompleteItem
                  key={stations.sta_name}
                  textValue={stations.sta_id}
                >
                  {stations.sta_name}
                </AutocompleteItem>
              )}
            </AutocompleteSection>
          )}
        </Autocomplete>

        <div className='flex flex-row w-full justify-between gap-4 my-4'>
          <Autocomplete
            fullWidth
            size='sm'
            defaultItems={generateHourlyStrings()}
            label='Start'
            onInputChange={(value) => handleFormObjectChange('timefrom', value)}
          >
            {(item) => (
              <AutocompleteItem key={item.value} textValue={item.value}>
                {item.value}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Autocomplete
            fullWidth
            size='sm'
            defaultItems={generateHourlyStrings()}
            label='End'
            onInputChange={(value) => handleFormObjectChange('timeto', value)}
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        <Button
          color='primary'
          fullWidth
          size='lg'
          radius='md'
          isDisabled={!isButtonSearchDisabled}
        >
          Search Commuter Line
        </Button>
      </div>
    </div>
  )
}
