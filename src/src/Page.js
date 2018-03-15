import React, { PureComponent } from 'react';

import Slider from './Slider'


class Page extends PureComponent {

  state = {
    showDiff: false
  }

  handleButtonDiff = () => {
    this.setState({
      showDiff: !this.state.showDiff
    })
  }

  render() {
    const {
      displayList,
      oldSrc,
      newSrc,
      diffSrc
    } = this.props

    return (
      <div className="App">
        <button onClick={displayList}>Go back</button>
        {this.state.showDiff
          ? <img src={diffSrc} alt="difference between the two pages" />
          : <Slider imgLeft={oldSrc} imgRight={newSrc} />
        }
        <button onClick={this.handleButtonDiff}>Show diff</button>
      </div>
    );
  }
}

export default Page;
