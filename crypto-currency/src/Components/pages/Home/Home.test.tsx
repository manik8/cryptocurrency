import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './index';
import HomeTemplate from '../../templates/HomeTemplate';

// Mock the HomeTemplate component
jest.mock('../../templates/HomeTemplate', () => () => <div data-testid="home-template" />);

describe('HomePage Component', () => {
  test('renders HomeTemplate component', () => {
    render(<HomePage />);

    // Check if HomeTemplate is rendered
    expect(screen.getByTestId('home-template')).toBeInTheDocument();
  });
});
