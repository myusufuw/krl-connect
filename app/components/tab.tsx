'use client'

import React from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const tabList = [
  {
    icon: 'solar:calendar-linear',
    href: '/',
  },
  {
    icon: 'material-symbols:map-outline-sharp',
    href: '/commuter-map',
  },
  {
    icon: 'tdesign:money',
    href: '/ticket-price',
  },
]

const Tab = () => {
  const path = usePathname()

  return (
    <div className='absolute bottom-0 w-full left-0 bg-primary-500 h-[90px] rounded-t-2xl flex justify-center items-center p-5'>
      <div className='w-full flex justify-around'>
        {tabList.map((item, index) => (
          <Link
            key={index}
            className={clsx(
              'w-[90px] flex h-[60px] justify-center items-center rounded-lg transition-all duration-500 transform',
              path === item.href ? 'bg-primary-400' : '',
            )}
            href={item.href}
          >
            <Icon
              key={index}
              className={clsx(
                'cursor-pointer transition-colors duration-500',
                path === item.href ? 'text-white' : 'text-blue-200',
              )}
              fontSize={48}
              icon={item.icon}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Tab
