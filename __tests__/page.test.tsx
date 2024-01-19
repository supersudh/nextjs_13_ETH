import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Page from '../app/page';
import { MESSAGES } from '../test-utils/constants';
 
describe('Page', () => {
  it('renders a greeting text', () => {
    render(<Page />);
    
    const h1Tag = screen.getByRole('heading');
    
    expect(h1Tag.textContent).toEqual(MESSAGES.GREETING);
  });
})
