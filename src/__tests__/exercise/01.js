// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const root = document.createElement('div')
  document.body.append(root)

  ReactDOM.render(<Counter />, root)

  const [decrementButton, incrementButton] = root.querySelectorAll('button')
  const messageElement = root.firstChild.querySelector('div')

  expect(messageElement.textContent).toBe('Current count: 0')

  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  incrementButton.dispatchEvent(clickEvent)

  expect(messageElement.textContent).toBe('Current count: 1')

  incrementButton.dispatchEvent(clickEvent)

  expect(messageElement.textContent).toBe('Current count: 2')

  decrementButton.dispatchEvent(clickEvent)

  expect(messageElement.textContent).toBe('Current count: 1')

  root.remove()

  // 🐨 create a div to render your component to (💰 document.createElement)
  //
  // 🐨 append the div to document.body (💰 document.body.append)
  //
  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  // 🐨 click the increment button (💰 increment.click())
  // 🐨 assert the message.textContent
  // 🐨 click the decrement button (💰 decrement.click())
  // 🐨 assert the message.textContent
  //
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
