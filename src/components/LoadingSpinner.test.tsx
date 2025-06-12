import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(<LoadingSpinner />);
    expect(getByRole('status')).toBeInTheDocument();
  });
}); 