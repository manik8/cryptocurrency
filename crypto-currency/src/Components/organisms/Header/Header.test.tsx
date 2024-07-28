import { render, screen, fireEvent } from '@testing-library/react';
import Header from './index';

describe('Header Component', () => {
  // Define mock functions for testing
  const mockSetDarkMode = jest.fn();

  // Test rendering of the component
  test('renders the Header component with correct elements', () => {
    render(
      <Header darkMode={false} setDarkMode={mockSetDarkMode} />
    );

    // Check if the header text is present
    expect(screen.getByText(/Cryptocurrency Dashboard/i)).toBeInTheDocument();

    // Check if the switch is present
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  // Test if the switch interacts correctly
  test('calls setDarkMode when the switch is toggled', () => {
    // Initial render with darkMode set to false
    render(
      <Header darkMode={false} setDarkMode={mockSetDarkMode} />
    );

    // Get the switch element
    const switchElement = screen.getByRole('checkbox');

    // Toggle the switch
    fireEvent.click(switchElement);

    // Verify that setDarkMode was called with the correct argument
    expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  });
});
