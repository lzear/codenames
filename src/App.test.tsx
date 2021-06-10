import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

it('renders "Generate" button', () => {
  // @ts-ignore
  global.window = { location: { search: '?seed=abc' } };
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkElement = getByText(/New game/i);
  expect(linkElement).toBeInTheDocument();

  userEvent.click(linkElement);
});
