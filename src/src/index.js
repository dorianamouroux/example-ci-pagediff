import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  window.DATA_CI = {
    'deleted': {
      'product': 'examples/old.png',
    },
    'modified': {
      'services': [
        'examples/old.png',
        'examples/diff.png',
        'examples/new.png',
      ],
    },
    'created': { 'home': 'examples/new.png', }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
