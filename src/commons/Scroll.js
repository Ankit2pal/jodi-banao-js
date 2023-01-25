import React, { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Scroll = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 150) {
      setVisible(true);
    } else if (scrolled <= 150) {
      setVisible(false);
    }
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div
      style={{ display: visible ? 'flex' : 'none' }}
      className="scrll"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ArrowUpwardIcon className="scrll_icon"></ArrowUpwardIcon>
    </div>
  );
};

export default Scroll;
