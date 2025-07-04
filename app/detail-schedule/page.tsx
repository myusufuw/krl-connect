'use client'

import { Suspense } from 'react'

import DetailScheduleContent from './detail-schedule-content'

import Loading from '@/app/components/loading'

const DetailSchedule = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DetailScheduleContent />
    </Suspense>
  )
}

export default DetailSchedule
