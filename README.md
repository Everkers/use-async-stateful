# React Stateful Async Management Hook

<p align="center">
  <a href="https://badge.fury.io/js/use-async-stateful">
    <img src="https://badge.fury.io/js/electron-markdownify.svg"
         alt="Gitter">
  </a>
</p>

This package provides a utility hook for React applications to manage the state of asynchronous functions. Instead of manually handling loading, success, and error states, this hook does it for you seamlessly while maintaining type safety.

## Installation

```bash
npm install use-async-stateful
```

_or_

```bash
yarn add use-async-stateful
```

## Usage

To utilize this hook, pass your asynchronous function to the hook, and it will handle the states for you. You can also provide additional options to customize the behavior of the hook.

```javascript
import { useAsyncHook } from 'use-async-stateful'

const fetchData = async (id: number) => {
  // Your async logic here
  return `Data for ID: ${id}`
}

const Component = () => {
  const { execute, status, error } = useAsyncHook()

  const handleFetch = async () => {
    const data = await execute(fetchData, 123)
    console.log(data) // Outputs: Data for ID: 123
  }

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>Error: {error?.message}</p>

  return (
    <div>
      {/* Render your data here */}
      <button onClick={handleFetch}>Fetch Data</button>
    </div>
  )
}
```

### Status Values:

The `status` returned by the hook can have one of the following values:

- `''`: Initial state, meaning the asynchronous function hasn't been called yet.
- `'loading'`: The asynchronous function is currently in execution.
- `'success'`: The asynchronous function completed successfully.
- `'error'`: The asynchronous function resulted in an error.

### Options

You can provide the following options to the `useAsyncHook`:

- `resetStatusOnSuccess`: Automatically reset the status after a successful call.
- `resetStatusOnError`: Automatically reset the status after an error.
- `resetStatusDelay`: Time delay (in milliseconds) before the status is reset.

### Type Safety

The hook is designed with type safety in mind. When you pass your asynchronous function and its arguments to `execute`, the types are checked to ensure they match, providing you with a robust development experience.

### Comparison

**Old way**:

```javascript
try {
  setLoading(true)
  const result = await fun(123)
  setLoading(false)
} catch (err) {
  setLoading(false)
}
```

**New and improved with `useAsyncHook`**:

```javascript
const { execute, status, error } = useAsyncHook()
const result = await execute(fun, 123)
```
