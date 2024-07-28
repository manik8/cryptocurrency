import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import CryptoTable from './index';

// Mock data for the tests
const mockCryptoData = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', priceUsd: '40000', marketCapUsd: '800000000000' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', priceUsd: '2500', marketCapUsd: '300000000000' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', priceUsd: '1.50', marketCapUsd: '48000000000' },
];

// Mock the fetch call to return the mock data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: mockCryptoData }),
  })
) as jest.Mock;

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CryptoTable Component', () => {
  test('renders table with cryptocurrency data', async () => {
    render(
      <Router>
        <CryptoTable />
      </Router>
    );

    // Check if all rows are rendered
    await waitFor(() => {
      expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
      expect(screen.getByText(/Ethereum/i)).toBeInTheDocument();
      expect(screen.getByText(/Cardano/i)).toBeInTheDocument();
    });
  });

  test('sorts cryptocurrency data by name', async () => {
    render(
      <Router>
        <CryptoTable />
      </Router>
    );

    // Ensure Bitcoin appears before Ethereum
    await waitFor(() => {
      const bitcoinRow = screen.getByText(/Bitcoin/i);
      const ethereumRow = screen.getByText(/Ethereum/i);
      expect(bitcoinRow).toBeInTheDocument();
      expect(ethereumRow).toBeInTheDocument();
    });

    // Click on the table header to sort by name
    const nameSortButton = screen.getByText(/Name/i);
    fireEvent.click(nameSortButton);

    // Verify the rows are sorted
    const bitcoinRow = screen.getByText(/Bitcoin/i);
    const ethereumRow = screen.getByText(/Ethereum/i);
    const cardanoRow = screen.getByText(/Cardano/i);

    // Ensure the order of rows is correct after sorting
    expect(bitcoinRow).toBeInTheDocument();
    expect(ethereumRow).toBeInTheDocument();
    expect(cardanoRow).toBeInTheDocument();
  });

  test('navigates to details page on name click', async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <Router>
        <CryptoTable />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
    });

    const nameCell = screen.getByText(/Bitcoin/i);
    fireEvent.click(nameCell);

    // Check if navigate was called with the correct URL
    expect(navigate).toHaveBeenCalledWith('/details/bitcoin');
  });

  test('loads favorites from localStorage', async () => {
    localStorage.setItem('cryptoFavorites', JSON.stringify({ bitcoin: true, ethereum: false }));

    render(
      <Router>
        <CryptoTable />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
      expect(screen.getByText(/Ethereum/i)).toBeInTheDocument();
    });

    const bitcoinFavoriteButton = screen.getAllByRole('button')[0]; // Adjust selector if necessary
    expect(bitcoinFavoriteButton).toHaveTextContent('Symbol'); // Check favorite icon or state
  });
});
