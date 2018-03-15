import React, { PureComponent } from 'react';


class Page extends PureComponent {

  render() {
    const { displayList } = this.props

    return (
      <div className="App">
        <button onClick={() => displayList()}>Go back</button>
        {JSON.stringify(this.props)}
      </div>
    );
  }
}

export default Page;
