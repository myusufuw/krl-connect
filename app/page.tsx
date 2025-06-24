'use client'

import Greeting from '@/components/greeting'
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete'
import { generateHourlyStrings } from './lib/time'
import { Button } from '@heroui/button'

export const animals = [
  {
    label: 'Cat',
    key: 'cat',
    description: 'The second most popular pet in the world',
  },
  {
    label: 'Dog',
    key: 'dog',
    description: 'The most popular pet in the world',
  },
  {
    label: 'Elephant',
    key: 'elephant',
    description: 'The largest land animal',
  },
  { label: 'Lion', key: 'lion', description: 'The king of the jungle' },
  { label: 'Tiger', key: 'tiger', description: 'The largest cat species' },
  { label: 'Giraffe', key: 'giraffe', description: 'The tallest land animal' },
]

export default function Home() {
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
          defaultItems={animals}
          label='Select the station'
        >
          {(item) => (
            <AutocompleteItem key={item?.key}>{item?.label}</AutocompleteItem>
          )}
        </Autocomplete>

        <div className='flex flex-row w-full justify-between gap-4 my-4'>
          <Autocomplete
            fullWidth
            size='sm'
            defaultItems={generateHourlyStrings()}
            label='Start'
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
            )}
          </Autocomplete>

          <Autocomplete
            fullWidth
            size='sm'
            defaultItems={generateHourlyStrings()}
            label='End'
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        <Button color='primary' fullWidth size='lg' radius='md'>
          Search Commuter Line
        </Button>
      </div>
    </div>
  )
}
