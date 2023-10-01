import React from 'react'
import { createRoot } from 'react-dom/client'
import { useAsyncHook } from '../src/index'

const App: React.FC = () => {
  const { status, error, execute } = useAsyncHook({
    resetStatusOnSuccess: true,
    resetStatusOnError: true,
    resetStatusDelay: 6000,
  })

  const simulateAPI = async (value: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value > 0.5) resolve('API call succeeded!')
        else reject(new Error('API call failed!'))
      }, 1000)
    })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Testing useAsyncHook</h1>
      <button onClick={() => execute(simulateAPI, Math.random())}>
        Simulate API Call
      </button>
      <p>Status: {status}</p>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<App />)
