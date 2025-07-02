'use client'

import type { ThemeProviderProps } from 'next-themes'

import * as React from 'react'
import { HeroUIProvider } from '@heroui/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from '@heroui/toast'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()
  const queryClient = new QueryClient()

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider
            placement='top-center'
            toastProps={{
              variant: 'bordered',
              color: 'danger',
            }}
          />
          {children}
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
