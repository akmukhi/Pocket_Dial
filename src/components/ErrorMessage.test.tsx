import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the error message', () => {
    const message = 'Test error message';
    const { getByText } = render(<ErrorMessage message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });
}); 