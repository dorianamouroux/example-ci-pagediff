import React, { PureComponent, Fragment } from 'react';

import './ListPages.css'
import Thumbnail from '../Thumbnail'



class ListPages extends PureComponent {

  getNewPages() {
    const { created, focusPage } = this.props

    return Object
      .entries(created)
      .map(([name, image]) => (
        <Thumbnail
          title={name}
          newSrc={image}
          focusPage={focusPage}
          key={name} />
      ))
  }

  getChangedPages() {
    const { modified, focusPage } = this.props

    return Object
      .entries(modified)
      .map(([name, images]) => (
        <Thumbnail
          title={name}
          newSrc={images[0]}
          diffSrc={images[1]}
          oldSrc={images[2]}
          focusPage={focusPage}
          key={name} />
      ))
  }

  getDeletedPages() {
    const { deleted, focusPage } = this.props

    return Object
      .entries(deleted)
      .map(([name, image]) => (
        <Thumbnail
          title={name}
          oldSrc={image}
          focusPage={focusPage}
          key={name} />
      ))
  }

  render() {
    const newPages = this.getNewPages()
    const changedPages = this.getChangedPages()
    const deletedPages = this.getDeletedPages()

    return (
      <Fragment>
        <h3>New Pages</h3>
        <div className="thumbnails-container">
          {newPages.length
            ? newPages
            : <p className="no-pages">No new pages</p>}
        </div>
        <h3>Page with changes</h3>
        <div className="thumbnails-container">
          {changedPages.length
            ? changedPages
            : <p className="no-pages">No new pages</p>}
        </div>
        <h3>Deleted pages</h3>
        <div className="thumbnails-container">
        {deletedPages.length
          ? deletedPages
          : <p className="no-pages">No deleted pages</p>}
        </div>
      </Fragment>
    )
  }
}

export default ListPages;
