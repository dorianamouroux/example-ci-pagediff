import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


window.BASE_URL = window.location.pathname.replace(/^\/|\/$/g, '')
const urlData = `${process.env.REACT_APP_S3_URL}/${window.BASE_URL}.json`


fetch(urlData)
  .then(data => data.json())
  .then(data => {
    window.DATA_CI = data
    ReactDOM.render(<App />, document.getElementById('root'));
  })
  .catch(error => {
    ReactDOM.render(<div>Not found</div>, document.getElementById('root'));
  })
