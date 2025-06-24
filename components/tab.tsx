'use client'

import React, { useState } from 'react'
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
    href: '/ticket-price',
  },
  {
    icon: 'tdesign:money',
    href: '/commuter-map',
  },
]

const Tab = () => {
  const path = usePathname()

  const [activeTab, setActiveTab] = useState('/')

  console.log(path === activeTab)
  return (
    <div className='absolute bottom-0 w-full left-0 bg-blue-500 h-[90px] rounded-t-2xl flex justify-center items-center p-5'>
      <div className='w-full flex justify-around'>
        {tabList.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className={clsx(
              'w-[90px] flex h-[60px] justify-center items-center rounded-lg transition-all duration-500 transform',
              activeTab === item.href ? 'bg-blue-400' : ''
            )}
          >
            <Icon
              key={index}
              icon={item.icon}
              fontSize={48}
              className={clsx(
                'cursor-pointer transition-colors duration-500',
                activeTab === item.href ? 'text-white' : 'text-blue-200'
              )}
              onClick={() => setActiveTab(item.href)}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Tab
