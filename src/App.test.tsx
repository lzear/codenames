import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders "Generate" button', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkElement = getByText(/New game/i);
  expect(linkElement).toBeInTheDocument();
});
