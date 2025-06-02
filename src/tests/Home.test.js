// src/tests/Home.test.js

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


  test('renders search input and button', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search term/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
