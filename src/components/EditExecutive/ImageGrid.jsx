import React from 'react';
import { any } from 'prop-types';
// Rendering individual images
const Image = ({ image }) => {
  return (
    <div className="file-item">
      <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
    </div>
  );
};

// ImageList Component//
const ImageGride = ({ images }) => {
  // render each image by calling Image component
  const renderImage = (image, index) => {
    return <Image image={image} key={index} />;
  };
  // Return the list of files//
  return <section className="file-list">{images.map(renderImage)}</section>;
};
ImageGride.propTypes = {
  images: any
};
Image.propTypes = {
  image: any
};

export default ImageGride;
