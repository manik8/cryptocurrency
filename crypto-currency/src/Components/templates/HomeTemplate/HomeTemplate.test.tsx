import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeTemplate from './index';
import Header from '../../organisms/Header';
import CryptoTable from '../../organisms/CryptoTable';

// Mock Header and CryptoTable components
jest.mock('../../organisms/Header', () => (props: any) => (
  <div data-testid="header">
    <label htmlFor="theme-switch">Dark Mode</label>
    <input
      id="theme-switch"
      type="checkbox"
      checked={props.darkMode}
      onChange={() => props.setDarkMode(!props.darkMode)}
    />
  </div>
));

jest.mock('../../organisms/CryptoTable', () => () => <div data-testid="crypto-table" />);

describe('HomeTemplate Component', () => {
  test('renders Header and CryptoTable components', () => {
    render(<HomeTemplate />);

    // Check if Header and CryptoTable are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('crypto-table')).toBeInTheDocument();
    
    // Check if default light theme is applied
    expect(document.body).toHaveStyle('background-color: rgb(255, 255, 255)'); // Light theme color
  });

  test('toggles dark mode correctly', () => {
    render(<HomeTemplate />);

    // Check the initial state (light mode)
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('crypto-table')).toBeInTheDocument();
    
    // Find the switch input
    const switchInput = screen.getByLabelText(/Dark Mode/i);
    expect(switchInput).toBeInTheDocument();

    // Toggle dark mode
    fireEvent.click(switchInput);

    // Check if dark mode is applied
    expect(document.body).toHaveStyle('background-color: rgb(18, 18, 18)'); // Dark theme color
  });
});
