import React, { PureComponent } from 'react';

import Slider from './Slider'


class Page extends PureComponent {

  render() {
    const { displayList } = this.props

    return (
      <div className="App">
        <button onClick={() => displayList()}>Go back</button>
        <Slider />
      </div>
    );
  }
}

export default Page;
