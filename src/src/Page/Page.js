import React, { PureComponent } from 'react';

import './Page.css'
import Slider from '../Slider'


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
      <div className="Page">
        <div className="button-wrapper">
          <button onClick={displayList} className="button button-blue">Go back</button>
          <button onClick={this.handleButtonDiff} className="button button-orange">
            {this.state.showDiff
              ? 'Show comparator'
              : 'Highlight differences'
            }</button>
        </div>
        {this.state.showDiff
          ? <img src={diffSrc} alt="difference between the two pages" />
          : <Slider imgLeft={oldSrc} imgRight={newSrc} />
        }
      </div>
    );
  }
}

export default Page;
