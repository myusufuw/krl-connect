'use client'

import { Icon } from '@iconify/react'
import moment from 'moment'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

import { useDetailTrainSchedule } from '../hooks/useDetailTrainSchedule'
import { useToastOnError } from '../hooks/useToastOnError'

import Loading from '@/app/components/loading'

const DetailSchedule = () => {
  const searchParams = useSearchParams()
  const commuterName = searchParams.get('commuterName')
  const commuterId = searchParams.get('commuterId')

  const { data, mutate, isPending, isError, error } = useDetailTrainSchedule()

  useToastOnError(error, isError)

  useEffect(() => {
    mutate({ trainid: commuterId })
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <div className='flex flex-col h-screen'>
        {/* HEADER */}
        <div className='flex items-center gap-4 p-4 bg-primary-500 text-content1 '>
          <Link href='/'>
            <Icon fontSize={28} icon='material-symbols:arrow-back' />
          </Link>
          <p className='truncate w-[370px] text-lg font-medium'>
            {commuterName} - {commuterId}
          </p>
        </div>

        {/* CONTENTS */}
        <div className='h-[82%] sm:h-full p-6 gap-4 flex flex-col overflow-y-auto no-scrollbar my-2'>
          {isPending ? (
            <div className='h-full flex items-center justify-center'>
              <Loading />
            </div>
          ) : (
            <>
              {data &&
                data.length > 0 &&
                data.map((item, index) => (
                  <div key={index}>
                    <div className='flex items-center text-lg font-medium'>
                      <div className='flex-1 bg-primary-500 p-3 border border-primary-500 text-content1 flex items-center justify-center '>
                        <p className='truncate max-w-[210px] text-center'>
                          {item.station_name}
                        </p>
                      </div>
                      <div className='border border-primary-500 p-3 flex items-center justify-center text-primary-500 min-w-[120px]'>
                        {moment(item.time_est, 'HH:mm:ss').format('HH:mm')} WIB
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      <p className='text-default-500'>
                        {item.transit_station
                          ? 'TRANSIT STATION'
                          : 'NON TRANSIT STATION'}
                      </p>

                      {item.transit_station && item.transit.length > 0 && (
                        <div className='flex items-center gap-1'>
                          {item?.transit?.map((item, index) => (
                            <div
                              key={index}
                              className='h-3 w-3 rounded-full'
                              style={{ backgroundColor: item }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </>
          )}

          {isError && (
            <div className='h-full flex items-center justify-center'>
              <p className='text-xl font-medium text-default-900'>
                Data Not Found
              </p>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  )
}

export default DetailSchedule
