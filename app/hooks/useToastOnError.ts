import { useEffect } from 'react'
import { addToast } from '@heroui/toast'
import { AxiosError } from 'axios'

export function useToastOnError(
  error: unknown,
  isError: boolean,
  fallbackMessage = 'Something went wrong',
) {
  useEffect(() => {
    if (!isError || !error) return

    let message = fallbackMessage

    if (error instanceof AxiosError) {
      message = `${error.status} - ${error.response?.data.data}`
    } else if (typeof error === 'string') {
      message = error
    } else if ((error as any)?.response?.data?.message) {
      message = (error as any).response.data.message
    }

    addToast({
      title: message,
    })
  }, [error, isError, fallbackMessage])
}
