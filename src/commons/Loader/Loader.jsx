import React from 'react';
import LoaderStyles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={LoaderStyles['image']}>
      <img src={'/heart-small_v2.png'} className={LoaderStyles['rotate']} />
    </div>
  );
};

export default Loader;
