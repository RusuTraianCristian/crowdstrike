import React from 'react';
import { render } from '@testing-library/react';
import Page from './page';
import Hero from '../components/hero';
import Download from '../components/download';

describe('Page component', () => {
  it('renders without crashing', () => {
    render(<Page />);
  });

  it('renders Hero component', () => {
    const { getByTestId } = render(<Page />);
    const heroComponent = getByTestId('hero-component');
    expect(heroComponent).toBeTruthy(); // Use toBeTruthy for existence check
  });

  it('renders Download component', () => {
    const { getByTestId } = render(<Page />);
    const downloadComponent = getByTestId('download-component');
    expect(downloadComponent).toBeTruthy(); // Use toBeTruthy for existence check
  });
});
