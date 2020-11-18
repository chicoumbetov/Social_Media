import React from 'react';
import ReactDOM from 'react-dom';
import SamuraiJSAp from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SamuraiJSAp />, div);
  ReactDOM.unmountComponentAtNode(div);
})

//import { render } from '@testing-library/react';

/*
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/
