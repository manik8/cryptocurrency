import { render, screen } from '@testing-library/react';
import CryptoDetails from './index';

// Mock the CryptoTemplate component
jest.mock('../../templates/CryptoTemplate', () => () => <div data-testid="crypto-template" />);

describe('CryptoDetails Component', () => {
  test('renders CryptoTemplate component', () => {
    render(<CryptoDetails />);

    // Check if CryptoTemplate is rendered
    expect(screen.getByTestId('crypto-template')).toBeInTheDocument();
  });
});
