// src/tests/Heading.test.js

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home Component', () => {
  test('renders heading', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    const headingElement = screen.getByText(/NASA Media Search/i);
    expect(headingElement).toBeInTheDocument();
  });
});
