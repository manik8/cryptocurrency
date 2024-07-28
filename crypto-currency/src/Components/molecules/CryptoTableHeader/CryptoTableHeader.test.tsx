import React from 'react';
import { render, screen } from '@testing-library/react';
import CryptoTableHeader from './index';

describe('CryptoTableHeader Component', () => {
  test('renders the table header with correct columns', () => {
    render(<CryptoTableHeader />);

    const symbolHeader = screen.getByText(/symbol/i);
    const nameHeader = screen.getByText(/name/i);
    const priceHeader = screen.getByText(/price/i);
    const marketCapHeader = screen.getByText(/market cap/i);

    expect(symbolHeader).toBeInTheDocument();
    expect(nameHeader).toBeInTheDocument();
    expect(priceHeader).toBeInTheDocument();
    expect(marketCapHeader).toBeInTheDocument();
  });
});
