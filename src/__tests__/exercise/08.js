// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {renderHook, act as hookact} from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

const TestComponent = ({initialCount = 0, step = 1}) => {
  const {count, increment, decrement} = useCounter({initialCount, step})

  return (
    <div>
      <div>The count is: {count}</div>
      <button onClick={decrement}>decrement</button>
      <button onClick={increment}>increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<TestComponent />)

  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})

  expect(screen.getByText('The count is: 0')).toBeInTheDocument()

  userEvent.click(increment)
  expect(screen.getByText('The count is: 1')).toBeInTheDocument()

  userEvent.click(increment)
  expect(screen.getByText('The count is: 2')).toBeInTheDocument()

  userEvent.click(decrement)
  expect(screen.getByText('The count is: 1')).toBeInTheDocument()
})

test('allows customization of the initial count', () => {
  render(<TestComponent initialCount={2} />)

  expect(screen.getByText('The count is: 2')).toBeInTheDocument()
})

test('allows customization of the step', () => {
  render(<TestComponent step={2} />)

  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})

  expect(screen.getByText('The count is: 0')).toBeInTheDocument()

  userEvent.click(increment)
  expect(screen.getByText('The count is: 2')).toBeInTheDocument()

  userEvent.click(increment)
  expect(screen.getByText('The count is: 4')).toBeInTheDocument()

  userEvent.click(decrement)
  expect(screen.getByText('The count is: 2')).toBeInTheDocument()
})

const setup = ({initialCount = 0, step = 1} = {}) => {
  const result = {}

  const FakeTestComponent = ({initialCount = 0, step = 1}) => {
    result.current = useCounter({initialCount, step})
    return null
  }

  render(<FakeTestComponent initialCount={initialCount} step={step} />)

  return result
}

test('fake: exposes the count and increment/decrement functions', async () => {
  const result = setup()

  expect(result.current.count).toEqual(0)

  act(() => result.current.increment())
  expect(result.current.count).toEqual(1)

  act(() => result.current.increment())
  expect(result.current.count).toEqual(2)

  act(() => result.current.decrement())
  expect(result.current.count).toEqual(1)
})

test('fake: allows customization of the initial count', () => {
  const result = setup({initialCount: 2})

  expect(result.current.count).toEqual(2)
})

test('fake: allows customization of the step', async () => {
  const result = setup({step: 2})

  expect(result.current.count).toEqual(0)

  act(() => result.current.increment())
  expect(result.current.count).toEqual(2)

  act(() => result.current.increment())
  expect(result.current.count).toEqual(4)

  act(() => result.current.decrement())
  expect(result.current.count).toEqual(2)
})

test('renderhook: exposes the count and increment/decrement functions', async () => {
  const {result} = renderHook(() => useCounter())

  expect(result.current.count).toEqual(0)

  hookact(() => result.current.increment())
  expect(result.current.count).toEqual(1)

  hookact(() => result.current.increment())
  expect(result.current.count).toEqual(2)

  hookact(() => result.current.decrement())
  expect(result.current.count).toEqual(1)
})

test('renderhook: allows customization of the initial count', () => {
  const {result} = renderHook(() => useCounter({initialCount: 2}))

  expect(result.current.count).toEqual(2)
})

test('renderhook: allows customization of the step', async () => {
  const {result} = renderHook(() => useCounter({step: 2}))

  expect(result.current.count).toEqual(0)

  hookact(() => result.current.increment())
  expect(result.current.count).toEqual(2)

  hookact(() => result.current.increment())
  expect(result.current.count).toEqual(4)

  hookact(() => result.current.decrement())
  expect(result.current.count).toEqual(2)
})
