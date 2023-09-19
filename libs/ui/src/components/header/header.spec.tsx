import React from 'react';
import { Header } from './header';
import { render } from '@testing-library/react';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Header />);
    expect(baseElement).toBeTruthy();
  });
});
