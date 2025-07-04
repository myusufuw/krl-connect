'use client'

import '@/styles/globals.css'
import clsx from 'clsx'
import { useEffect } from 'react'

import { Providers } from './providers'
import Tab from './components/tab'

import { fontSans } from '@/config/fonts'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01

      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)

    return () => window.removeEventListener('resize', setViewportHeight)
  }, [])

  return (
    <html suppressHydrationWarning lang='en'>
      <head>
        <meta
          content='width=device-width, initial-scale=1, user-scalable=no'
          name='viewport'
        />
      </head>
      <body
        className={clsx(
          'text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className='flex flex-col bg-slate-900 overflow-hidden'>
            {/* <Navbar /> */}
            <main
              className='container mx-auto max-w-md relative bg-white'
              style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
            >
              {children}

              <Tab />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
