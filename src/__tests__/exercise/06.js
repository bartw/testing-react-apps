// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {build, fake} from '@jackfranklin/test-data-bot'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import Location from '../../examples/location'

const buildFakePostion = build({
  fields: {
    coords: {
      latitude: fake(f => f.address.latitude()),
      longitude: fake(f => f.address.longitude()),
    },
  },
})

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = buildFakePostion()

  const {promise, resolve} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {
      promise.then(() => callback(fakePosition))
    },
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  resolve()

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(
    screen.getByText(fakePosition.coords.latitude, {exact: false}),
  ).toBeInTheDocument()
  expect(
    screen.getByText(fakePosition.coords.longitude, {exact: false}),
  ).toBeInTheDocument()
})

test('displays an alert when getting the location fails', async () => {
  const {promise, reject} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (success, error) => {
      promise.catch(() => error(new Error('something went wrong')))
    },
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  reject()

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"something went wrong"`,
  )
})
