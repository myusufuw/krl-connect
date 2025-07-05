'use client'

import clsx from 'clsx'
import Image from 'next/image'

import Greeting from '../components/greeting'
import Loading from '../components/loading'
import { useCommuterMap } from '../hooks/useCommuterMap'
import { useToastOnError } from '../hooks/useToastOnError'

const CommuterMap = () => {
  const { data, isLoading, error, isError } = useCommuterMap()

  useToastOnError(error, isError)

  return (
    <div className='relative flex flex-col h-screen'>
      {/* GREETING */}
      <Greeting descipription='Explore Our Route Network: Discover the Best Route for Every Destination' />

      {/* ROUTE MAPS */}
      <div
        className={clsx(
          'flex flex-col flex-1 pb-[100px] sm:pb-5 overflow-y-auto px-3 no-scrollbar gap-4 mt-0 pt-4',
          isLoading && 'justify-center items-center'
        )}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data?.map((item, index) => (
              <Image
                key={index}
                alt={`Area ${item.area}`}
                className='border rounded-lg shadow-md'
                height={0}
                sizes='100vw'
                src={item.permalink.replace('http://', 'https://')}
                style={{ width: '100%', height: 'auto' }}
                width={0}
              />
            ))}

            {isError && (
              <div className='h-full flex items-center justify-center'>
                <p className='text-xl text-default-900'>Data Not Found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CommuterMap
