import React from 'react'
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection
} from '@heroui/autocomplete'
import { Button } from '@heroui/button'
import clsx from 'clsx'
import { Icon } from '@iconify/react'

import { useAppContext } from '../context/app-context'

import { generateHourlyStrings } from '@/app/lib/time'
import { KrlStation } from '@/app/schemas/commuter-schedule'

type CommuterSearchPanelProps = {
  isKrlStationLoading: boolean
  handleFormObjectChange: (name: string, value: React.Key | null) => void
  krlStationData: KrlStationData[] | undefined
  isSubmitButtonEnabled: boolean
  handleSubmitButtonClick: () => void
  isButtonSubmitLoading: boolean
  variant?: 'home' | 'ticket-price'
  title?: string
  description?: string
}

type KrlStationData = {
  title: string
  value: KrlStation[]
}

const CommuterSearchPanel = (props: CommuterSearchPanelProps) => {
  const {
    isKrlStationLoading,
    handleFormObjectChange,
    krlStationData,
    isSubmitButtonEnabled,
    handleSubmitButtonClick,
    isButtonSubmitLoading,
    variant = 'home',
    title = 'Where do you want to go?',
    description = 'Explore new place, get new experience!'
  } = props

  const { isSearchPanelExpanded, setIsSearchPanelExpanded } = useAppContext()

  const isHomePageVariant = variant === 'home'

  const handleOnSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmitButtonClick()
  }

  return (
    <form
      className={clsx(
        'bg-white p-4 pb-1 absolute rounded-2xl mx-4 shadow-md transition-all duration-500 flex flex-col items-center z-10',
        isSearchPanelExpanded ? 'top-[15%]' : 'top-[2%]'
      )}
      onSubmit={handleOnSubmitForm}
    >
      <p className='font-medium text-2xl text-center'>{title}</p>
      {isHomePageVariant && (
        <p className='text-sm text-default-400 text-center'>{description}</p>
      )}

      <Autocomplete
        fullWidth
        className='mt-4'
        inputProps={{ classNames: { input: 'text-base' } }}
        isLoading={isKrlStationLoading}
        label={isHomePageVariant ? 'Select the station' : 'From'}
        scrollShadowProps={{
          isEnabled: false
        }}
        onSelectionChange={(value) =>
          handleFormObjectChange(
            isHomePageVariant ? 'stationid' : 'stationfrom',
            value
          )
        }
      >
        {krlStationData ? (
          krlStationData.map((data) => (
            <AutocompleteSection
              key={data?.title}
              items={data?.value}
              title={data?.title}
            >
              {(stations) => (
                <AutocompleteItem
                  key={stations?.sta_id}
                  textValue={stations?.sta_name}
                >
                  {stations?.sta_name}
                </AutocompleteItem>
              )}
            </AutocompleteSection>
          ))
        ) : (
          <></>
        )}
      </Autocomplete>

      {!isHomePageVariant && (
        <Autocomplete
          fullWidth
          className='mt-4 mb-4'
          inputProps={{ classNames: { input: 'text-base' } }}
          isLoading={isKrlStationLoading}
          label='To'
          scrollShadowProps={{
            isEnabled: false
          }}
          size='sm'
          onSelectionChange={(value) =>
            handleFormObjectChange('stationto', value)
          }
        >
          {krlStationData ? (
            krlStationData.map((data) => (
              <AutocompleteSection
                key={data?.title}
                items={data?.value}
                title={data?.title}
              >
                {(stations) => (
                  <AutocompleteItem
                    key={stations?.sta_id}
                    textValue={stations?.sta_name}
                  >
                    {stations?.sta_name}
                  </AutocompleteItem>
                )}
              </AutocompleteSection>
            ))
          ) : (
            <></>
          )}
        </Autocomplete>
      )}

      {isHomePageVariant && (
        <div className='flex flex-row w-full justify-between gap-4 my-4'>
          <Autocomplete
            fullWidth
            defaultItems={generateHourlyStrings()}
            inputProps={{ classNames: { input: 'text-base' } }}
            label='Start'
            scrollShadowProps={{
              isEnabled: false
            }}
            size='sm'
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
            defaultItems={generateHourlyStrings()}
            inputProps={{ classNames: { input: 'text-base' } }}
            label='End'
            scrollShadowProps={{
              isEnabled: false
            }}
            size='sm'
            onInputChange={(value) => handleFormObjectChange('timeto', value)}
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      )}

      <Button
        fullWidth
        color='primary'
        isDisabled={!isSubmitButtonEnabled}
        isLoading={isButtonSubmitLoading}
        radius='md'
        size='lg'
        type='submit'
        onPress={handleSubmitButtonClick}
      >
        {isHomePageVariant ? 'Search Commuter Line' : 'Submit'}
      </Button>

      <Icon
        className={clsx(
          'cursor-pointer text-default-400 transition-all duration-500',
          isSearchPanelExpanded ? 'rotate-180' : 'rotate-0'
        )}
        fontSize={30}
        icon='icon-park-solid:down-one'
        onClick={() => setIsSearchPanelExpanded(!isSearchPanelExpanded)}
      />
    </form>
  )
}

export default CommuterSearchPanel
