// This is a Jest test file
import { render, screen } from '@testing-library/react'; // Testing Library
import Page from '../page';

describe('Home Page', () => {
  // Jest
  it('renders', () => {
    // Jest
    render(<Page />); // Testing Library
    expect(screen.getByText('Welcome to Trip Ready')).toBeInTheDocument(); // Jest + Testing Library
  });
});
