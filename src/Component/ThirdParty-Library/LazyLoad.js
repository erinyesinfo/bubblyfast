import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/* npm package */
// https://www.npmjs.com/package/react-lazy-load-image-component

const MyImage = ({ image }) => (
  <LazyLoadImage
    wrapperClassName={image.wrapperClassName || ''}
    className={image.className || ''}
    alt={image.alt}
    effect="blur"
    src={image.src} // use normal <img> attributes as props
    placeholderSrc={image.placeholder}
    style={image.style || {}}
    draggable={image.draggable || true}
  />
);
 
export default MyImage;