import React from 'react'
import { generateHourlyStrings } from '@/app/lib/time'
import { KrlStation } from '@/app/schemas/commuter-schedule'
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from '@heroui/autocomplete'
import { Button } from '@heroui/button'

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
    description = 'Explore new place, get new experience!',
  } = props

  const isHomePageVariant = variant === 'home'

  return (
    <div className='bg-white p-4 absolute top-[14%] rounded-2xl mx-4 shadow-md'>
      <p className='font-medium text-2xl text-center'>{title}</p>
      {isHomePageVariant && (
        <p className='text-sm text-default-400 text-center'>{description}</p>
      )}

      <Autocomplete
        fullWidth
        size='sm'
        className='mt-4'
        scrollShadowProps={{
          isEnabled: false,
        }}
        label={isHomePageVariant ? 'Select the station' : 'From'}
        isLoading={isKrlStationLoading}
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
              title={data?.title}
              items={data?.value}
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
          size='sm'
          className='mt-4 mb-4'
          scrollShadowProps={{
            isEnabled: false,
          }}
          label='To'
          isLoading={isKrlStationLoading}
          onSelectionChange={(value) =>
            handleFormObjectChange('stationto', value)
          }
        >
          {krlStationData ? (
            krlStationData.map((data) => (
              <AutocompleteSection
                key={data?.title}
                title={data?.title}
                items={data?.value}
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
            size='sm'
            defaultItems={generateHourlyStrings()}
            label='Start'
            onInputChange={(value) => handleFormObjectChange('timefrom', value)}
            scrollShadowProps={{
              isEnabled: false,
            }}
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
            scrollShadowProps={{
              isEnabled: false,
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      )}

      <Button
        color='primary'
        fullWidth
        size='lg'
        radius='md'
        isDisabled={!isSubmitButtonEnabled}
        onPress={handleSubmitButtonClick}
        isLoading={isButtonSubmitLoading}
      >
        {isHomePageVariant ? 'Search Commuter Line' : 'Submit'}
      </Button>
    </div>
  )
}

export default CommuterSearchPanel
