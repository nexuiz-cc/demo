import React from 'react';
import { render, screen } from '@testing-library/react';
import ToggleColorMode from './App';
import { BrowserRouter } from 'react-router-dom';


describe("App routing", () => {
  test("default root", () => {
    render(<ToggleColorMode />, { wrapper: BrowserRouter });
    // verify page content for default route
    expect(screen.getByText(/My APP/i)).toBeInTheDocument();
  });
});