'use client'

import React from 'react'
import Greeting from '../components/greeting'
import { useCommuterMap } from '../hooks/useCommuterMap'
import Loading from '../components/loading'
import clsx from 'clsx'

const CommuterMap = () => {
  const { data, isLoading, error } = useCommuterMap()

  return (
    <div className='relative flex flex-col h-screen'>
      {/* GREETING */}
      <Greeting descipription='Explore Our Route Network: Discover the Best Route for Every Destination' />

      {/* ROUTE MAPS */}
      <div
        className={clsx(
          'flex flex-col h-full overflow-y-auto p-3 no-scrollbar gap-4',
          isLoading && 'justify-center items-center'
        )}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data?.map((item, index) => (
              <img
                key={index}
                src={item.permalink}
                alt={`Area ${item.area}`}
                className='border rounded-lg shadow-md'
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default CommuterMap
