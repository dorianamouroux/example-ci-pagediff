import React, { PureComponent } from 'react';

import Thumbnail from './Thumbnail'
import Page from './Page'


class ListPages extends PureComponent {

  state = {
    currentPage: null,
  }

  focusPage = (currentPage) => {
    this.setState({ currentPage })
  }

  displayList = () => {
    this.setState({ currentPage: null })
  }

  renderPages() {
    const {
      diff_images,
      new_images,
      old_images
    } = this.props

    return [
      <Thumbnail
        diffSrc={diff_images[0]}
        newSrc={new_images[0]}
        oldSrc={old_images[0]}
        focusPage={this.focusPage}
        key={0} />,
    ]
    // return diff_images.map((page) =>
      // <Thumbnail diffSrc={page} newSrc={} key={page} />
    // )
  }

  renderPage() {
    const { currentPage } = this.state

    return (
      <Page
        displayList={this.displayList}
        {...currentPage}
        />
    )
  }

  render() {
    return (
      <div className="thumbnail-container">
        {this.state.currentPage
          ? this.renderPage()
          : this.renderPages()}
      </div>
    )
  }
}

export default ListPages;
