import React from 'react'
import moment from 'moment'
import { Icon } from '@iconify/react'
import clsx from 'clsx'

import { useAppContext } from '../context/app-context'

import { getTimeOfDay } from '@/app/lib/time'

const Greeting = ({ descipription }: { descipription?: string }) => {
  const { isSearchPanelExpanded, setIsSearchPanelExpanded } = useAppContext()

  return (
    <div className='min-h-[250px] bg-primary-500 rounded-b-3xl pt-8 flex flex-col items-center shadow-md'>
      <div className='text-white'>
        <p className='text-2xl font-medium'>Hello, good {getTimeOfDay()}.</p>
        <p className='text-sm text-center mt-1'>
          {moment().format('dddd, DD MMMM YYYY.')}
        </p>
      </div>

      {descipription && (
        <p className='mt-6 w-[365px] text-center text-default-200 font-medium text-2xl'>
          &quot;{descipription}&quot;
        </p>
      )}

      {descipription && (
        <Icon
          className={clsx(
            'cursor-pointer text-white transition-all duration-500',
            isSearchPanelExpanded ? 'rotate-180' : 'rotate-0'
          )}
          fontSize={30}
          icon='icon-park-solid:down-one'
          onClick={() => setIsSearchPanelExpanded(!isSearchPanelExpanded)}
        />
      )}
    </div>
  )
}

export default Greeting
