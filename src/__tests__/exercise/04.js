// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

const buildLoginData = overrides => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
  ...overrides,
})

const loginBuilder = build('Login', {
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  const {username, password} = buildLoginData()

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})

  userEvent.type(usernameInput, username)
  userEvent.type(passwordInput, password)
  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('submitting the form calls onSubmit with username and overridden password', () => {
  const {username, password} = buildLoginData({password: 'easy'})

  expect(password).toBe('easy')

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})

  userEvent.type(usernameInput, username)
  userEvent.type(passwordInput, password)
  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('submitting the form calls onSubmit with overridden username and password', () => {
  const {username, password} = loginBuilder({overrides: {username: 'q'}})

  expect(username).toBe('q')

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})

  userEvent.type(usernameInput, username)
  userEvent.type(passwordInput, password)
  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
