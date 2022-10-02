import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import App from './app'

it('renders "Generate" button', async () => {
  // @ts-ignore
  delete window.location
  // @ts-ignore
  global.window.location = new URL('https://www.example.com?seed=r23')
  const { findByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  )
  const linkElement = await findByText(/new game/i)
  expect(linkElement).toBeInTheDocument()

  await userEvent.click(linkElement)
})
