'use client'

import React from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useAppContext } from '../context/app-context'

const tabList = [
  {
    icon: 'solar:calendar-linear',
    href: '/'
  },
  {
    icon: 'material-symbols:map-outline-sharp',
    href: '/commuter-map'
  },
  {
    icon: 'tdesign:money',
    href: '/ticket-price'
  }
]

const Tab = () => {
  const path = usePathname()
  const { isSearchPanelExpanded } = useAppContext()

  return (
    <div
      className={clsx(
        'absolute w-full left-0 bg-primary-500 h-[80px] rounded-t-3xl flex justify-center items-center p-5 transition-all duration-500',
        isSearchPanelExpanded ? 'bottom-0' : '-bottom-[90px]'
      )}
    >
      <div className='w-full flex justify-around'>
        {tabList.map((item, index) => (
          <Link
            key={index}
            className={clsx(
              'w-[60px] flex h-[50px] justify-center items-center rounded-lg transition-all duration-500 transform',
              path === item.href ? 'bg-primary-400' : ''
            )}
            href={item.href}
          >
            <Icon
              key={index}
              className={clsx(
                'cursor-pointer transition-colors duration-500',
                path === item.href ? 'text-white' : 'text-blue-200'
              )}
              fontSize={36}
              icon={item.icon}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Tab
