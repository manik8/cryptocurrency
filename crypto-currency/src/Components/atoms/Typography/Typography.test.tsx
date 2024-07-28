import { render, screen } from '@testing-library/react';
import Typography from './index';

describe('Typography Component', () => {
  it('renders the correct variant and children', () => {
    render(<Typography variant="h1">Test Heading</Typography>);
    const typographyElement = screen.getByText(/Test Heading/i);
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement.tagName).toBe('H1');
  });

  it('renders the correct variant for body text', () => {
    render(<Typography variant="body1">Test Body</Typography>);
    const typographyElement = screen.getByText(/Test Body/i);
    expect(typographyElement).toBeInTheDocument();
  });

  it('renders the correct variant for another heading', () => {
    render(<Typography variant="h4">Test Subheading</Typography>);
    const typographyElement = screen.getByText(/Test Subheading/i);
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement.tagName).toBe('H4');
  });
});
