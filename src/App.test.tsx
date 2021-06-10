import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

it('renders "Generate" button', () => {
  // @ts-ignore
  delete window.location;
  // @ts-ignore
  global.window.location = new URL('https://www.example.com?seed=r23');
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkElement = getByText(/New game/i);
  expect(linkElement).toBeInTheDocument();

  userEvent.click(linkElement);
});
