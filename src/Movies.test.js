import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme'
import Movies from './components/Movies';

test('renders learn react link', () => {
  const { getByText } = mount(<Movies searchParmeter="" yearParameter="" />);
  const linkElement = getByText(/Informe the movie title/i);
  expect(linkElement).toBeInTheDocument();
});
