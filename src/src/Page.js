import React, { PureComponent } from 'react';


class Page extends PureComponent {

  render() {
    return (
      <div className="App">
        {JSON.stringify(window.DATA_CI)}
      </div>
    );
  }
}

export default Page;
