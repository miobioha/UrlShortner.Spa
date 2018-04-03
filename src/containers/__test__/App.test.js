import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

const defaultProps = {
  classes: {}
}

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App {...defaultProps} />, div);
  });
})
