import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Button from './index';

describe('Button component', () => {
  test('renders the button with the correct label', () => {
    render(<Button label="Click Me" />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    const buttonElement = screen.getByText(/Click Me/i);
    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders without crashing without onClick', () => {
    render(<Button label="Click Me" />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
