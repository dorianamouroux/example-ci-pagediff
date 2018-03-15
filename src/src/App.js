import React, { PureComponent } from 'react';

import ListPages from './ListPages'
import './App.css'


class App extends PureComponent {

  render() {
    return (
      <div className="app">
        <ListPages {...window.DATA_CI} />
      </div>
    );
  }
}

export default App;
