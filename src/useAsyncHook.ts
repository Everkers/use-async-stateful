import { useMemo, useState } from 'react'

export type StatusType = 'error' | 'success' | 'loading' | ''

export interface IAsyncHookOptions {
  resetStatusOnSuccess?: boolean
  resetStatusOnError?: boolean
  resetStatusDelay?: number
}

type AsyncFunction<A extends any[], R> = (...args: A) => Promise<R>

export const useAsyncHook = ({
  resetStatusOnError,
  resetStatusOnSuccess,
  resetStatusDelay,
}: IAsyncHookOptions = {}) => {
  const [status, setStatus] = useState<StatusType>('')
  const [error, setError] = useState<Error | null>(null)

  const timeOut = useMemo(() => {
    let timeout: NodeJS.Timeout
    return {
      clear: () => clearTimeout(timeout),
      set: (cb: () => void, delay = resetStatusDelay || 3000) => {
        timeout = setTimeout(cb, delay)
      },
    }
  }, [resetStatusDelay])

  const resetFun = useMemo(
    () => ({
      resetStatusOnError: () => setError((prev) => (prev ? null : prev)),
      resetStatusOnSuccess: () => {
        setStatus((prev) => (prev === 'success' ? '' : prev))
        if (error) setError(null)
      },
    }),
    [resetStatusOnError, resetStatusOnSuccess]
  )

  const execute = async <A extends any[], R>(
    asyncFunction: AsyncFunction<A, R>,
    ...args: A
  ): Promise<R | undefined> => {
    try {
      timeOut.clear()
      setStatus('loading')
      const result = await asyncFunction(...args)
      setStatus('success')
      return result
    } catch (err) {
      setError(err as Error)
      setStatus('error')
    } finally {
      handleResetStatus()
    }
  }

  const handleResetStatus = () => {
    if (resetStatusOnError) {
      timeOut.set(resetFun.resetStatusOnError)
    }
    if (resetStatusOnSuccess) {
      timeOut.set(resetFun.resetStatusOnSuccess)
    }
  }

  return {
    status,
    error,
    execute,
  }
}
