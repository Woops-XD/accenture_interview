import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  test('it should mount', () => {
    render(<App />);

    const productsList = screen.getByTestId('App');

    expect(productsList).toBeInTheDocument();
  });
});