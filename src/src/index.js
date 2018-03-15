import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  window.DATA_CI = {
    old_images: [],
    new_images: [],
    diff_images: [
      'hey'
    ],
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
