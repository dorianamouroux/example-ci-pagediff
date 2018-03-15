import React, { PureComponent } from 'react';

import Thumbnail from './Thumbnail'


class ListPages extends PureComponent {

  renderPages() {
    const { diff_images } = this.props

    return diff_images.map((page) =>
      <Thumbnail page={page} key={page} />
    )
  }

  render() {
    return (<div>
      {this.renderPages()}
    </div>);
  }
}

export default ListPages;
