import React from 'react';

import loading from '../../images/loading.gif';

import './Loading.css';

function Loading() {
  return (
    <div className="main-content-loading">
      <img src={ loading } alt="loading" />
    </div>
  );
}

export default Loading;
