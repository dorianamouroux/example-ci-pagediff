import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  window.DATA_CI = {
    old_images: [ 'examples/old.png' ],
    new_images: [ 'examples/new.png' ],
    diff_images: [ 'examples/diff.png' ],
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
