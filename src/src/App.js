import React, { PureComponent } from 'react';

import ListPages from './ListPages'


class App extends PureComponent {

  render() {
    return (
      <div className="App">
        <ListPages {...window.DATA_CI} />
      </div>
    );
  }
}

export default App;
