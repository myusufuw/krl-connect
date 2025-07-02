'use client'

import '@/styles/globals.css'
import clsx from 'clsx'

import { Providers } from './providers'

import { fontSans } from '@/config/fonts'
import Tab from '@/components/tab'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className='relative flex flex-col h-screen sm:bg-slate-900 overflow-hidden'>
            {/* <Navbar /> */}
            <main className='container mx-auto max-w-md h-full relative bg-white zoom-90'>
              {children}

              <Tab />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
