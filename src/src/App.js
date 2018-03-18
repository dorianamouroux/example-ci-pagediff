import React, { PureComponent } from 'react';

import ListPages from './ListPages'
import './App.css'


class App extends PureComponent {

  render() {
    return (
      <div className="app">
        <h1>CI Page Diff</h1>
        <ListPages {...window.DATA_CI} />
      </div>
    );
  }
}

export default App;
