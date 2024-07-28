import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CryptoTemplate from './index';
import Header from '../../organisms/Header';
import CryptoChart from '../../organisms/CryptoChart';

// Mock Header and CryptoChart components
jest.mock('../../organisms/Header', () => (props: any) => (
  <div data-testid="header">
    {/* Mock Header content including the Switch */}
    <label htmlFor="theme-switch">Dark Mode</label>
    <input id="theme-switch" type="checkbox" checked={props.darkMode} onChange={props.setDarkMode} />
  </div>
));
jest.mock('../../organisms/CryptoChart', () => () => <div data-testid="crypto-chart" />);

describe('CryptoTemplate Component', () => {
  test('renders correctly with default theme', () => {
    render(<CryptoTemplate />);

    // Check if Header and CryptoChart are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('crypto-chart')).toBeInTheDocument();
    
    // Check if the default light theme is applied
    expect(document.body).toHaveStyle('background-color: rgb(255, 255, 255)'); // Light theme color
  });

  test('toggles dark mode correctly', () => {
    render(<CryptoTemplate />);

    // Check the initial state (light mode)
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('crypto-chart')).toBeInTheDocument();
    
    // Find the Switch component using label
    const switchInput = screen.getByLabelText(/Dark Mode/i);
    expect(switchInput).toBeInTheDocument();

    // Toggle dark mode
    fireEvent.click(switchInput);

    // Check if dark mode is applied
    expect(document.body).toHaveStyle('background-color: rgb(18, 18, 18)'); // Dark theme color

    // Toggle back to light mode
    fireEvent.click(switchInput);

    // Check if light mode is applied again
    expect(document.body).toHaveStyle('background-color: rgb(18, 18, 18)'); // Light theme color
  });
});
